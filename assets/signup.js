import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// ✅ 이메일 가입
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value.trim();
  const pw = document.getElementById("signupPassword").value.trim();

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pw);
    localStorage.setItem("sw_logged_in", "true");
    localStorage.setItem("sw_user_email", cred.user.email);

    if (window.markLoggedIn) window.markLoggedIn();

    alert(`회원가입 성공! 🎉\n환영합니다, ${cred.user.email} 님`);
    window.location.href = "index.html";
  } catch (err) {
    alert("회원가입 실패: " + err.message);
  }
});

// ✅ 구글 회원가입
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("googleSignup")?.addEventListener("click", async () => {
    try {
      const cred = await signInWithPopup(auth, provider);
      localStorage.setItem("sw_logged_in", "true");
      localStorage.setItem("sw_user_email", cred.user.email);

      if (window.markLoggedIn) window.markLoggedIn();

      alert(`Google 회원가입 완료! 🎉\n환영합니다, ${cred.user.email} 님`);
      window.location.href = "index.html";
    } catch (err) {
      alert("Google 회원가입 오류: " + err.message);
    }
  });
});
