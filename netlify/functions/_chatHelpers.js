// _chatHelpers.js
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function ok(res, body = { success: true }) {
  json(res, 200, body);
}

function bad(res, msg = "Bad Request") {
  json(res, 400, { error: msg });
}

function fail(res, msg = "Internal Server Error") {
  json(res, 500, { error: msg });
}

module.exports = { ok, bad, fail };
