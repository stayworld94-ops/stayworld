const { ok, bad, fail, verifyPaypalIPN, decodeBody } = require("./_chatHelpers");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return bad("POST only");

    // Netlify 환경변수: PAYPAL_ENV = "sandbox" | "live"
    const useSandbox = (process.env.PAYPAL_ENV || "live") !== "live";

    // 1) PayPal IPN 검증
    const verified = await verifyPaypalIPN(event, { useSandbox });
    if (!verified) return bad("IPN not verified");

    // 2) 페이로드 처리 (IPN은 폼 바디)
    const raw = decodeBody(event);
    // 간단 파싱(선택). 실무는 qs 라이브러리 사용 권장
    const params = Object.fromEntries(new URLSearchParams(raw));

    if (!params.txn_id) return bad("Missing txn_id");

    // TODO: 비즈 로직 (주문/결제 상태 업데이트 등)
    // ex) await handlePaypalTxn(params);

    return ok({ status: "paypal IPN processed", txn: params.txn_id });
  } catch (err) {
    console.error("PayPal IPN webhook error:", err);
    return fail(err.message);
  }
};
