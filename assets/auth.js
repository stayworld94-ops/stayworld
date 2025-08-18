// StayWorld Firebase Auth (Google + Email/Password)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider,
         signInWithPopup, signInWithRedirect, getRedirectResult,
         createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } 
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Helpers
const qs = (sel)=>document.querySelector(sel);
const on = (el,ev,fn)=>el && el.addEventListener(ev,fn);
const show = (el,msg,cls="err")=>{ if(!el) return; el.textContent = msg; el.style.display="block"; el.className = cls; }
const hide = (el)=>{ if(!el) return; el.style.display="none"; }

// Post-login redirect if present
const after = new URLSearchParams(location.search).get("next") || "/";
function goHome(){ location.href = after; }

// Handle Google redirect results (mobile)
getRedirectResult(auth).then(result=>{
  if(result && result.user){ goHome(); }
}).catch(e=>console.warn("Redirect result:", e.message));

// Bind buttons if they exist
const errEl = qs("#error"); const okEl = qs("#ok");

const googleBtn = qs("#btn-google");
on(googleBtn,"click", async ()=>{
  hide(errEl); hide(okEl);
  try{
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      await signInWithRedirect(auth, provider);
    } else {
      await signInWithPopup(auth, provider);
      show(okEl, "Signed in with Google. Redirecting…", "success");
      setTimeout(goHome, 400);
    }
  }catch(e){
    show(errEl, humanizeError(e));
  }
});

// Sign up
const formSignUp = qs("#form-signup");
on(formSignUp, "submit", async (e)=>{
  e.preventDefault(); hide(errEl); hide(okEl);
  const name = qs("#name")?.value?.trim();
  const email = qs("#email")?.value?.trim();
  const pass = qs("#password")?.value;
  if(!email || !pass){ return show(errEl, "Please enter email and password."); }
  try{
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (name) { await updateProfile(cred.user, { displayName: name }); }
    show(okEl, "Account created. Redirecting…", "success");
    setTimeout(goHome, 400);
  }catch(e){ show(errEl, humanizeError(e)); }
});

// Log in
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
  }catch(e){ show(errEl, humanizeError(e)); }
});

// Basic error mapping
function humanizeError(e){
  const code = e?.code || "";
  const map = {
    "auth/popup-closed-by-user": "Popup closed before completing sign in.",
    "auth/popup-blocked": "Popup blocked — we'll try a full-page redirect.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/email-already-in-use": "Email already in use.",
    "auth/weak-password": "Password too weak (use at least 6 chars).",
    "auth/network-request-failed": "Network error — check your connection.",
    "auth/operation-not-allowed": "This sign-in method is not enabled."
  };
  return map[code] || (e?.message || "Sign-in failed. Please try again.");
}
