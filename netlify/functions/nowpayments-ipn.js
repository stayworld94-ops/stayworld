// Receives NOWPayments IPN (webhook) and verifies signature (HMAC-SHA512)
// ENV needed: NOWPAYMENTS_IPN_SECRET
// Set your IPN URL in NOWPayments dashboard to: https://<your-domain>/.netlify/functions/nowpayments-ipn

const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET || "";
    if (!ipnSecret) return { statusCode: 500, body: "Missing NOWPAYMENTS_IPN_SECRET" };

    const signature = event.headers["x-nowpayments-sig"] || event.headers["X-Nowpayments-Sig"] || "";
    const body = event.body || "";

    // Verify HMAC-SHA512
    const h = crypto.createHmac("sha512", ipnSecret).update(body).digest("hex");
    if (h !== signature) return { statusCode: 401, body: "Invalid signature" };

    const payload = JSON.parse(body || "{}");

    // TODO: Update your DB here (example fields)
    // const { payment_status, payment_id, order_id, pay_amount, pay_currency, price_amount, price_currency } = payload;
    // - When payment_status === "finished", mark booking as paid
    // - Save platform_fee/host_due if you compute them

    return { statusCode: 200, body: "ok" };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
