// netlify/functions/nowpayments-ipn.js
const crypto = require("crypto");

exports.handler = async (event) => {
  // NOWPayments는 POST로 IPN을 보냅니다.
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET || "";
    if (!ipnSecret) {
      return { statusCode: 500, body: "Missing NOWPAYMENTS_IPN_SECRET" };
    }

    // Netlify는 보통 헤더 키를 소문자로 제공합니다.
    const signature =
      event.headers["x-nowpayments-sig"] ||
      event.headers["x-NowPayments-Sig"] ||
      "";

    // HMAC은 "원문 바디 문자열"로 계산해야 합니다.
    // 만약 바디가 base64 인코딩되어 왔다면 디코딩해서 원문을 만듭니다.
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : (event.body || "");

    // HMAC-SHA512 검증
    const calc = crypto.createHmac("sha512", ipnSecret).update(rawBody).digest("hex");
    if (calc !== signature) {
      // 서명이 안 맞는다면 바로 거절
      return { statusCode: 401, body: "Invalid signature" };
    }

    // 여기서부터는 신뢰 가능한 페이로드
    const payload = JSON.parse(rawBody || "{}");

    // 예: 결제 완료 처리
    // if (payload.payment_status === "finished") {
    //   // TODO: 예약 DB 업데이트 (status=paid, 금액/코인/시간 기록)
    // }

    // 꼭 200을 빠르게 반환 (NOWPayments가 재시도하지 않도록)
    return { statusCode: 200, body: "ok" };
  } catch (e) {
    // 에러 시에도 200을 주는 걸 권장하기도 하지만(중복 재시도 방지),
    // 초기 디버깅 단계에서는 500으로 보고 확인해도 됩니다.
    return { statusCode: 500, body: e.message || "error" };
  }
};
