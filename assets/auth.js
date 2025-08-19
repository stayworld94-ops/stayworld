// assets/auth.js
// --- Firebase 모듈 CDN 불러오기 (v10+) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// 1) 여기를 본인 Firebase 설정값으로 교체
// Firebase Console > 프로젝트 설정 > 내 앱 > 구성에서 확인
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",          // 예: stayworld-xxxx.firebaseapp.com
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

// 2) Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3) 로그인 지속성(브라우저 로컬 저장) 설정
await setPersistence(auth, browserLocalPersistence);

// 4) DOM 엘리먼트
const form = document.getElementById("form-login");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

// 5) 에러 메시지 한글 매핑
function mapAuthError(error) {
  const code = (error && error.code) || "";
  switch (code) {
    case "auth/invalid-email":
      return "이메일 형식이 올바르지 않습니다.";
    case "auth/user-disabled":
      return "해당 계정은 비활성화되었습니다.";
    case "auth/user-not-found":
      return "가입되지 않은 이메일입니다.";
    case "auth/wrong-password":
      return "비밀번호가 올바르지 않습니다.";
    case "auth/popup-closed-by-user":
      return "로그인 창이 닫혔습니다. 다시 시도해주세요.";
    case "auth/cancelled-popup-request":
      return "이미 실행 중인 로그인 요청이 있습니다.";
    case "auth/popup-blocked":
      return "팝업이 차단되었습니다. 팝업 허용 후 다시 시도해주세요.";
    case "auth/unauthorized-domain":
      return "허용되지 않은 도메인입니다. Firebase 콘솔에서 Authorized domains에 사이트 도메인을 추가하세요.";
    default:
      return `로그인 실패: ${error?.message || "알 수 없는 오류"}`;
  }
}

function setBusy(busy) {
  const btn = form.querySelector('button[type="submit"]');
  if (busy) {
    btn.setAttribute("disabled", "true");
    googleBtn.setAttribute("disabled", "true");
    btn.textContent = "Signing in…";
  } else {
    btn.removeAttribute("disabled");
    googleBtn.removeAttribute("disabled");
    btn.textContent = "Log in";
  }
}

function showError(msg) {
  if (!errEl) return;
  errEl.textContent = msg || "";
  errEl.style.display = msg ? "block" : "none";
}

function showOk(msg) {
  if (!okEl) return;
  okEl.textContent = msg || "";
  okEl.style.display = msg ? "block" : "none";
}

// 6) 리다이렉트 헬퍼 (?next=/dashboard 같은 쿼리 지원)
function redirectAfterLogin() {
  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";
  window.location.href = next;
}

// 7) 이메일/비번 로그인
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showError("");
  showOk("");
  setBusy(true);
  try {
    const email = emailEl.value.trim();
    const password = pwEl.value;
    if (!email || !password) {
      throw new Error("이메일과 비밀번호를 입력하세요.");
    }
    await signInWithEmailAndPassword(auth, email, password);
    showOk("로그인 완료!");
    redirectAfterLogin();
  } catch (err) {
    showError(mapAuthError(err));
  } finally {
    setBusy(false);
  }
});

// 8) 구글 로그인
googleBtn.addEventListener("click", async () => {
  showError("");
  showOk("");
  setBusy(true);
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    showOk("Google 계정으로 로그인 완료!");
    redirectAfterLogin();
  } catch (err) {
    showError(mapAuthError(err));
  } finally {
    setBusy(false);
  }
});

// 9) 이미 로그인 상태면 자동 리다이렉트
onAuthStateChanged(auth, (user) => {
  if (user) {
    // 로그인 페이지에 또 왔다면 홈(or next)으로 보냄
    // 필요 없으면 이 블록을 지워도 됨
    redirectAfterLogin();
  }
});
