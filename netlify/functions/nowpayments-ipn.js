// netlify/functions/nowpayments-ipn.js
const crypto = require("crypto");

exports.handler = async (event) => {
  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET; // 네 IPN secret
    const headers = event.headers;
    const hmac = headers["x-nowpayments-sig"]; // 시그니처

    const body = event.body;
    const bodyObj = JSON.parse(body);

    // 시그니처 검증
    const hmacCheck = crypto
      .createHmac("sha512", ipnSecret)
      .update(body)
      .digest("hex");

    if (hmac !== hmacCheck) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "Invalid signature" }),
      };
    }

    // 여기서 결제 상태(bodyObj.payment_status 등) 처리
    console.log("✅ Payment notification:", bodyObj);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "IPN received" }),
    };
  } catch (err) {
    console.error("❌ IPN error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error" }),
    };
  }
};
