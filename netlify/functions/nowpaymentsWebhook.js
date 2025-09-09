const { ok, bad, fail } = require("./_chatHelpers");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    // 예시: NOWPayments에서 필수 필드 체크
    if (!body.payment_id) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing payment_id" }) };
    }

    // ✅ 실제 NOWPayments webhook 처리 로직 추가
    console.log("NOWPayments webhook received:", body);

    return { statusCode: 200, body: JSON.stringify({ status: "nowpayments webhook processed" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
