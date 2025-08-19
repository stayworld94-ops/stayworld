// assets/signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification,
  GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

/* 🔴 콘솔의 Config 값으로 교체 */
const firebaseConfig = {
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
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

const errMapSignup = (e)=>({
  "auth/email-already-in-use":"이미 가입된 이메일입니다.",
  "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
  "auth/weak-password":"비밀번호가 너무 약합니다.(6자 이상 권장)",
  "auth/popup-closed-by-user":"창이 닫혔습니다. 다시 시도해 주세요.",
  "auth/popup-blocked":"팝업이 차단되었습니다. 허용 후 다시 시도해 주세요.",
  "auth/unauthorized-domain":"허용되지 않은 도메인입니다. Authorized domains를 확인하세요."
}[e?.code] || `오류: ${e?.message || "알 수 없는 오류"}`);

const show = (el,msg)=>{ if(!el) return; el.textContent=msg||""; el.style.display=msg?"block":"none"; };
const redirect = (to="/")=>location.href=to;

// 이메일/비밀번호로 회원가입
form?.addEventListener("submit", async (e)=>{
  e.preventDefault(); show(errEl,""); show(okEl,"");
  try{
    const cred = await createUserWithEmailAndPassword(auth, emailEl.value.trim(), pwEl.value);
    const displayName = nameEl?.value?.trim();
    if (displayName) await updateProfile(cred.user, { displayName });
    await sendEmailVerification(cred.user); // (선택) 이메일 인증
    show(okEl,"가입 완료! 이메일 인증을 확인해 주세요.");
    setTimeout(()=>redirect("/"), 1200);
  }catch(err){ show(errEl, errMapSignup(err)); }
});

// Google로 가입/로그인
googleBtn?.addEventListener("click", async ()=>{
  show(errEl,""); show(okEl,"");
  try{
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const isNew = getAdditionalUserInfo(cred)?.isNewUser;

    const displayName = nameEl?.value?.trim();
    if (isNew && displayName) await updateProfile(cred.user, { displayName });

    show(okEl, isNew ? "Google로 가입 완료!" : "이미 가입된 Google 계정으로 로그인되었습니다.");
    redirect("/");
  }catch(err){ show(errEl, errMapSignup(err)); }
});
