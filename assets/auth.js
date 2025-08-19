// assets/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth, setPersistence, browserLocalPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo, signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// 🔴 콘솔의 Config 값으로 교체
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

const form = document.getElementById("form-login");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

const show = (el,msg)=>{ if(!el) return; el.textContent=msg||""; el.style.display=msg?"block":"none"; };
const errMap = (e)=>({
  "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
  "auth/user-disabled":"해당 계정은 비활성화되었습니다.",
  "auth/user-not-found":"가입되지 않은 이메일입니다. 먼저 회원가입을 진행해 주세요.",
  "auth/wrong-password":"비밀번호가 올바르지 않습니다.",
  "auth/popup-closed-by-user":"창이 닫혔습니다. 다시 시도해 주세요.",
  "auth/popup-blocked":"팝업이 차단되었습니다. 허용 후 다시 시도해 주세요.",
  "auth/unauthorized-domain":"허용되지 않은 도메인입니다. Authorized domains를 확인하세요."
}[e?.code] || `오류: ${e?.message || "알 수 없는 오류"}`);

async function init(){
  try{ await setPersistence(auth, browserLocalPersistence); }catch(e){ console.error(e); }

  // 이메일/비번 로그인
  form?.addEventListener("submit", async (e)=>{
    e.preventDefault(); show(errEl,""); show(okEl,"");
    try{
      await signInWithEmailAndPassword(auth, emailEl.value.trim(), pwEl.value);
      show(okEl,"로그인 완료!"); location.href="/";
    }catch(err){ show(errEl, errMap(err)); }
  });

  // Google 로그인: 신규 유저면 가입 페이지로 보냄
  googleBtn?.addEventListener("click", async ()=>{
    show(errEl,""); show(okEl,"");
    try{
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const isNew = getAdditionalUserInfo(cred)?.isNewUser;
      if (isNew) {
        await signOut(auth); // 로그인 상태 해제
        show(errEl,"회원가입이 필요합니다. Google로 가입을 진행해 주세요.");
        return location.assign("/signup");
      }
      show(okEl,"로그인 완료!"); location.assign("/");
    }catch(err){ show(errEl, errMap(err)); }
  });
}
init();
