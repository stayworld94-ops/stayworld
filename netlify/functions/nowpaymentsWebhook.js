const { ok, bad, fail, decodeBody, verifyNowpayments } = require("./_chatHelpers");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return bad("POST only");

    const IPN_SECRET = process.env.NOWPAY_IPN_SECRET; // ← Netlify 환경변수에 설정
    if (!IPN_SECRET) return fail("NOWPAY_IPN_SECRET not set");

    // 1) 시그니처 검증
    const good = verifyNowpayments(event, IPN_SECRET);
    if (!good) return bad("Invalid signature");

    // 2) 페이로드 처리
    const bodyRaw = decodeBody(event);
    const payload = JSON.parse(bodyRaw || "{}");

    // 예: 필수 키 체크
    if (!payload.payment_id) return bad("Missing payment_id");

    // TODO: 여기서 주문 조회/상태 업데이트 등 비즈니스 로직
    // ex) await markInvoicePaid(payload.order_id, payload.payment_status);

    return ok({ status: "nowpayments webhook processed" });
  } catch (err) {
    console.error("NOWPayments webhook error:", err);
    return fail(err.message);
  }
};
