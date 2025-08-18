// 인증 로직 (Google + Email/Password)
import { auth } from "./firebase-config.js";
import {
  GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,
  setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Helpers
const qs = (s)=>document.querySelector(s);
const on = (el,ev,fn)=>el && el.addEventListener(ev,fn);
const show = (el,msg,cls="err")=>{ if(!el) return; el.textContent = msg; el.style.display="block"; el.className = cls; }
const hide = (el)=>{ if(!el) return; el.style.display="none"; }

const after = new URLSearchParams(location.search).get("next") || "/";
const goHome = ()=>{ location.href = after; };

const errEl = qs("#error");
const okEl  = qs("#ok");

// Google Redirect 결과(모바일)
getRedirectResult(auth).then(res=>{
  if(res && res.user) setTimeout(goHome, 200);
}).catch(e=>console.warn(e.code, e.message));

// Google 버튼
const googleBtn = qs("#btn-google");
on(googleBtn,"click", async ()=>{
  hide(errEl); hide(okEl);
  try{
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      await signInWithRedirect(auth, provider);
    } else {
      await signInWithPopup(auth, provider);
      show(okEl, "Signed in with Google. Redirecting…", "success");
      setTimeout(goHome, 300);
    }
  }catch(e){ show(errEl, mapErr(e)); }
});

// 회원가입
const formSignUp = qs("#form-signup");
on(formSignUp, "submit", async (e)=>{
  e.preventDefault(); hide(errEl); hide(okEl);
  const name = qs("#name")?.value?.trim();
  const email = qs("#email")?.value?.trim();
  const pass = qs("#password")?.value;
  if(!email || !pass){ return show(errEl, "Please enter email and password."); }
  try{
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (name) await updateProfile(cred.user, { displayName: name });
    show(okEl, "Account created. Redirecting…", "success");
    setTimeout(goHome, 400);
  }catch(e){ show(errEl, mapErr(e)); }
});

// 로그인
const formLogin = qs("#form-login");
on(formLogin, "submit", async (e)=>{
  e.preventDefault(); hide(errEl); hide(okEl);
  const email = qs("#email")?.value?.trim();
  const pass = qs("#password")?.value;
  if(!email || !pass){ return show(errEl, "Please enter email and password."); }
  try{
    await signInWithEmailAndPassword(auth, email, pass);
    show(okEl, "Welcome back. Redirecting…", "success");
    setTimeout(goHome, 300);
  }catch(e){ show(errEl, mapErr(e)); }
});

// 에러 메시지 매핑
function mapErr(e){
  const m = {
    "auth/popup-closed-by-user": "Popup closed before completing sign in.",
    "auth/popup-blocked": "Popup blocked — allow popups or try mobile.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/email-already-in-use": "Email already in use.",
    "auth/weak-password": "Password too weak (min 6 chars).",
    "auth/network-request-failed": "Network error — check connection.",
    "auth/operation-not-allowed": "This sign-in method is not enabled."
  };
  return m[e?.code] || (e?.message || "Failed. Please try again.");
}
