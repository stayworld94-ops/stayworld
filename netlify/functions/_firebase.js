const admin = require('firebase-admin');

function loadServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT env is empty');

  let jsonStr = raw;
  try {
    const maybe = Buffer.from(raw, 'base64').toString('utf8');
    JSON.parse(maybe);
    jsonStr = maybe; // base64 였던 경우
  } catch {
    // base64 아니면 그대로 사용
  }
  return JSON.parse(jsonStr);
}

function getApp() {
  if (admin.apps.length) return admin.app();
  const sa = loadServiceAccount();
  return admin.initializeApp({
    credential: admin.credential.cert(sa),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

module.exports = { admin, getApp };
