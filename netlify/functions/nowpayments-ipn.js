const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET || "";
    if (!ipnSecret) return { statusCode: 500, body: "Missing NOWPAYMENTS_IPN_SECRET" };

    const signature = event.headers["x-nowpayments-sig"] || event.headers["X-Nowpayments-Sig"] || "";
    const body = event.body || "";

    const h = crypto.createHmac("sha512", ipnSecret).update(body).digest("hex");
    if (h !== signature) return { statusCode: 401, body: "Invalid signature" };

    const payload = JSON.parse(body || "{}");
    // TODO: payment_status === "finished" 시 예약 확정 처리
    return { statusCode: 200, body: "ok" };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
