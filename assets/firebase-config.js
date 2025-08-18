// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// ✅ Firebase web app configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.appspot.com",   // ✅ 여기 수정 완료
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Optional: Analytics
export const analytics = getAnalytics(app);

// Export auth (로그인/회원가입/구글 로그인에서 사용)
export const auth = getAuth(app);
