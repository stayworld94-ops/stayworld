// assets/signup.js  — 최종본 (Firebase + 로그인상태 저장 + 홈 이동)

// Firebase SDK (v10)
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

/* 당신 프로젝트 값으로 이미 사용 중인 구성 */
const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};
// 이미 초기화된 경우 중복 초기화 방지
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM
const form = document.getElementById("form-signup");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");

// 로그인 상태 저장 + 헤더 버튼 변경 + 홈으로
function afterLogin() {
  // 홈(index.html)에서 우리가 만들어둔 함수가 있으면 호출
  if (window.markLoggedIn) {
    window.markLoggedIn();
  } else {
    // 최소한 홈에서 바뀌도록 상태만 저장
    localStorage.setItem("sw_logged_in", "true");
  }
  // 홈으로 이동
  location.href = "/";
}

/* =========================
   1) 이메일/비밀번호 회원가입
   ========================= */
form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = (nameEl?.value || "").trim();
  const email = (emailEl?.value || "").trim();
  const pw = pwEl?.value || "";

  if (!name) return alert("이름을 입력해 주세요.");
  if (!email) return alert("이메일을 입력해 주세요.");
  if (!pw || pw.length < 6) return alert("비밀번호는 6자 이상으로 입력해 주세요.");

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pw);

    // 표시 이름 세팅(선택)
    if (name) {
      try { await updateProfile(cred.user, { displayName: name }); } catch {}
    }

    alert("🎉 회원가입 성공! 자동으로 로그인되었습니다.");
    // ✅ 여기서 바로 로그인 상태 저장 + 홈으로
    afterLogin();
  } catch (err) {
    console.error(err);
    alert("회원가입 실패: " + (err?.message || "알 수 없는 오류"));
  }
});

/* =========================
   2) Google로 가입/로그인
   ========================= */
googleBtn?.addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    alert("✅ Google 로그인 성공!");
    // ✅ 여기서 바로 로그인 상태 저장 + 홈으로
    afterLogin();
  } catch (err) {
    console.error(err);
    alert("Google 로그인 실패: " + (err?.message || "팝업/도메인 설정을 확인해 주세요."));
  }
});

/* ✅ 절대 파일 맨 아래에 window.markLoggedIn(); 를 단독으로 호출하지 마세요.
      (성공할 때만 afterLogin()으로 처리)
*/
