// Firebase 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 📌 이메일 로그인
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    alert("로그인 성공! 🎉");

    // ✅ 로그인 처리
    if (window.markLoggedIn) {
      window.markLoggedIn(cred.user);
    }

    // 홈으로 이동
    window.location.href = "index.html";
  } catch (err) {
    alert("로그인 실패: " + err.message);
  }
});

// 📌 구글 로그인
document.getElementById("googleLoginBtn")?.addEventListener("click", async () => {
  try {
    const cred = await signInWithPopup(auth, provider);

    alert("구글 로그인 성공! 🎉");

    // ✅ 로그인 처리
    if (window.markLoggedIn) {
      window.markLoggedIn(cred.user);
    }

    // 홈으로 이동
    window.location.href = "index.html";
  } catch (err) {
    alert("구글 로그인 실패: " + err.message);
  }
});
