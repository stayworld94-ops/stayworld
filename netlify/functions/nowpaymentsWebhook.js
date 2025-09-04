// nowpaymentsWebhook.js
const { enableChatForBooking } = require('./_chatHelpers');

exports.handler = async (event, _context) => {
  try {
    const body = JSON.parse(event.body || '{}');

    // TODO: Verify NOWPayments signature & event status here
    // Example: if (body.payment_status !== 'finished') return { statusCode: 200, body: '{"ok":true}' };

    const bookingId = body.order_id; // ensure your order_id maps to your bookings/{bookingId}
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
