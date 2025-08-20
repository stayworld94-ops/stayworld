// assets/login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// 로그인 폼이 있다면(#login-form), 이메일 로그인 처리
const loginForm = document.getElementById("login-form");
const emailEl = document.getElementById("loginEmail");
const pwEl = document.getElementById("loginPwd");
const googleBtn = document.getElementById("btn-google-login"); // 있으면 사용(선택)

function finishLogin(user){
  localStorage.setItem("sw_logged_in","true");
  localStorage.setItem("stayworldUser", JSON.stringify({
    uid: user?.uid || "",
    email: user?.email || "",
    displayName: user?.displayName || ""
  }));
  try { window.markLoggedIn && window.markLoggedIn(); } catch {}
  location.assign("/"); // 홈으로
}

loginForm?.addEventListener("submit", async (e)=>{
  e.preventDefault();
  try{
    const cred = await signInWithEmailAndPassword(auth, emailEl.value.trim(), pwEl.value);
    alert("✅ 로그인 성공");
    finishLogin(cred.user);
  }catch(err){
    alert("❌ 로그인 실패: " + (err?.message || "다시 시도해 주세요."));
    console.error(err);
  }
});

// 구글 로그인 버튼이 따로 있으면 처리
googleBtn?.addEventListener("click", async ()=>{
  try{
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    alert("✅ Google 로그인 성공");
    finishLogin(cred.user);
  }catch(err){
    alert("❌ Google 로그인 실패: " + (err?.message || "팝업 차단 여부를 확인해 주세요."));
    console.error(err);
  }
});
