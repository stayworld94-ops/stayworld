<script>
(function () {
  const user = JSON.parse(localStorage.getItem('sw_user') || 'null');

  const show = (sel) => document.querySelectorAll(sel).forEach(el => el.style.display = '');
  const hide = (sel) => document.querySelectorAll(sel).forEach(el => el.style.display = 'none');

  if (user) {
    // 로그인 상태 → 로그인/가입 숨기고, 마이페이지/로그아웃/환영 표시
    hide('a[href="/login.html"], a[href="/signup.html"], [data-auth="guest"]');
    show('[data-auth="user"]');

    const welcomeEls = document.querySelectorAll('#welcomeUser');
    welcomeEls.forEach(el => el.textContent = `Welcome, ${user.name} 🎉`);
  } else {
    // 비로그인 상태 → 로그인/가입만 보이게
    show('a[href="/login.html"], a[href="/signup.html"], [data-auth="guest"]');
    hide('[data-auth="user"]');
  }

  // 로그아웃 버튼 클릭 처리
  document.querySelectorAll('#logoutBtn, [data-logout]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('sw_user');
      location.href = '/index.html';
    });
  });
})();
</script>
