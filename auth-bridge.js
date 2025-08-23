// assets/auth-bridge.js
document.addEventListener("DOMContentLoaded", () => {
  const navLink = document.getElementById("navAuthLink");
  const myPageBtn = document.getElementById("btnMyPage");
  const hostMenuPanel = document.querySelector("#hostMenu .dropdown-panel");
  const adminMenu = document.getElementById("adminMenu");

  function toLoginUI() {
    if (navLink) {
      navLink.setAttribute("data-i18n", "nav_login");
      navLink.textContent = "Login";
      navLink.href = "login.html";
      navLink.onclick = null;
      applyI18NPage?.();
    }
    if (myPageBtn) myPageBtn.style.display = "none";
  }

  function toLogoutUI() {
    if (navLink) {
      navLink.setAttribute("data-i18n", "nav_logout");
      navLink.textContent = "Logout";
      navLink.href = "#";
      navLink.onclick = (e) => {
        e.preventDefault();
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        toLoginUI();
        updateRoleMenus();
        location.href = "/";
      };
      applyI18NPage?.();
    }
    if (myPageBtn) myPageBtn.style.display = "inline-block";
  }

  // 로그인 성공 시 외부 호출
  window.markLoggedIn = function (role = "user", email = "") {
    localStorage.setItem("sw_logged_in", "true");
    localStorage.setItem("sw_user_role", role);
    if (email) localStorage.setItem("sw_user_email", email);

    alert(`환영합니다! ${email || role}님 🎉`);

    toLogoutUI();
    updateRoleMenus();
  };

  window.markLoggedOut = function () {
    localStorage.clear();
    toLoginUI();
    updateRoleMenus();
  };

  function updateRoleMenus() {
    const role = localStorage.getItem("sw_user_role");
    const signedIn = localStorage.getItem("sw_logged_in") === "true";

    if (myPageBtn) myPageBtn.style.display = signedIn ? "inline-block" : "none";

    if (hostMenuPanel) {
      hostMenuPanel.querySelectorAll("[data-host-visible]").forEach(el => el.style.display="none");
      if (!signedIn) {
        hostMenuPanel.querySelectorAll('[data-host-visible="signedOut"]').forEach(el=>el.style.display="block");
      } else if (role === "host") {
        hostMenuPanel.querySelectorAll('[data-host-visible="hostOnly"]').forEach(el=>el.style.display="block");
      }
    }

    if (adminMenu) {
      adminMenu.style.display = (role === "admin") ? "block" : "none";
    }
  }
  window.updateRoleMenus = updateRoleMenus;

  if (localStorage.getItem("sw_logged_in") === "true") toLogoutUI();
  else toLoginUI();
  updateRoleMenus();
});
