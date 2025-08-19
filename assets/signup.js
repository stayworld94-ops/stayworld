// assets/signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// 🔴 콘솔의 Config 값으로 통째로 교체
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

// DOM
const form = document.getElementById("form-signup");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

// Google 버튼 숨김
const googleBtn = document.getElementById("btn-google");
if (googleBtn) googleBtn.style.display = "none";

function showError(m){ if(errEl){ errEl.style.display="block"; errEl.textContent=m; } }
function showOk(m){ if(okEl){ okEl.style.display="block"; okEl.textContent=m; } }
function mapSignupError(e){
  const m = {
    "auth/email-already-in-use":"이미 가입된 이메일입니다.",
    "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
    "auth/weak-password":"비밀번호가 너무 약합니다.(6자 이상 권장)"
  };
  return m[e?.code] || `가입 실패: ${e?.message||"알 수 없는 오류"}`;
}

form.addEventListener("submit", async (e)=>{
  e.preventDefault(); showError(""); showOk("");
  try{
    const cred = await createUserWithEmailAndPassword(auth, emailEl.value.trim(), pwEl.value);
    // (선택) 이메일 인증 보내기
    await sendEmailVerification(cred.user);
    showOk("가입 완료! 이메일 인증을 확인해주세요.");
    setTimeout(()=>location.href="/login?justSignedUp=1", 1200);
  }catch(err){ showError(mapSignupError(err)); }
});
