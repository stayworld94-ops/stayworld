<script type="module">
// /scripts/auth-ui.js
import { auth, onAuthStateChanged, signOut } from '/scripts/firebase.js';

const authMount = document.getElementById('authArea');

/** 헤더: 미로그인 상태 UI */
function renderGuest() {
  if (!authMount) return;
  authMount.innerHTML = `
    <a class="hard-login-link inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20"
       href="/login.html" aria-label="Login">
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" height="18" alt="">
      <span>Login</span>
    </a>
  `;
}

/** 헤더: 로그인 상태 UI */
function renderUser(u) {
  if (!authMount) return;
  const name = u.displayName || u.email || 'User';
  authMount.innerHTML = `
    <span class="text-white/70 mr-2 truncate max-w-[18ch] inline-block align-middle">${name}</span>
    <a href="/mypage.html" class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">My Page</a>
    <button id="btnLogout" class="ml-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">Logout</button>
  `;
  document.getElementById('btnLogout')?.addEventListener('click', async () => {
    await signOut(auth);
    location.href = '/';
  });
}

/** 홈(index.html) 전용 환영 배너 표시 */
function showWelcomeBanner(u) {
  const banner = document.getElementById('welcomeBanner');
  if (!banner) return;                 // 홈이 아니면 아무 것도 안 함
  if (!u) { banner.classList.add('hidden'); return; }
  const name = u.displayName || u.email || 'Guest';
  banner.querySelector('[data-welcome-name]').textContent = name;
  banner.classList.remove('hidden');
}

/** 전역: 다른 스크립트가 preventDefault 해도 로그인 페이지로 강제 이동 */
function forceNavToLogin(ev) {
  const a = ev.target.closest('a.hard-login-link,[href="/login.html"]');
  if (!a) return;
  ev.stopPropagation();
  location.href = '/login.html';
}
document.addEventListener('click', forceNavToLogin, true);

/** 상태 구독 */
onAuthStateChanged(auth, (u) => {
  if (u) { renderUser(u); showWelcomeBanner(u); }
  else   { renderGuest(); showWelcomeBanner(null); }
});
</script>
