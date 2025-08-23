import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = { /* 동일 */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 이메일 로그인
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

// Google 로그인
document.getElementById("googleLogin")?.addEventListener("click", async () => {
  try {
    const cred = await signInWithPopup(auth, provider);
    alert(`Google 로그인 완료! 🎉\n환영합니다, ${cred.user.email} 님`);
    window.location.href = "index.html";
  } catch (err) {
    alert("Google 로그인 오류: " + err.message);
  }
});
