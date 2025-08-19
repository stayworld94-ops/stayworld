// assets/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth, setPersistence, browserLocalPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup,
  getAdditionalUserInfo, deleteUser, signOut
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
await setPersistence(auth, browserLocalPersistence);

// DOM
const form = document.getElementById("form-login");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

const errMap = (e)=>({
  "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
  "auth/user-disabled":"해당 계정은 비활성화되었습니다.",
  "auth/user-not-found":"가입되지 않은 이메일입니다. 먼저 회원가입을 진행해 주세요.",
  "auth/wrong-password":"비밀번호가 올바르지 않습니다.",
  "auth/popup-closed-by-user":"창이 닫혔습니다. 다시 시도해 주세요.",
  "auth/popup-blocked":"팝업이 차단되었습니다. 허용 후 다시 시도해 주세요.",
  "auth/unauthorized-domain":"허용되지 않은 도메인입니다. Authorized domains를 확인하세요."
}[e?.code] || `오류: ${e?.message || "알 수 없는 오류"}`);

const show = (el,msg)=>{ if(!el) return; el.textContent=msg||""; el.style.display=msg?"block":"none"; };
const redirect = (to="/")=>location.href=to;

// 이메일/비밀번호 로그인
form?.addEventListener("submit", async (e)=>{
  e.preventDefault(); show(errEl,""); show(okEl,"");
  try{
    await signInWithEmailAndPassword(auth, emailEl.value.trim(), pwEl.value);
    show(okEl,"로그인 완료!"); redirect("/");
  }catch(err){ show(errEl, errMap(err)); }
});

// Google 로그인(로그인 페이지에서는 신규 유저 차단 → 가입 페이지로)
googleBtn?.addEventListener("click", async ()=>{
  show(errEl,""); show(okEl,"");
  try{
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const isNew = getAdditionalUserInfo(cred)?.isNewUser;

    if (isNew) {
      // 로그인 화면에서 첫 사용자는 ‘가입 페이지’로만 진행하게 만들기
      try { await deleteUser(cred.user); } catch {}
      await signOut(auth);
      show(errEl,"회원가입이 필요합니다. Google로 가입을 진행해 주세요.");
      return redirect("/signup");
    }
    show(okEl,"로그인 완료!"); redirect("/");
  }catch(err){ show(errEl, errMap(err)); }
});
