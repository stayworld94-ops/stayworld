// === Netlify Functions 호출 베이스 ===
// 두 가지 중 택1:
// 1) stayworld와 functions가 "같은" Netlify 사이트면 상대경로 사용(프록시 가능):
//    const FUNCTIONS_BASE = "/.netlify/functions";
// 2) 지금처럼 functions가 별도 레포/별도 사이트(stayworld-pay)라면 "절대경로" 사용:
const FUNCTIONS_BASE = "https://<YOUR-stayworld-pay-SITE>.netlify.app/.netlify/functions"; // ← 실제 서브도메인으로 교체

async function api(fn = "", payload = null) {
  const url = `${FUNCTIONS_BASE}/${fn}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload ? JSON.stringify(payload) : null,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// 결제 시작: 사전홀드 → 게이트웨이로 리다이렉트
async function startCheckout({ listingId, userId, checkIn, checkOut, guests, currency, totalPrice, lang, gateway, payCurrency }) {
  // 1) PreBooking (hold)
  const pre = await api("createPreBooking", { listingId, userId, checkIn, checkOut, guests, currency, totalPrice, language: lang });
  const bookingId = pre.bookingId;

  // 2) 게이트웨이 이동 (NOWPayments or PayPal)
  if (gateway === "nowpayments") {
    const { url } = await api("createNowInvoice", { bookingId, payCurrency });
    window.location.href = url; // NOWPayments 호스티드 인보이스로 이동
  } else if (gateway === "paypal") {
    // ⚠️ PayPal JS SDK 주문 생성할 때 반드시 custom_id=bookingId를 포함해서 생성해야 함.
    alert("PayPal 통합: order.create 시 custom_id=bookingId 포함하세요. (프론트 PayPal SDK 통합 시)");
  } else {
    throw new Error("Unsupported gateway");
  }
}

// 간단 i18n 접근자
function t(key) {
  try {
    const [ns, k] = key.split(":");
    return (window.I18N?.[window.CUR_LANG || "en"]?.[ns] || {})[k] || key;
  } catch (e) {
    return key;
  }
}

// 현재 언어 기본값 (필요시 상단 네비의 언어 선택 로직과 연동)
window.CUR_LANG = window.CUR_LANG || (document.documentElement.lang || "en");
