// assets/signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// ✅ 콘솔의 SDK Configuration → Config 값으로 통째로 교체하세요
const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
    apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};
authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM
const form = document.getElementById("form-signup");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

function showError(m){ if(errEl){ errEl.style.display="block"; errEl.textContent=m; } }
function showOk(m){ if(okEl){ okEl.style.display="block"; okEl.textContent=m; } }
function setBusy(b){
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = b; if (googleBtn) googleBtn.disabled = b;
  submitBtn.textContent = b ? "Creating…" : "Sign up";
}
function redirectAfterSignup(){
  // 가입/로그인 완료 후 보낼 위치
  location.href = "/";
}

// 이메일/비번 회원가입
form.addEventListener("submit", async (e)=>{
  e.preventDefault(); showError(""); showOk(""); setBusy(true);
  try{
    const cred = await createUserWithEmailAndPassword(auth, emailEl.value.trim(), pwEl.value);
    const displayName = nameEl.value.trim();
    if (displayName) await updateProfile(cred.user, { displayName });
    // 이메일/비번 가입자는 인증 메일 발송(선택)
    await sendEmailVerification(cred.user);
    showOk("가입 완료! 이메일 인증 메일을 확인해 주세요.");
    setTimeout(redirectAfterSignup, 1200);
  }catch(err){
    const map = {
      "auth/email-already-in-use":"이미 가입된 이메일입니다.",
      "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
      "auth/weak-password":"비밀번호가 너무 약합니다.(6자 이상 권장)"
    };
    showError(map[err?.code] || `가입 실패: ${err?.message||"알 수 없는 오류"}`);
  }finally{ setBusy(false); }
});

// 구글로 가입(또는 기존 계정 로그인)
if (googleBtn) {
  googleBtn.addEventListener("click", async ()=>{
    showError(""); showOk(""); setBusy(true);
    try{
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const isNew = getAdditionalUserInfo(cred)?.isNewUser;

      // 이름 입력란이 있으면 최초 가입 시 프로필에 반영
      const displayName = nameEl.value.trim();
      if (isNew && displayName) await updateProfile(cred.user, { displayName });

      if (isNew) {
        showOk("Google로 가입 완료!");
      } else {
        showOk("이미 가입된 Google 계정으로 로그인되었습니다.");
      }
      redirectAfterSignup();
    }catch(err){
      const map = {
        "auth/popup-closed-by-user":"로그인 창이 닫혔습니다. 다시 시도해 주세요.",
        "auth/cancelled-popup-request":"진행 중인 요청이 있습니다. 잠시 후 시도해 주세요.",
        "auth/popup-blocked":"팝업이 차단되었습니다. 팝업 허용 후 다시 시도해 주세요.",
        "auth/unauthorized-domain":"허용되지 않은 도메인입니다. Authorized domains를 확인하세요."
      };
      showError(map[err?.code] || `Google 가입 실패: ${err?.message||"알 수 없는 오류"}`);
    }finally{ setBusy(false); }
  });
}

