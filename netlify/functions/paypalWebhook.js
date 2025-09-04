// paypalWebhook.js
const { enableChatForBooking } = require('./_chatHelpers');

exports.handler = async (event, _context) => {
  try {
    const body = JSON.parse(event.body || '{}');

    // TODO: Verify PayPal webhook signature/event type here
    // Example: if (body.event_type !== 'PAYMENT.CAPTURE.COMPLETED') { ... }

    // Map to your booking id (depends on how you pass custom_id or invoice_id)
    const bookingId = body?.resource?.custom_id || body?.resource?.invoice_id || body?.bookingId;
    if (!bookingId) {
      return { statusCode: 400, body: JSON.stringify({ ok:false, error: 'Missing bookingId' }) };
    }

    // TODO: Update Firestore bookings/{bookingId} to paid/confirmed based on your logic

    await enableChatForBooking({ bookingId });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ ok:false, error: e.message }) };
  }
};
