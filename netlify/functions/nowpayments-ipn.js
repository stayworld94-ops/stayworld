// Receives NOWPayments IPN (webhook) and verifies signature (HMAC-SHA512)
// ENV needed:
//  - NOWPAYMENTS_IPN_SECRET
//  - FIREBASE_SERVICE_ACCOUNT  (service account JSON; private_key에 들어있는 \n은 그대로 붙여도 됨)

const crypto = require("crypto");
const admin = require("firebase-admin");

function initFirebase() {
  if (!admin.apps.length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT || "";
    if (!raw) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT");

    let svc;
    try {
      svc = JSON.parse(raw);
    } catch (e) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT is not valid JSON");
    }
    // private_key 줄바꿈 처리
    if (svc.private_key && typeof svc.private_key === "string") {
      svc.private_key = svc.private_key.replace(/\\n/g, "\n");
    }

    admin.initializeApp({ credential: admin.credential.cert(svc) });
  }
  return admin.firestore();
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 1) HMAC 서명 검증
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET || "";
    if (!ipnSecret) return { statusCode: 500, body: "Missing NOWPAYMENTS_IPN_SECRET" };

    const signature =
      event.headers["x-nowpayments-sig"] ||
      event.headers["X-Nowpayments-Sig"] ||
      "";
    const body = event.body || "";

    const h = crypto.createHmac("sha512", ipnSecret).update(body).digest("hex");
    if (h !== signature) {
      console.warn("Invalid signature");
      return { statusCode: 401, body: "Invalid signature" };
    }

    // 2) Payload 파싱
    const p = JSON.parse(body || "{}");
    // 대표 필드들 (문서화 기준 – 없는 것도 있을 수 있음)
    const {
      payment_id,
      order_id,
      invoice_id,
      payment_status,
      price_amount,
      price_currency,
      pay_amount,
      pay_currency,
      actually_paid,
      actually_amount,
      update_time,
      created_at,
      // …필요한 것 더 추가 가능
    } = p;

    // 3) Firestore 저장
    const db = initFirebase();

    const payDocId =
      String(payment_id ?? invoice_id ?? order_id ?? `np_${Date.now()}`);

    const paymentRef = db.collection("payments").doc(payDocId);

    await paymentRef.set(
      {
        source: "NOWPayments",
        payment_id: payment_id ?? null,
        order_id: order_id ?? null,
        invoice_id: invoice_id ?? null,
        status: payment_status ?? null,
        price_amount: price_amount ?? null,
        price_currency: price_currency ?? null,
        pay_amount: pay_amount ?? null,
        pay_currency: pay_currency ?? null,
        actually_paid: actually_paid ?? null,
        actually_amount: actually_amount ?? null,
        update_time: update_time ?? null,
        created_at: created_at ?? null,
        raw: p,
        receivedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // 4) 결제 완료면 예약 확정
    if (payment_status === "finished" && order_id) {
      const bookingRef = db.collection("bookings").doc(String(order_id));
      await bookingRef.set(
        {
          status: "paid",
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
          payment: {
            provider: "NOWPayments",
            payment_id: payment_id ?? null,
            invoice_id: invoice_id ?? null,
            pay_amount: pay_amount ?? null,
            pay_currency: pay_currency ?? null,
            price_amount: price_amount ?? null,
            price_currency: price_currency ?? null,
          },
        },
        { merge: true }
      );
    }

    console.log("IPN handled:", {
      payment_status,
      order_id,
      payment_id,
    });

    return { statusCode: 200, body: "ok" };
  } catch (e) {
    console.error("IPN error:", e);
    return { statusCode: 500, body: e.message };
  }
};
