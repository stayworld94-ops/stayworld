// assets/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth, setPersistence, browserLocalPersistence,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// 🔴 콘솔의 Config 값으로 통째로 교체하세요
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
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

// Google 버튼 있으면 숨김
const googleBtn = document.getElementById("btn-google");
if (googleBtn) googleBtn.style.display = "none";

function showError(m){ if(errEl){ errEl.style.display="block"; errEl.textContent=m; } }
function showOk(m){ if(okEl){ okEl.style.display="block"; okEl.textContent=m; } }
function mapAuthError(e){
  const m = {
    "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
    "auth/user-disabled":"해당 계정은 비활성화되었습니다.",
    "auth/user-not-found":"가입되지 않은 이메일입니다.",
    "auth/wrong-password":"비밀번호가 올바르지 않습니다."
  };
  return m[e?.code] || `로그인 실패: ${e?.message||"알 수 없는 오류"}`;
}
function redirectAfterLogin(){
  const next = new URLSearchParams(location.search).get("next") || "/";
  location.href = next;
}

form.addEventListener("submit", async (e)=>{
  e.preventDefault(); showError(""); showOk("");
  try{
    await signInWithEmailAndPassword(auth, emailEl.value.trim(), pwEl.value);
    showOk("로그인 완료!"); redirectAfterLogin();
  }catch(err){ showError(mapAuthError(err)); }
});

onAuthStateChanged(auth, (user)=>{ /* 이미 로그인 상태면 필요 시 처리 */ });
