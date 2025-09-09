const { ok, bad, fail } = require("./_chatHelpers");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    if (!body.invoiceId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing invoiceId" }) };
    }

    // 결제 처리 로직...
    return { statusCode: 200, body: JSON.stringify({ status: "payment received" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
