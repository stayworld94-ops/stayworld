const fetch = require("node-fetch");
const { db } = require("./_firebaseAdmin");

const NOW_BASE = "https://api.nowpayments.io/v1";

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200 };
  if (event.httpMethod !== "POST") return { statusCode: 405 };

  try {
    const { bookingId, payCurrency } = JSON.parse(event.body || "{}");
    if (!bookingId) return { statusCode: 400, body: "Missing bookingId" };

    const snap = await db.collection("bookings").doc(bookingId).get();
    if (!snap.exists) return { statusCode: 404, body: "Booking not found" };
    const b = snap.data();

    const payload = {
      price_amount: b.totalPrice,
      price_currency: (b.currency || "USD").toUpperCase(),
      pay_currency: payCurrency || undefined,
      order_id: bookingId,
      order_description: `StayWorld Booking — ${b.listingId}`,
      success_url: `${process.env.PUBLIC_BASE_URL}/checkout.html?status=success&bid=${bookingId}`,
      cancel_url: `${process.env.PUBLIC_BASE_URL}/checkout.html?status=cancel&bid=${bookingId}`,
    };

    const res = await fetch(`${NOW_BASE}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!json || !json.invoice_url) {
      console.error("NOWPayments create error", json);
      return { statusCode: 502, body: "NOWPayments error" };
    }

    await snap.ref.update({ gateway: "nowpayments", nowInvoiceId: json.payment_id });
    return { statusCode: 200, body: JSON.stringify({ url: json.invoice_url }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "Server Error" };
  }
};
