// _firebaseAdmin.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    // databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

module.exports = admin;
