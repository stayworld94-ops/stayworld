// /assets/login.js  (type="module" 로 include 하세요)

// Firebase 불러오기 (ESM CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// 세션을 로컬에 유지
await setPersistence(auth, browserLocalPersistence).catch(() => {});

/* --------------------------------------------------
   유틸
-------------------------------------------------- */
function afterLogin(user) {
  // 1) 프론트 전역 상태 저장 (auth-bridge가 UI 토글)
  if (window.swAuth?.login) window.swAuth.login();

  // 2) 홈으로 리다이렉트 (브리지가 URL 힌트로도 보조)
  const url = new URL("/", location.origin);
  url.searchParams.set("logged_in", "1");
  location.href = url.toString();
}

function showError(err) {
  // Firebase 에러 메시지 간단 변환
  const msg =
    err?.code === "auth/invalid-credential" ? "이메일 또는 비밀번호가 올바르지 않습니다." :
    err?.code === "auth/popup-closed-by-user" ? "팝업이 닫혀 로그인에 실패했습니다." :
    err?.message || String(err);
  alert("로그인 실패: " + msg);
}

/* --------------------------------------------------
   이미 로그인된 경우 바로 홈으로
-------------------------------------------------- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    // 브리지 상태 싱크
    if (window.swAuth?.login) window.swAuth.login();
    // 중복 리다이렉트 방지: 로그인 페이지에만 있을 때 홈으로
    if (location.pathname.includes("login")) {
      const url = new URL("/", location.origin);
      url.searchParams.set("logged_in", "1");
      location.replace(url.toString());
    }
  }
});

/* --------------------------------------------------
   이메일/비밀번호 로그인
-------------------------------------------------- */
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail")?.value?.trim();
  const password = document.getElementById("loginPassword")?.value || "";

  if (!email || !password) {
    alert("이메일과 비밀번호를 입력해 주세요.");
    return;
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    alert("로그인 성공! 🎉");
    afterLogin(cred.user);
  } catch (err) {
    showError(err);
  }
});

/* --------------------------------------------------
   구글 로그인 (팝업)
-------------------------------------------------- */
document.getElementById("googleLoginBtn")?.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const cred = await signInWithPopup(auth, provider);
    alert("구글 로그인 성공! 🎉");
    afterLogin(cred.user);
  } catch (err) {
    showError(err);
  }
});
