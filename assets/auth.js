// assets/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth, setPersistence, browserLocalPersistence,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// ↓↓↓ 여기를 콘솔의 'Config'에서 나온 진짜 값으로 통째로 바꾸세요 ↓↓↓
const firebaseConfig = {
const firebaseConfig = { 
  apiKey : "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk" , 
  authDomain : "stayworld-2570c.firebaseapp.com" , 
  projectId : "stayworld-2570c" , 
  storageBucket : "stayworld-2570c.firebasestorage.app" , 
  messagingSenderId : "272599681686" , 
  appId : "1:272599681686:web:33f89b66f7ee6f6f0b50b7" , 
  measurementId : "G-F8MXM3D7FJ" 
};

// ↑↑↑ 여기까지 교체 ↑↑↑

// (선택) 설정 검증
const errEl = document.getElementById("error");
function showError(m){ if(errEl){ errEl.style.display="block"; errEl.textContent=m; } }
if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("PASTE_") || firebaseConfig.apiKey.startsWith("YOUR_")) {
  showError("설정 오류: Firebase apiKey가 비어 있거나 잘못됐습니다. 콘솔의 Config 값을 그대로 넣어주세요.");
  throw new Error("Missing Firebase apiKey");
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
await setPersistence(auth, browserLocalPersistence);

// DOM
const form = document.getElementById("form-login");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const okEl = document.getElementById("ok");

function mapAuthError(error){
  const code = error?.code || "";
  const map = {
    "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
    "auth/user-disabled":"해당 계정은 비활성화되었습니다.",
    "auth/user-not-found":"가입되지 않은 이메일입니다.",
    "auth/wrong-password":"비밀번호가 올바르지 않습니다.",
    "auth/popup-closed-by-user":"로그인 창이 닫혔습니다. 다시 시도해주세요.",
    "auth/cancelled-popup-request":"이미 실행 중인 로그인 요청이 있습니다.",
    "auth/popup-blocked":"팝업이 차단되었습니다. 허용 후 다시 시도해주세요.",
    "auth/unauthorized-domain":"허용되지 않은 도메인입니다. Firebase → Authorized domains 확인."
  };
  return map[code] || `로그인 실패: ${error?.message || "알 수 없는 오류"}`;
}
function setBusy(b){ const btn=form.querySelector('button[type="submit"]'); btn.disabled=b; googleBtn.disabled=b; btn.textContent=b?"Signing in…":"Log in"; }
function showOk(m){ if(okEl){ okEl.style.display="block"; okEl.textContent=m; } }

// 이메일/비번 로그인
form.addEventListener("submit", async (e)=>{
  e.preventDefault(); showError(""); showOk(""); setBusy(true);
  try{
    await signInWithEmailAndPassword(auth, emailEl.value.trim(), pwEl.value);
    showOk("로그인 완료!"); redirectAfterLogin();
  }catch(err){ showError(mapAuthError(err)); }
  finally{ setBusy(false); }
});

// 구글 로그인
googleBtn.addEventListener("click", async ()=>{
  showError(""); showOk(""); setBusy(true);
  try{
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    showOk("Google 계정으로 로그인 완료!"); redirectAfterLogin();
  }catch(err){ showError(mapAuthError(err)); }
  finally{ setBusy(false); }
});

function redirectAfterLogin(){
  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";
  location.href = next;
}

// 이미 로그인 상태면 바로 리다이렉트
onAuthStateChanged(auth, (user)=>{ if(user) redirectAfterLogin(); });
