// /scripts/auth-ui.js
// 모든 페이지 공통: 로그인 상태 감지 → 환영 배너 + 우상단 유저/로그아웃 표시
import {
  auth, onAuthStateChanged, signOut, db, doc, getDoc
} from '/scripts/firebase.js';

const css = `
  .sw-authbar{position:fixed;top:12px;right:12px;z-index:50;display:flex;gap:8px;align-items:center}
  .sw-btn{padding:8px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#fff}
  .sw-btn.primary{background:#fff;color:#000;border-color:transparent;font-weight:600}
  .sw-banner{position:fixed;top:0;left:50%;transform:translate(-50%, -120%);transition:transform .3s ease;z-index:40;
             background:#10b981;color:#00130d;padding:10px 16px;border-radius:12px;margin-top:8px;font-weight:600}
  .sw-banner.show{transform:translate(-50%, 10px)}
`;
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

// 우상단 영역(없으면 생성)
function ensureAuthBar() {
  let bar = document.getElementById('sw-authbar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'sw-authbar';
    bar.className = 'sw-authbar';
    document.body.appendChild(bar);
  }
  return bar;
}

// 환영 배너
function showWelcomeBanner(name) {
  let bn = document.getElementById('sw-welcome');
  if (!bn) {
    bn = document.createElement('div');
    bn.id = 'sw-welcome';
    bn.className = 'sw-banner';
    document.body.appendChild(bn);
  }
  bn.textContent = `환영합니다, ${name || '게스트'}님!`;
  bn.classList.add('show');
  setTimeout(()=>bn.classList.remove('show'), 2200);
}

// 로그아웃 핸들러(모든 곳 공통)
async function doLogout() {
  try { await signOut(auth); } finally { window.location.href = '/'; }
}

// 페이지 내 기존 #logoutBtn 이 있으면 자동 연결/표시 제어
function wireExistingLogoutButtons(loggedIn) {
  const btns = document.querySelectorAll('#logoutBtn, .logoutBtn');
  btns.forEach(b=>{
    b.style.display = loggedIn ? '' : 'none';
    b.onclick = (e)=>{ e.preventDefault(); doLogout(); };
  });
}

// 유저표시 컴포넌트 렌더
async function renderLoggedInBar(user) {
  const bar = ensureAuthBar();
  bar.innerHTML = '';

  // Firestore name 우선, 없으면 displayName/email
  let name = user.displayName || user.email || 'User';
  try {
    const us = await getDoc(doc(db, 'users', user.uid));
    if (us.exists() && us.data().name) name = us.data().name;
  } catch(e){ /* ignore */ }

  const span = document.createElement('span');
  span.style.opacity = .85;
  span.textContent = name;

  const my = document.createElement('a');
  my.href = '/mypage.html';
  my.className = 'sw-btn';
  my.textContent = 'My Page';

  const out = document.createElement('button');
  out.className = 'sw-btn';
  out.textContent = 'Logout';
  out.addEventListener('click', (e)=>{ e.preventDefault(); doLogout(); });

  bar.append(span, my, out);
  wireExistingLogoutButtons(true);
  showWelcomeBanner(name);
}

function renderLoggedOutBar() {
  const bar = ensureAuthBar();
  bar.innerHTML = '';

  const login = document.createElement('a');
  login.href = '/login.html';
  login.className = 'sw-btn primary';
  login.textContent = 'Login';

  const signup = document.createElement('a');
  signup.href = '/signup.html';
  signup.className = 'sw-btn';
  signup.textContent = 'Sign up';

  bar.append(login, signup);
  wireExistingLogoutButtons(false);
}

// 최초 바인딩
onAuthStateChanged(auth, (u)=>{
  if (u) renderLoggedInBar(u);
  else renderLoggedOutBar();
});

// 혹시 SSR/캐시 등으로 아주 빠르게 그려졌을 때 버튼이 아직 없을 수 있으니, 1초 뒤에도 한 번 더 점검
setTimeout(()=> wireExistingLogoutButtons(!!auth.currentUser), 1000);
<script type="module">
// /scripts/auth-ui.js 내에 추가/수정
import { auth, onAuthStateChanged, signOut } from '/scripts/firebase.js';

const el = document.getElementById('authArea');

function renderGuest() {
  if (!el) return;
  el.innerHTML = `
    <a class="nav-login hard-login-link inline-flex items-center px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20"
       href="/login.html" aria-label="Login">
      <!-- 구글 아이콘 비슷한 모양 -->
      <svg width="18" height="18" viewBox="0 0 24 24" class="mr-2"><path fill="currentColor" d="M21.35 11.1h-9v2.9h5.2c-.23 1.5-1.8 4.4-5.2 4.4a6 6 0 0 1 0-12a5.3 5.3 0 0 1 3.7 1.4l2-2A8.6 8.6 0 0 0 12.35 3a9 9 0 1 0 0 18c5.2 0 8.6-3.7 8.6-9c0-.6-.1-1.2-.2-1.9z"/></svg>
      Login
    </a>`;
}

function renderUser(u) {
  if (!el) return;
  const name = u.displayName || u.email || 'User';
  el.innerHTML = `
    <span class="text-white/70 mr-2">${name}</span>
    <a href="/mypage.html" class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">My Page</a>
    <button id="btnLogout" class="ml-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">Logout</button>`;
  document.getElementById('btnLogout')?.addEventListener('click', async () => {
    await signOut(auth);
    location.href = '/';
  });
}

// 세션 변화에 따라 렌더
onAuthStateChanged(auth, (u) => {
  if (u) renderUser(u);
  else renderGuest();
});

// ===== 강제 이동 가드 (다른 스크립트가 preventDefault 해도 동작) =====
function forceNavToLogin(ev) {
  const a = ev.target.closest('a.hard-login-link,[href="/login.html"]');
  if (!a) return;
  ev.stopPropagation();
  // 어떤 preventDefault도 무시하고 이동
  location.href = '/login.html';
}
document.addEventListener('click', forceNavToLogin, true); // capture 단계
</script>
