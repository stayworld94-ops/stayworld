// assets/auth-bridge.js
// StayWorld 공통 인증 브리지
// - User / Host / Admin 로그인 상태 반영
// - index.html, login.html, host-login.html, admin-login.html 등과 공유

document.addEventListener("DOMContentLoaded", () => {
  const navLink = document.getElementById("navAuthLink");
  const adminMenu = document.getElementById("adminMenu");
  const hostMenuPanel = document.querySelector("#hostMenu .dropdown-panel");

  // ---- UI 상태 전환 ----
  function toLoginUI() {
    if (!navLink) return;
    navLink.setAttribute("data-i18n", "nav_login");
    navLink.textContent = "Login";
    navLink.href = "login.html";
    navLink.onclick = null;
    applyI18NPage?.();
  }

  function toLogoutUI() {
    if (!navLink) return;
    navLink.setAttribute("data-i18n", "nav_logout");
    navLink.textContent = "Logout";
    navLink.href = "#";
    navLink.onclick = (e) => {
      e.preventDefault();
      localStorage.clear();   // ✅ 모든 로그인 정보 초기화
      alert("로그아웃 되었습니다.");
      toLoginUI();
      updateRoleMenus();
      location.href = "/";
    };
    applyI18NPage?.();
  }

  // ---- 외부에서 호출 가능한 함수 ----
  window.markLoggedIn = function (role = "user") {
    localStorage.setItem("sw_logged_in", "true");
    localStorage.setItem("sw_user_role", role);   // ✅ 역할 저장
    toLogoutUI();
    updateRoleMenus();
  };

  window.markLoggedOut = function () {
    localStorage.clear();
    toLoginUI();
    updateRoleMenus();
  };

  // ---- Host & Admin 메뉴 표시 제어 ----
  function updateRoleMenus() {
    const role = localStorage.getItem("sw_user_role");
    const signedIn = localStorage.getItem("sw_logged_in") === "true";

    // Host 메뉴
    if (hostMenuPanel) {
      hostMenuPanel.querySelectorAll("[data-host-visible]").forEach(el => el.style.display = "none");
      if (!signedIn) {
        hostMenuPanel.querySelectorAll('[data-host-visible="signedOut"]').forEach(el => el.style.display = "block");
      } else if (role === "host") {
        hostMenuPanel.querySelectorAll('[data-host-visible="signedIn"]').forEach(el => el.style.display = "block");
      }
    }

    // Admin 메뉴
    if (adminMenu) {
      adminMenu.style.display = (role === "admin") ? "block" : "none";
    }
  }
  window.updateRoleMenus = updateRoleMenus;

  // ---- 초기 상태 반영 ----
  if (localStorage.getItem("sw_logged_in") === "true") {
    toLogoutUI();
  } else {
    toLoginUI();
  }
  updateRoleMenus();

  // ---- Host 로그아웃 버튼 ----
  const hostLogout = document.getElementById("hostLogoutBtn");
  hostLogout?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    alert("호스트 로그아웃 되었습니다.");
    toLoginUI();
    updateRoleMenus();
    location.href = "/";
  });
});
