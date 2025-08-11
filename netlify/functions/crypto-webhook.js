// Netlify Function: POST /api/crypto/webhook
// 역할: Coinbase Commerce 웹훅 수신 → 서명 검증 → 상태별 처리
// ⚠️ 이벤트 바디(raw string)를 그대로 HMAC-SHA256 검증해야 함

const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const signature = event.headers["x-cc-webhook-signature"];
  const secret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;
  const rawBody = event.body || ""; // Netlify는 문자열로 전달

  if (!signature || !secret) {
    return { statusCode: 400, body: "Missing webhook signature/secret" };
  }

  // 서명 검증
  const digest = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  if (digest !== signature) {
    return { statusCode: 400, body: "Invalid signature" };
  }

  // 검증 통과 → 이벤트 파싱
  const payload = JSON.parse(rawBody || "{}");
  const type = payload?.type;               // charge:pending | charge:confirmed | charge:failed ...
  const chargeData = payload?.data;
  const reservationId = chargeData?.metadata?.reservationId;
  const hostedId = chargeData?.id;

  try {
    // === 여기에 예약 DB 업데이트 로직 연결 ===
    // 예: Firestore/REST 호출 등
    // if (type === "charge:confirmed") {
    //   await updateReservation(reservationId, {
    //     status: "confirmed",
    //     paidWith: "crypto",
    //     provider: "coinbase",
    //     providerChargeId: hostedId
    //   });
    // }
    // else if (type === "charge:pending") {
    //   await updateReservation(reservationId, { status: "pending_crypto" });
    // }
    // else if (type === "charge:failed" || type === "charge:delayed") {
    //   await updateReservation(reservationId, { status: "payment_failed" });
    // }

    return { statusCode: 200, body: "ok" };
  } catch (e) {
    console.error("webhook handler error:", e);
    return { statusCode: 500, body: "webhook handling failed" };
  }
};
