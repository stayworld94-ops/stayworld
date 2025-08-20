<!-- /assets/auth-bridge.js -->
<script>
// ---------- StayWorld Auth Bridge (공통) ----------
(function () {
  const LS_KEY = "sw_logged_in";

  // 전역 API
  window.swAuth = {
    isLoggedIn() { return localStorage.getItem(LS_KEY) === "true"; },
    login()      { localStorage.setItem(LS_KEY, "true");  dispatch(); },
    logout()     { localStorage.removeItem(LS_KEY);        dispatch(); }
  };

  // URL 힌트(redirect형 OAuth)로 돌아왔을 때 자동 로그인 처리
  //  - ?logged_in=1    (우리 앱이 붙여서 보냄)
  //  - ?credential=... (Google Identity redirect)
  //  - ?code=...       (OAuth code flow)
  (function hydrateFromUrl(){
    const url = new URL(window.location.href);
    const hasLoginHint =
      url.searchParams.has("logged_in") ||
      url.searchParams.has("credential") ||
      url.searchParams.has("code");

    if (hasLoginHint) {
      // 서버 검증을 이미 끝냈다는 가정 하에 UI 토글 (프론트만 쓰는 데모)
      localStorage.setItem(LS_KEY, "true");
      // URL 정리
      url.searchParams.delete("logged_in");
      url.searchParams.delete("credential");
      url.searchParams.delete("code");
      history.replaceState(null, "", url.pathname + (url.search ? "?" + url.searchParams.toString() : "") + url.hash);
    }
  })();

  // 네비/호스트 메뉴 토글
  function renderAuthUI(){
    const t = (k) => {
      const lang = (document.getElementById('lang')?.value || localStorage.getItem('sw_lang') || 'EN');
      try { return (window.I18N?.[lang] || window.I18N?.EN || {})[k] || k; } catch { return k; }
    };

    const link = document.getElementById("navAuthLink");
    const signedIn = window.swAuth.isLoggedIn();

    // Host 드롭다운 표시/숨김
    const hostPanel = document.querySelector('#hostMenu .dropdown-panel');
    if (hostPanel) {
      hostPanel.querySelectorAll('[data-host-visible]').forEach(el => el.style.display = 'none');
      hostPanel.querySelectorAll(`[data-host-visible="${signedIn ? 'signedIn' : 'signedOut'}"]`)
               .forEach(el => el.style.display = 'block');
    }

    if (!link) return;

    if (signedIn) {
      link.removeAttribute("data-i18n"); // i18n이 덮어쓰지 않도록
      link.textContent = t("nav_logout") || "Logout";
      link.href = "#";
      link.onclick = (e) => {
        e.preventDefault();
        window.swAuth.logout();
        alert("로그아웃 되었습니다.");
        renderAuthUI();
        // 필요 시 홈으로
        location.href = "/";
      };
    } else {
      link.setAttribute("data-i18n", "nav_login");
      link.textContent = t("nav_login") || "Login";
      link.href = "login.html";
      link.onclick = null;
    }
  }

  // 상태 변경 브로드캐스트 & 렌더
  function dispatch(){
    window.dispatchEvent(new CustomEvent("sw:auth-change"));
    renderAuthUI();
  }

  // 초기 렌더
  document.addEventListener("DOMContentLoaded", renderAuthUI);
  window.addEventListener("sw:auth-change", renderAuthUI);
  // 언어 바뀔 때도 텍스트 갱신
  document.getElementById("lang")?.addEventListener("change", renderAuthUI);
})();
</script>
