// netlify/functions/nowpayments-ipn.js
// NOWPayments IPN webhook → 서명검증(HMAC-SHA512) → Firestore에 결제/예약 반영

const crypto = require("crypto");
const admin = require("firebase-admin");

// --- Firebase Admin 초기화(함수 Cold Start마다 1회) ---
function getFirestore() {
  if (!admin.apps.length) {
    const saStr = process.env.FIREBASE_SERVICE_ACCOUNT || "";
    if (!saStr) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT");

    // 환경변수에 들어있는 JSON 문자열을 객체로 변환
    const serviceAccount = JSON.parse(saStr);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.firestore();
}

// --- 유틸: 콘솔 로깅(디버깅 편의) ---
function log(...args) {
  console.log("[NOWP-IPN]", ...args);
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET || "";
    if (!ipnSecret) {
      return { statusCode: 500, body: "Missing NOWPAYMENTS_IPN_SECRET" };
    }

    const rawBody = event.body || "";
    // NOWPayments가 보내는 헤더 (대/소문자 케이스 대응)
    const signature =
      event.headers["x-nowpayments-sig"] ||
      event.headers["X-Nowpayments-Sig"] ||
      event.headers["x-NowPayments-Sig"] ||
      "";

    // 1) 서명 검증 (문서대로 raw body에 대한 sha512 HMAC)
    const expected = crypto.createHmac("sha512", ipnSecret).update(rawBody).digest("hex");
    if (signature !== expected) {
      log("Invalid signature", { signature, expected });
      return { statusCode: 401, body: "Invalid signature" };
    }

    // 2) 페이로드 파싱
    const payload = JSON.parse(rawBody || "{}");
    log("IPN payload:", payload);

    // NOWPayments 주요 필드(문서 기준)
    const {
      payment_id,           // NOWPayments 고유 결제 id
      payment_status,       // waiting, confirming, finished, failed, refunded, expired, partially_paid
      pay_currency,         // 예: USDTTRX
      pay_amount,           // 실제 송금된 암호화폐 수량
      price_amount,         // 원화가 아님! '결제 통화(USD)' 기준 금액
      price_currency,       // 보통 USD
      order_id,             // 인보이스 만들 때 우리가 넣은 값 (예약ID로 쓰면 최고)
      invoice_id,           // 인보이스 ID
      ipn_type,             // 상태종류
      created_at,           // 생성시각
      actually_paid,        // 실제 입금액(체인 오차 포함)
      purchase_id,          // (있을 수도)
      transaction_id,       // 체인 txid (있으면 저장하면 좋아요)
    } = payload;

    // 3) Firestore에 반영
    const db = getFirestore();

    // (1) payments 콜렉션에 결제 레코드 upsert (idempotent: payment_id 고정)
    const paymentDocId = String(payment_id || invoice_id || `np_${Date.now()}`);
    const paymentRef = db.collection("payments").doc(paymentDocId);

    const paymentData = {
      provider: "NOWPayments",
      payment_id: payment_id || null,
      invoice_id: invoice_id || null,
      order_id: order_id || null,
      status: payment_status || null,

      pay_currency: pay_currency || null,
      pay_amount: pay_amount != null ? Number(pay_amount) : null,

      price_amount: price_amount != null ? Number(price_amount) : null, // USD 기준 청구액
      price_currency: price_currency || "USD",

      actually_paid: actually_paid != null ? Number(actually_paid) : null,
      transaction_id: transaction_id || null,

      ipn_type: ipn_type || null,
      created_at: created_at || null,
      received_at: admin.firestore.FieldValue.serverTimestamp(),
      raw: payload, // 원본 백업(문제 발생시 분석용)
    };

    await paymentRef.set(paymentData, { merge: true });
    log("payments upserted:", paymentDocId);

    // (2) 예약 문서 업데이트: order_id 를 예약ID로 쓰는 방식 권장
    //    - 인보이스 생성할 때 order_id 에 예약ID를 심어 두셨다면 여기서 그대로 사용됩니다.
    if (order_id) {
      const bookingRef = db.collection("bookings").doc(String(order_id));

      // status 매핑
      let bookingStatus = "pending";
      if (payment_status === "finished") bookingStatus = "paid";
      else if (payment_status === "partially_paid") bookingStatus = "partially_paid";
      else if (payment_status === "failed" || payment_status === "refunded" || payment_status === "expired")
        bookingStatus = "payment_error";

      const bookingUpdate = {
        status: bookingStatus,
        payment: {
          provider: "NOWPayments",
          payment_id: payment_id || null,
          invoice_id: invoice_id || null,
          pay_currency: pay_currency || null,
          pay_amount: pay_amount != null ? Number(pay_amount) : null,
          price_amount: price_amount != null ? Number(price_amount) : null,
          price_currency: price_currency || "USD",
          actually_paid: actually_paid != null ? Number(actually_paid) : null,
          transaction_id: transaction_id || null,
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        },
      };

      // paidAt 타임스탬프는 결제 완료시에만 기록
      if (payment_status === "finished") {
        bookingUpdate.paidAt = admin.firestore.FieldValue.serverTimestamp();
      }

      await bookingRef.set(bookingUpdate, { merge: true });
      log("booking updated:", order_id, bookingStatus);

      // (선택) 서브콜렉션으로 결제 히스토리 적재
      await bookingRef
        .collection("payments")
        .doc(paymentDocId)
        .set(
          {
            ...paymentData,
            linkedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      log("booking payments history appended:", order_id, paymentDocId);
    } else {
      log("order_id is missing in payload. bookings 업데이트는 생략.");
    }

    return { statusCode: 200, body: "ok" };
  } catch (e) {
    console.error("[NOWP-IPN] error:", e);
    return { statusCode: 500, body: e.message };
  }
};
