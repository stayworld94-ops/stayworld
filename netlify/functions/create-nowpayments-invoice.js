// netlify/functions/create-nowpayments-invoice.js
// Creates a NOWPayments invoice and returns its hosted URL
// ENV: NOWPAYMENTS_API_KEY  (Netlify 환경변수로만 사용! 코드에 키 하드코딩 금지)

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors(), body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };
  }

  try {
    // ✅ 키는 무조건 환경변수에서만 읽기
    const KEY = process.env.NOWPAYMENTS_API_KEY;
    if (!KEY) {
      return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Missing NOWPAYMENTS_API_KEY" }) };
    }

    // client payload
    const { name = "StayWorld Crypto", amount = 10, success_url, cancel_url } =
      JSON.parse(event.body || "{}");

    if (!Number.isFinite(amount) || amount <= 0) {
      return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "Invalid amount" }) };
    }

    // Create invoice payload (고객 코인은 무엇이든, 수취는 USDT-TRC20 고정)
    const payload = {
      order_id: "sw_" + Date.now(),
      order_description: name,
      price_amount: amount,          // in USD
      price_currency: "USD",
      pay_currency: "usdttrc20",     // 🔒 payout fixed
      success_url,
      cancel_url
    };

    const resp = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers: cors(),
        body: JSON.stringify({ error: data?.message || "NOWPayments error" })
      };
    }

    const invoiceUrl = data?.invoice_url || data?.data?.invoice_url;
    const invoiceId  = data?.id || data?.invoice_id;

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({ invoice_url: invoiceUrl, invoice_id: invoiceId })
    };
  } catch (e) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: e.message }) };
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
