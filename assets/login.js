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

// ✅ 일반 로그인
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const pw = document.getElementById("loginPassword").value.trim();

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pw);
    alert(`로그인 성공! 🎉\n환영합니다, ${cred.user.email} 님`);
    window.location.href = "index.html";
  } catch (err) {
    alert("로그인 실패: " + err.message);
  }
});

// ✅ 구글 로그인
let isGoogleLoggingIn = false;
document.getElementById("googleLogin")?.addEventListener("click", async () => {
  if (isGoogleLoggingIn) return;
  isGoogleLoggingIn = true;

  try {
    const cred = await signInWithPopup(auth, provider);
    alert(`Google 로그인 완료! 🎉\n환영합니다, ${cred.user.email} 님`);
    window.location.href = "index.html";
  } catch (err) {
    alert("Google 로그인 오류: " + err.message);
  } finally {
    isGoogleLoggingIn = false;
  }
});
