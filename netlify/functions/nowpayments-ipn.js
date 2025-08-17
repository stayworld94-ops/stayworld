// netlify/functions/nowpayments-ipn.js
const crypto = require("crypto");
let admin; // lazy import
let db;

function initFirebase() {
  if (admin) return;
  admin = require("firebase-admin");

  // Netlify 환경변수에 넣어둔 서비스 계정 JSON
  // (FIREBASE_SERVICE_ACCOUNT 키에 전체 JSON 문자열)
  const svc = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!svc) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT");

  const credentials = JSON.parse(svc);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
  }
  db = admin.firestore();
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // --- 1) 시크릿/시그니처 검증 ---
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET || "";
    if (!ipnSecret) {
      return { statusCode: 500, body: "Missing NOWPAYMENTS_IPN_SECRET" };
    }

    // Netlify는 보통 소문자 헤더로 들어옴
    const signature = event.headers["x-nowpayments-sig"] || "";
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : (event.body || "");

    const calc = crypto.createHmac("sha512", ipnSecret).update(rawBody).digest("hex");
    if (calc !== signature) {
      return { statusCode: 401, body: "Invalid signature" };
    }

    // --- 2) 페이로드 파싱 ---
    const p = JSON.parse(rawBody || "{}");

    // NOWPayments 주요 필드 (문서에 따라 필요한 것 추가해서 쓰면 됨)
    const {
      payment_status,     // "finished" 등
      payment_id,         // NP 결제 ID
      invoice_id,         // NP 인보이스 ID
      order_id,           // 네가 보낸 커스텀 주문/예약 ID (create API에서 넘긴 값)
      pay_amount,         // 받은 코인 수량
      pay_currency,       // 받은 코인 (예: USDTTRC20 또는 TRX)
      price_amount,       // 요청 가격(USD)
      price_currency,     // 보통 "usd"
      created_at,         // 생성 시간
      updated_at,         // 업데이트 시간
      actually_paid,      // 실제 지불액
      confirmations,      // 컨펌 수
      payment_hash,       // 체인 TX 해시
    } = p;

    // --- 3) Firestore에 기록 / 예약 상태 업데이트 ---
    initFirebase();

    // 3-1) 결제 레코드 upsert
    const payDocId = String(payment_id || invoice_id || `${order_id || "no-order"}-${Date.now()}`);
    const paymentRef = db.collection("payments").doc(payDocId);

    const paymentData = {
      src: "NOWPayments",
      payment_status,
      payment_id: payment_id ?? null,
      invoice_id: invoice_id ?? null,
      order_id: order_id ?? null,
      pay_amount: pay_amount ?? null,
      pay_currency: pay_currency ?? null,
      price_amount: price_amount ?? null,
      price_currency: price_currency ?? null,
      actually_paid: actually_paid ?? null,
      confirmations: confirmations ?? null,
      payment_hash: payment_hash ?? null,
      created_at: created_at ? new Date(created_at) : admin.firestore.FieldValue.serverTimestamp(),
      updated_at: updated_at ? new Date(updated_at) : admin.firestore.FieldValue.serverTimestamp(),
      ipn_received_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await paymentRef.set(paymentData, { merge: true });

    // 3-2) 예약(booking/order) 문서 상태 변경 (컬렉션 이름은 원하는 대로)
    if (order_id) {
      const bookingRef = db.collection("bookings").doc(String(order_id));
      const setPaid = payment_status === "finished";

      await bookingRef.set(
        {
          status: setPaid ? "paid" : payment_status,     // finished면 paid로
          last_payment_id: payment_id ?? null,
          last_invoice_id: invoice_id ?? null,
          last_pay_currency: pay_currency ?? null,
          last_pay_amount: pay_amount ?? null,
          last_price_amount: price_amount ?? null,
          last_price_currency: price_currency ?? null,
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    // --- 4) 응답 (NP가 재시도하지 않도록 200 빠르게) ---
    return { statusCode: 200, body: "ok" };
  } catch (e) {
    // 디버깅 단계에서는 500 반환해도 OK
    return { statusCode: 500, body: e.message || "error" };
  }
};
