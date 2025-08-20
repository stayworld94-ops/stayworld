// assets/signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase 설정 (그대로 사용)
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

// DOM 참조 (⚠️ HTML과 정확히 일치)
const form = document.getElementById("form-signup");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");

// 공통: 로그인된 상태로 표시 + 홈으로 이동
function finishLogin(user, displayNameOverride = "") {
  localStorage.setItem("sw_logged_in", "true");
  localStorage.setItem("stayworldUser", JSON.stringify({
    uid: user?.uid || "",
    email: user?.email || "",
    displayName: displayNameOverride || user?.displayName || nameEl?.value || ""
  }));
  try { window.markLoggedIn && window.markLoggedIn(); } catch {}
  location.assign("/"); // 홈으로
}

// 이메일/비밀번호 회원가입
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailEl?.value?.trim();
  const password = pwEl?.value || "";
  const fullName = nameEl?.value?.trim();

  if (!fullName) { alert("이름을 입력해 주세요."); return; }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (fullName) { try { await updateProfile(cred.user, { displayName: fullName }); } catch {} }
    alert("🎉 회원가입 성공! 자동으로 로그인되었습니다.");
    finishLogin(cred.user, fullName);
  } catch (err) {
    alert("❌ 회원가입 실패: " + (err?.message || "알 수 없는 오류"));
    console.error(err);
  }
});

// 구글로 가입/로그인
googleBtn?.addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    alert("✅ Google 로그인 성공");
    finishLogin(cred.user);
  } catch (err) {
    alert("❌ Google 로그인 실패: " + (err?.message || "팝업 차단 여부를 확인해 주세요."));
    console.error(err);
  }
});
