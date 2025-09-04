// netlify/functions/_firebaseAdmin.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
  const projectId   = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey  = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    // databaseURL: process.env.FIREBASE_DATABASE_URL, // (RealtimeDB 쓸 때)
  });
}

const db   = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
