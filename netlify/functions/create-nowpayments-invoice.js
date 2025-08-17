// netlify/functions/create-nowpayments-invoice.js
// Create NOWPayments invoice with NO minimum amount
// ENV: NOWPAYMENTS_API_KEY (필수), NOWPAYMENTS_IPN_SECRET(웹훅 검증용, 대시보드에도 IPN URL 설정되어 있어야 함)

const API_ENDPOINT = "https://api.nowpayments.io/v1/invoice";

// 도메인은 프로젝트에 맞게 수정하세요.
const DOMAIN = "https://stayworldbooking.com";
const SUCCESS_URL = `${DOMAIN}/payment/success.html`;
const CANCEL_URL  = `${DOMAIN}/payment/cancel.html`;
// IPN을 개별 인보이스에 명시하고 싶다면 아래 사용 (대시보드 IPN을 쓰면 생략 가능)
const IPN_URL     = `${DOMAIN}/.netlify/functions/nowpayments-ipn`;

exports.handler = async (event) => {
  // CORS (필요 시)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const apiKey = process.env.NOWPAYMENTS_API_KEY || "";
    if (!apiKey) {
      return { statusCode: 500, body: "Missing NOWPAYMENTS_API_KEY" };
    }

    const body = JSON.parse(event.body || "{}");
    const amount = Number(body.amount_usd);

    // ✔ 최소값 검증 제거: 금액만 숫자인지만 체크
    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "금액을 올바르게 입력하세요." }),
      };
    }

    // NOWPayments 인보이스 생성 페이로드
    const payload = {
      price_amount: amount,
      price_currency: "usd",
      order_id: `sw-${Date.now()}`,
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      ipn_callback_url: IPN_URL, // 대시보드 IPN을 쓴다면 넣지 않아도 OK
    };

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({
          message: data?.message || "NOWPayments 인보이스 생성 실패",
          detail: data,
        }),
      };
    }

    // 프론트가 이동할 주소
    const invoiceUrl = data?.invoice_url || data?.invoice_url_by_token || data?.url;
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ invoice_url: invoiceUrl, raw: data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message || "Server error" }),
    };
  }
};
