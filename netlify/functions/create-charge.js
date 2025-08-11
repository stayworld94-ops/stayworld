// Netlify Function: POST /api/crypto/create-charge
// 역할: Coinbase Commerce "Hosted Page" 생성 → hosted_url 반환
// 의존성: 없음 (Node 18의 fetch 사용)

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { reservationId, amountUSD, customerEmail } = JSON.parse(event.body || "{}");

    if (!reservationId || !amountUSD) {
      return { statusCode: 400, body: "Missing fields: reservationId, amountUSD" };
    }

    const resp = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CC-Api-Key": process.env.COINBASE_COMMERCE_API_KEY
      },
      body: JSON.stringify({
        name: "StayWorld Booking",
        description: `Reservation #${reservationId}`,
        local_price: { amount: String(amountUSD), currency: "USD" },
        pricing_type: "fixed_price",
        metadata: { reservationId, customerEmail },
        cancel_url: "https://stayworldbooking.com/payment/cancel",
        redirect_url: "https://stayworldbooking.com/payment/success"
      })
    });

    const data = await resp.json();
    const hostedUrl = data?.data?.hosted_url;
    const chargeId = data?.data?.id;

    if (!hostedUrl) {
      return {
        statusCode: 502,
        body: "Coinbase create charge failed"
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostedUrl, chargeId })
    };
  } catch (e) {
    console.error("create-charge error:", e);
    return { statusCode: 500, body: "Failed to create charge" };
  }
};
