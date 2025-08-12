// Netlify Function: NOWPayments invoice create (USDT TRC20)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const NP_API_KEY = process.env.NP_API_KEY || "9M8W65Y-79P4MR8-HTCJGW4-ZBPH9V8"; // replace with env var in production
const PAYOUT_ADDRESS = process.env.NP_PAYOUT || "TTpiMM1sLUkPys6teMz4TN2FtTxMqN27mU";

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({error:'Method not allowed'}) };
  }
  try{
    const { amountUSD, orderId } = JSON.parse(event.body||'{}');
    if (!amountUSD || !orderId) {
      return { statusCode: 400, body: JSON.stringify({error:'amountUSD and orderId required'}) };
    }
    const payload = {
      price_amount: Number(amountUSD),
      price_currency: "usd",
      order_id: String(orderId),
      pay_currency: "usdttrc20",
      is_fee_paid_by_user: true,
      payout_address: PAYOUT_ADDRESS
    };
    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: { "x-api-key": NP_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if(!res.ok){
      return { statusCode: res.status, body: JSON.stringify(data) };
    }
    return { statusCode: 200, body: JSON.stringify({ invoice_url: data.invoice_url }) };
  }catch(e){
    return { statusCode: 500, body: JSON.stringify({error:e.message}) };
  }
};
