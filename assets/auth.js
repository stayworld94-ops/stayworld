// /assets/auth.js — Firebase 로그인 + 공통 헤더 UI 동기화 (final)

// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth, setPersistence, browserLocalPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo, signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// 🔴 콘솔의 Config 값으로 교체 (현재 값 유지)
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

// ===== DOM refs (존재할 때만 동작하도록 안전하게) =====
const form = document.getElementById("form-login");
const emailEl = document.getElementById("email");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

// ===== UI helpers =====
const show = (el, msg) => { if (!el) return; el.textContent = msg || ""; el.style.display = msg ? "block" : "none"; };
const errMap = (e) => ({
  "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
  "auth/user-disabled":"해당 계정은 비활성화되었습니다.",
  "auth/user-not-found":"가입되지 않은 이메일입니다. 먼저 회원가입을 진행해 주세요.",
  "auth/wrong-password":"비밀번호가 올바르지 않습니다.",
  "auth/popup-closed-by-user":"창이 닫혔습니다. 다시 시도해 주세요.",
  "auth/popup-blocked":"팝업이 차단되었습니다. 허용 후 다시 시도해 주세요.",
  "auth/unauthorized-domain":"허용되지 않은 도메인입니다. Authorized domains를 확인하세요."
}[e?.code] || `오류: ${e?.message || "알 수 없는 오류"}`);

// ===== 공통 헤더 UI 동기화 (localStorage 기반) =====
const STORAGE_USER_KEY  = 'sw_user';
const STORAGE_TOKEN_KEY = 'sw_token';

function saveUser(user) {
  if (!user) return;
  const name = user.displayName || (user.email ? user.email.split('@')[0] : 'Member');
  try {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify({ name, email: user.email || '' }));
  } catch (_) {}
  // 토큰은 선택 저장
  if (user.getIdToken) {
    user.getIdToken()
      .then(t => { try { localStorage.setItem(STORAGE_TOKEN_KEY, t); } catch(_){} })
      .catch(()=>{});
  }
}

function clearUser() {
  try { localStorage.removeItem(STORAGE_USER_KEY); } catch(_){}
  try { localStorage.removeItem(STORAGE_TOKEN_KEY); } catch(_){}
}

function applyAuthUI() {
  let u = null;
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    u = raw ? JSON.parse(raw) : null;
  } catch (_) {}
  const loggedIn = !!u;

  document.querySelectorAll('[data-auth="profile-name"]').forEach(el => el.textContent = loggedIn ? (u.name || '') : '');
  document.querySelectorAll('[data-auth="login-btn"]').forEach(el => el.style.display = loggedIn ? 'none' : '');
  document.querySelectorAll('[data-auth="logout-btn"]').forEach(el => el.style.display = loggedIn ? '' : 'none');
  document.querySelectorAll('[data-auth="guest-only"]').forEach(el => el.style.display = loggedIn ? 'none' : '');
  document.querySelectorAll('[data-auth="user-only"]').forEach(el => el.style.display = loggedIn ? '' : 'none');
  document.querySelectorAll('[data-auth="avatar-initial"]').forEach(el => {
    const initial = loggedIn ? (u.name || 'M').trim().charAt(0).toUpperCase() : '';
    el.textContent = initial;
    el.style.display = loggedIn ? '' : 'none';
  });
}

// ===== 초기화 =====
async function init(){
  try { await setPersistence(auth, browserLocalPersistence); } catch(e){ console.error(e); }

  // Firebase 세션 변화 → 공통 UI 반영
  onAuthStateChanged(auth, (user) => {
    if (user) saveUser(user); else clearUser();
    applyAuthUI();
  });

  // 헤더 어디서나 로그아웃 버튼 동작
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-auth="logout-btn"]');
    if (!btn) return;
    e.preventDefault();
    try { await signOut(auth); } catch(_) {}
    clearUser();
    applyAuthUI();
    // 필요하면 새로고침
    // location.reload();
  });

  // ===== 이메일/비밀번호 로그인 =====
  form?.addEventListener("submit", async (e)=>{
    e.preventDefault(); show(errEl,""); show(okEl,"");
    const email = (emailEl?.value || '').trim();
    const pw    = pwEl?.value || '';
    try{
      await signInWithEmailAndPassword(auth, email, pw);
      saveUser(auth.currentUser);         // ✅ 헤더 동기화 저장
      show(okEl,"로그인 완료!");
      location.href = "/";
    }catch(err){
      show(errEl, errMap(err));
    }
  });

  // ===== Google 로그인 (신규면 가입 유도) =====
  googleBtn?.addEventListener("click", async ()=>{
    show(errEl,""); show(okEl,"");
    try{
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const isNew = getAdditionalUserInfo(cred)?.isNewUser;
      if (isNew) {
        await signOut(auth); // 신규는 가입 페이지로 유도
        show(errEl,"회원가입이 필요합니다. Google로 가입을 진행해 주세요.");
        return location.assign("/signup");
      }
      saveUser(cred.user);                // ✅ 헤더 동기화 저장
      show(okEl,"로그인 완료!");
      location.assign("/");
    }catch(err){
      show(errEl, errMap(err));
    }
  });

  // 처음 로드 시 한 번 적용 (스토리지에 기존 값이 있을 수 있으니)
  applyAuthUI();
}
init();
