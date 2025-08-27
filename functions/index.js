import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import * as admin from "firebase-admin";
import {
  onRequest,
  logger,
  https,
  pubsub
} from "firebase-functions/v2";
import { defineSecret } from "firebase-functions/params";

const STRIPE_SECRET = defineSecret("STRIPE_SECRET");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

const PRICE_PLUS_MONTH  = defineSecret("PRICE_PLUS_MONTH");   // e.g. price_abc
const PRICE_PLUS_YEAR   = defineSecret("PRICE_PLUS_YEAR");
const PRICE_BLACK_MONTH = defineSecret("PRICE_BLACK_MONTH");
const PRICE_BLACK_YEAR  = defineSecret("PRICE_BLACK_YEAR");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// ----- Helpers -----
const PRICE_TO_PLAN = (prices) => ({
  [prices.plusMonth]:  { plan: "plus",  billing: "monthly" },
  [prices.plusYear]:   { plan: "plus",  billing: "yearly"  },
  [prices.blackMonth]: { plan: "black", billing: "monthly" },
  [prices.blackYear]:  { plan: "black", billing: "yearly"  }
});

const PLAN_CAPS = {
  plus:  { boostRate:0.02, boostMaxUSD: 8,  boostSpendUSD: 400, discountPerBooking: 10, bookingsPerMonth: 3 },
  black: { boostRate:0.04, boostMaxUSD:24,  boostSpendUSD: 600, discountPerBooking: 20, bookingsPerMonth: 5 }
};
const TICKET_RULES = {
  plus:  { minMonths:2, minSpend:500,  count:1, valueCap:100 },
  black: { minMonths:3, minSpend:1200, count:2, valueCap:120 }
};
const LEVELS = ["Bronze","Silver","Gold","Platinum","Diamond","Elite"];

// Idempotency: store processed Stripe event ids
async function alreadyProcessed(eventId) {
  const ref = db.collection("stripe_events").doc(eventId);
  const snap = await ref.get();
  if (snap.exists) return true;
  await ref.set({ processedAt: admin.firestore.FieldValue.serverTimestamp() });
  return false;
}

// find user uid by email (Auth → uid)
async function uidByEmail(email) {
  if (!email) return null;
  try {
    const user = await admin.auth().getUserByEmail(email);
    return user.uid;
  } catch {
    return null;
  }
}

// upsert membership doc
async function upsertMembership(uid, data) {
  const ref = db.collection("memberships").doc(uid);
  await ref.set(
    {
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  );
}

// ensure monthly usage doc
function monthKeyFromDate(d = new Date()) {
  return String(d.getFullYear()) + String(d.getMonth() + 1).padStart(2, "0");
}
async function ensureUsage(uid, monthKey) {
  const ref = db.collection("usage").doc(`${uid}_${monthKey}`);
  const snap = await ref.get();
  if (!snap.exists) {
    await ref.set({
      monthKey,
      discountBookingsUsed: 0,
      boostUSDGranted: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
  return ref;
}

// increase monthsActive each renewal (simple example)
async function incMonthsActive(uid) {
  const ref = db.collection("users").doc(uid);
  await ref.set(
    { monthsActive: admin.firestore.FieldValue.increment(1) },
    { merge: true }
  );
}

// ticket issuance check (called by scheduler)
async function maybeIssueTickets(uid, plan) {
  const userRef = db.collection("users").doc(uid);
  const mRef    = db.collection("memberships").doc(uid);

  const [userSnap, mSnap] = await Promise.all([userRef.get(), mRef.get()]);
  if (!userSnap.exists || !mSnap.exists) return;

  const u = userSnap.data();
  const m = mSnap.data();
  if (!m.active || m.plan !== plan) return;

  const rule = TICKET_RULES[plan];
  const monthsActive = u.monthsActive || 0;
  const lifetimeSpend = u.lifetimeSpend || 0;

  const eligible =
    monthsActive >= rule.minMonths && lifetimeSpend >= rule.minSpend;

  if (!eligible) return;

  // prevent duplicate issuance this cycle
  const issuedRef = db
    .collection("tickets")
    .doc(uid)
    .collection("issued")
    .doc(`${plan}_${monthKeyFromDate()}`);
  const issuedSnap = await issuedRef.get();
  if (issuedSnap.exists) return;

  await issuedRef.set({
    plan,
    count: rule.count,
    valueCap: rule.valueCap,
    constraints: "weekdays/off-season/participating",
    issuedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  await userRef.set(
    { tickets: admin.firestore.FieldValue.increment(rule.count) },
    { merge: true }
  );
  logger.info(`Issued ${rule.count} ticket(s) to ${uid} for plan ${plan}`);
}

// ----- Express app for Stripe webhook (raw body required) -----
const app = express();
app.use(cors({ origin: true }));

// Stripe는 raw body 필요 → bodyParser.raw 사용
app.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET.value());
    let event;

    try {
      const sig = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        STRIPE_WEBHOOK_SECRET.value()
      );
    } catch (err) {
      logger.error("❌ Webhook signature verification failed.", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // idempotency
    if (await alreadyProcessed(event.id)) {
      return res.json({ received: true, duplicate: true });
    }

    // load price map once
    const prices = {
      plusMonth:  PRICE_PLUS_MONTH.value(),
      plusYear:   PRICE_PLUS_YEAR.value(),
      blackMonth: PRICE_BLACK_MONTH.value(),
      blackYear:  PRICE_BLACK_YEAR.value()
    };
    const planMap = PRICE_TO_PLAN(prices);

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          // Payment Link 모드에서도 subscription이면 이후 customer.subscription.created가 옴
          const session = event.data.object;
          const email = session.customer_details?.email || session.customer_email;
          const uid = await uidByEmail(email);
          if (uid) {
            await upsertMembership(uid, {
              lastCheckoutSession: session.id,
              lastCheckoutAt: admin.firestore.FieldValue.serverTimestamp()
            });
          }
          break;
        }

        case "customer.subscription.created":
        case "customer.subscription.updated": {
          const sub = event.data.object;
          const customerId = sub.customer;
          // line items의 첫 price로 플랜 판별
          const priceId = sub.items?.data?.[0]?.price?.id;
          const mapped = planMap[priceId];
          // 고객 이메일 가져오기
          const customer = await stripe.customers.retrieve(customerId);
          const email = customer?.email;
          const uid = await uidByEmail(email);

          if (uid && mapped) {
            const start = new Date(sub.current_period_start * 1000);
            const end   = new Date(sub.current_period_end * 1000);

            await upsertMembership(uid, {
              plan: mapped.plan,
              billing: mapped.billing,
              active: sub.status === "active" || sub.status === "trialing",
              stripeCustomerId: customerId,
              stripeSubscriptionId: sub.id,
              currentPeriodStart: admin.firestore.Timestamp.fromDate(start),
              currentPeriodEnd: admin.firestore.Timestamp.fromDate(end)
            });

            // 사용량 도큐 보장(이번 달)
            await ensureUsage(uid, monthKeyFromDate());

            // 갱신 시 monthsActive +1 (created 때도 업데이트됨)
            if (event.type === "customer.subscription.updated" && sub.status === "active") {
              await incMonthsActive(uid);
            }
          }
          break;
        }

        case "invoice.paid": {
          // 정기 갱신 성공 → monthsActive +1, usage 도큐 보장
          const invoice = event.data.object;
          const customerId = invoice.customer;
          const customer = await stripe.customers.retrieve(customerId);
          const uid = await uidByEmail(customer?.email);
          if (uid) {
            await incMonthsActive(uid);
            await ensureUsage(uid, monthKeyFromDate());
          }
          break;
        }

        case "invoice.payment_failed": {
          const invoice = event.data.object;
          const customerId = invoice.customer;
          const customer = await stripe.customers.retrieve(customerId);
          const uid = await uidByEmail(customer?.email);
          if (uid) {
            await upsertMembership(uid, { active: false });
          }
          break;
        }

        case "customer.subscription.deleted": {
          const sub = event.data.object;
          const customerId = sub.customer;
          const customer = await stripe.customers.retrieve(customerId);
          const uid = await uidByEmail(customer?.email);
          if (uid) {
            await upsertMembership(uid, { active: false });
          }
          break;
        }

        default:
          // other events are ignored
          break;
      }
    } catch (err) {
      logger.error("❌ Webhook processing error", err);
      // 이벤트 idempotency 문서 삭제(롤백)는 굳이 필요 없음. 재시도시 duplicate로 막힘.
      return res.status(500).send("Internal");
    }

    return res.json({ received: true });
  }
);

// v2 onRequest handler (region/timeout 조정 가능)
export const stripeWebhook = onRequest(
  {
    region: "europe-west1",
    secrets: [
      STRIPE_SECRET, STRIPE_WEBHOOK_SECRET,
      PRICE_PLUS_MONTH, PRICE_PLUS_YEAR, PRICE_BLACK_MONTH, PRICE_BLACK_YEAR
    ],
    timeoutSeconds: 30,
    memory: "256MiB"
  },
  app
);

// ----- 스케줄러: 60일 무예약 → 1단계 강등 -----
export const demoteInactiveUsers = pubsub.schedule("every day 03:00").onRun(async () => {
  const cutoff = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 1000*60*60*24*60));
  // lastBookingAt <= cutoff 인 유저 찾기 (필요시 인덱스 생성)
  const qs = await db.collection("users")
    .where("lastBookingAt", "<=", cutoff)
    .get();

  for (const docSnap of qs.docs) {
    const u = docSnap.data();
    const level = u.level || "Bronze";
    const idx = LEVELS.indexOf(level);
    if (idx > 0) {
      const newLevel = LEVELS[idx - 1];
      await docSnap.ref.set({ level: newLevel, demotedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
      // 알림 큐에 적재(옵션)
      await db.collection("notifications").add({
        uid: docSnap.id,
        type: "LEVEL_DEMOTED",
        from: level,
        to: newLevel,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      logger.info(`Demoted ${docSnap.id} from ${level} → ${newLevel}`);
    }
  }
});

// ----- 스케줄러: 티켓 발급(지연 지급) -----
export const issueTicketsDaily = pubsub.schedule("every day 04:00").onRun(async () => {
  // 활성 멤버십 사용자만 체크
  const ms = await db.collection("memberships")
    .where("active", "==", true)
    .get();

  for (const m of ms.docs) {
    const { plan } = m.data();
    if (plan !== "plus" && plan !== "black") continue;
    await maybeIssueTickets(m.id, plan);
  }
});
