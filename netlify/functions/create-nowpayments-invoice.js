// Creates a NOWPayments invoice and returns its hosted URL
// ENV: NOWPAYMENTS_API_KEY (Netlify 환경변수에 등록 필요)
// 동작: 고객은 아무 코인으로 내도, 네가 지정한 USDT TRC20 지갑으로 정산됨

exports.handler = async (event) => {
  // --- CORS ---
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors(), body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };
  }

  try {
    // ✅ Netlify 환경변수에서 API Key 읽기
    const KEY = process.env.NOWPAYMENTS_API_KEY;
    if (!KEY) {
      return {
        statusCode: 500,
        headers: cors(),
        body: JSON.stringify({ error: "Missing NOWPAYMENTS_API_KEY" })
      };
    }

    // --- 클라이언트에서 넘어오는 값 ---
    const { name = "StayWorld Crypto", amount = 10, success_url, cancel_url } =
      JSON.parse(event.body || "{}");

    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({ error: "Invalid amount" })
      };
    }

    // --- 인보이스 생성 Payload ---
    const payload = {
      order_id: "sw_" + Date.now(),
      order_description: name,
      price_amount: amount,          // USD 기준 결제금액
      price_currency: "USD",         // 고정
      pay_currency: "usdttrc20",     // 🔒 항상 USDT TRC20 으로 수금
      success_url,
      cancel_url
    };

    // --- NOWPayments API 호출 ---
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

    // --- 결과 리턴 ---
    const invoiceUrl = data?.invoice_url || data?.data?.invoice_url;
    const invoiceId = data?.id || data?.invoice_id;

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({
        invoice_url: invoiceUrl,
        invoice_id: invoiceId
      })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: cors(),
      body: JSON.stringify({ error: e.message })
    };
  }
};

// --- CORS 헬퍼 ---
function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
