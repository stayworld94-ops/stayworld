// _chatHelpers.js
// 공통 응답 헬퍼 함수 (CJS 방식: require/module.exports)

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

// 성공 응답
function ok(res, body = { success: true }) {
  json(res, 200, body);
}

// 클라이언트 오류 응답
function bad(res, msg = "Bad Request") {
  json(res, 400, { error: msg });
}

// 서버 오류 응답
function fail(res, msg = "Internal Server Error") {
  json(res, 500, { error: msg });
}

module.exports = { ok, bad, fail };
