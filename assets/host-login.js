import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 이메일 로그인
document.getElementById("hostLoginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("hostLoginEmail").value.trim();
  const pw = document.getElementById("hostLoginPw").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, pw);
    alert("호스트 로그인 성공!");
    window.location.href = "host-dashboard.html";
  } catch (err) {
    alert("호스트 로그인 실패: " + err.message);
  }
});

// Google 로그인
document.getElementById("hostGoogleLogin")?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    alert("Google 호스트 로그인 완료!");
    window.location.href = "host-dashboard.html";
  } catch (err) {
    alert("Google 로그인 오류: " + err.message);
  }
});
