// netlify/functions/createNowInvoice.js
const { db } = require('./_firebaseAdmin.js');

const NOW_BASE = 'https://api.nowpayments.io/v1';

// 공통 헤더(CORS)
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
  'Content-Type': 'application/json; charset=utf-8',
};

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ ok:false, error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { bookingId, payCurrency } = body;
    if (!bookingId) {
      return { statusCode: 400, headers: CORS, body: JSON.stringify({ ok:false, error:'Missing bookingId' }) };
    }

    const snap = await db.collection('bookings').doc(bookingId).get();
    if (!snap.exists) {
      return { statusCode: 404, headers: CORS, body: JSON.stringify({ ok:false, error:'Booking not found' }) };
    }
    const b = snap.data() || {};

    // 금액/통화 기본값 보정
    const priceAmount   = Number(b.totalPrice || 0);
    const priceCurrency = String(b.currency || 'USD').toUpperCase();

    // NOWPayments payload
    const payload = {
      price_amount: priceAmount,
      price_currency: priceCurrency,
      // pay_currency 생략하면 NP에서 사용자에게 코인 선택 UI 제공
      ...(payCurrency ? { pay_currency: payCurrency } : {}),
      order_id: bookingId,
      order_description: `StayWorld Booking — ${b.listingId || ''}`.trim(),
      success_url: `${process.env.PUBLIC_BASE_URL}/checkout.html?status=success&bid=${encodeURIComponent(bookingId)}`,
      cancel_url: `${process.env.PUBLIC_BASE_URL}/checkout.html?status=cancel&bid=${encodeURIComponent(bookingId)}`,
    };

    // 호출
    const res = await fetch(`${NOW_BASE}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NOWPAYMENTS_API_KEY || '',
      },
      body: JSON.stringify(payload),
    });

    // HTTP 레벨 에러
    if (!res.ok) {
      const txt = await res.text().catch(()=>'');
      console.error('NOWPayments HTTP error', res.status, txt);
      return { statusCode: 502, headers: CORS, body: JSON.stringify({ ok:false, error:'NOWPayments upstream error' }) };
    }

    const json = await res.json().catch(()=>null);
    if (!json || !json.invoice_url) {
      console.error('NOWPayments response parse / missing invoice_url', json);
      return { statusCode: 502, headers: CORS, body: JSON.stringify({ ok:false, error:'NOWPayments error' }) };
    }

    // Firestore 업데이트 (게이트웨이 정보 기록)
    await snap.ref.update({
      gateway: 'nowpayments',
      nowPaymentId: json.payment_id || null,
      nowInvoiceUrl: json.invoice_url || null,
      updatedAt: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ ok:true, url: json.invoice_url, id: json.payment_id || null }),
    };
  } catch (e) {
    console.error('createNowInvoice error', e);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ ok:false, error:'Server Error' }) };
  }
};
