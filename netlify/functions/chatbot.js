const { admin, getApp } = require('./_firebase');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    getApp();
    const db = admin.firestore();

    const payload = JSON.parse(event.body || '{}');
    // TODO: 서명 검증 & 저장
    // await db.collection('payments').add(payload);

    return { statusCode: 200, body: 'OK' };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: e.message };
  }
};
