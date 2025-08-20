/* ============================================
   STAYWORLD Login Panel (modal-style) — /assets/login-modal.js
   - Autocreates dialog & template if missing
   - Intercepts login links to open panel instead of navigating
   - ESC, backdrop click, ✕ close
   - Demo-friendly; optional Firebase hook
   - Calls markLoggedIn()/updateHostMenu()/applyI18NPage() after success
   ============================================ */
(function () {
  const $$ = (sel, scope) => (scope || document).querySelector(sel);

  // ------------ Style injection (Google-btn visible, dialog backdrop)
  function ensureStyles() {
    if ($$('#sw-login-modal-styles')) return;
    const s = document.createElement('style');
    s.id = 'sw-login-modal-styles';
    s.textContent = `
      dialog.sw-login { 
        width:min(420px, 92vw); border:1px solid rgba(255,255,255,.12);
        border-radius:16px; padding:0; background:#101018; color:#e7e9ee;
        box-shadow:0 30px 80px rgba(0,0,0,.55); 
      }
      dialog.sw-login::backdrop{ background:rgba(0,0,0,.55); }
      .sw-login-head{ display:flex; align-items:center; justify-content:space-between;
        padding:14px 16px; border-bottom:1px solid rgba(255,255,255,.08); }
      .sw-login-title{ font-size:18px; font-weight:800; }
      .sw-login-close{ border:0; background:transparent; color:#cfd6e6; font-size:18px; cursor:pointer; }
      .sw-login-body{ padding:16px; display:grid; gap:10px; }
      .sw-login-body label{ font-size:13px; opacity:.85; }
      .sw-login-input{ background:#0f1621; border:1px solid rgba(255,255,255,.1); color:#e7e9ee; 
        padding:12px 14px; border-radius:12px; width:100%; }
      .sw-login-actions{ display:grid; gap:10px; margin-top:6px; }
      .sw-btn{ border:0; cursor:pointer; padding:12px 14px; border-radius:12px; }
      .sw-btn-gold{ background:linear-gradient(180deg, #f4d78c, #c9a35b); color:#170f04; font-weight:800; }
      .sw-btn-ghost{ background:transparent; color:#cfcfcf; }
      .sw-btn-google{ background:#fff; color:#111; border:1px solid rgba(0,0,0,.12); 
        display:flex; align-items:center; justify-content:center; gap:10px; font-weight:600; }
      .sw-btn-google:hover{ background:#f5f5f5; }
      .sw-g-logo{ width:18px; height:18px; border-radius:2px; display:inline-block; 
        background:
          conic-gradient(from 0deg,#4285F4 0 90deg,#34A853 0 180deg,#FBBC05 0 270deg,#EA4335 0 360deg);
        mask: radial-gradient(circle at 65% 35%,transparent 6px,#000 7px) 
              subtract, linear-gradient(#000,#000) content-box;
        -webkit-mask-composite: xor; mask-composite: exclude;
        padding:2px;
      }
      .sw-login-foot{ padding:12px 16px; border-top:1px solid rgba(255,255,255,.08); font-size:13px; opacity:.9; }
      .sw-login-foot a{ color:#f4d78c; text-decoration:none; }
    `;
    document.head.appendChild(s);
  }

  // ------------ Create dialog & template if absent
  function ensureDialog() {
    let dlg = $$('#loginModal');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'loginModal';
      dlg.className = 'sw-login';
      document.body.appendChild(dlg);
    }
    return dlg;
  }

  function ensureTemplate() {
    let tpl = $$('#loginTpl');
    if (!tpl) {
      tpl = document.createElement('template');
      tpl.id = 'loginTpl';
      tpl.innerHTML = `
        <div class="sw-login-head">
          <div class="sw-login-title" data-i18n="login_title">Log in</div>
          <button class="sw-login-close" type="button" aria-label="Close">✕</button>
        </div>
        <form class="sw-login-body" id="swLoginForm">
          <label for="swLoginEmail" data-i18n="login_email">Email</label>
          <input class="sw-login-input" id="swLoginEmail" type="email" placeholder="you@example.com" autocomplete="username" />

          <label for="swLoginPwd" data-i18n="login_password">Password</label>
          <input class="sw-login-input" id="swLoginPwd" type="password" placeholder="********" autocomplete="current-password" />

          <div class="sw-login-actions">
            <button class="sw-btn sw-btn-gold" type="submit" data-i18n="login_btn">Login</button>
            <button class="sw-btn sw-btn-google" type="button" id="swGoogleBtn">
              <span class="sw-g-logo" aria-hidden="true"></span>
              <span data-i18n="login_google">Continue with Google</span>
            </button>
          </div>
        </form>
        <div class="sw-login-foot">
          <span data-i18n="login_no_account">Don’t have an account?</span>
          <a href="signup.html" data-i18n="nav_signup">Sign Up</a>
        </div>
      `;
      document.body.appendChild(tpl);
    }
    return tpl;
  }

  // ------------ Mount / Open / Close
  function openLoginPanel() {
    ensureStyles();
    const dlg = ensureDialog();
    const tpl = ensureTemplate();

    // mount fresh content each open (i18n-safe)
    dlg.innerHTML = tpl.innerHTML;

    // wire events
    const closeBtn = $$('.sw-login-close', dlg);
    closeBtn?.addEventListener('click', (e) => { e.preventDefault(); closeLoginPanel(); });

    // ESC close
    dlg.addEventListener('cancel', (ev) => { ev.preventDefault(); closeLoginPanel(); }, { once:true });

    // backdrop click (click outside dialog rect)
    const onBackdropClick = (e) => {
      const r = dlg.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) closeLoginPanel();
    };
    dlg.addEventListener('click', onBackdropClick, { once:true });

    // submit
    const form = $$('#swLoginForm', dlg);
    form?.addEventListener('submit', (e) => {
      e.preventDefault();    // <-- 홈으로 튕김 방지
      doEmailLogin();
    });

    // google
    const gbtn = $$('#swGoogleBtn', dlg);
    gbtn?.addEventListener('click', (e) => { e.preventDefault(); doGoogleLogin(); });

    // i18n translate panel if helper exists
    try { window.applyI18NPage?.(); } catch (_) {}

    dlg.showModal();
  }

  function closeLoginPanel() {
    const dlg = $$('#loginModal');
    if (dlg && dlg.open) dlg.close();
  }

  // ------------ Login actions
  function afterLoginSuccess() {
    try { window.markLoggedIn?.(); } catch (_) {}
    try { window.updateHostMenu?.(); } catch (_) {}
    try { window.applyI18NPage?.(); } catch (_) {}
    closeLoginPanel();
  }

  function doEmailLogin() {
    // DEMO mode → localStorage만
    if (window.ENV?.DEMO_MODE || !window.firebase?.auth) {
      localStorage.setItem('sw_logged_in', 'true');
      afterLoginSuccess();
      return;
    }
    // Firebase 예시 (필요 시 활성화)
    const email = $$('#swLoginEmail')?.value?.trim() || '';
    const pwd   = $$('#swLoginPwd')?.value || '';
    if (!email || !pwd) { alert('Enter email and password.'); return; }
    firebase.auth().signInWithEmailAndPassword(email, pwd)
      .then(() => { localStorage.setItem('sw_logged_in','true'); afterLoginSuccess(); })
      .catch(err => alert(err?.message || 'Login failed.'));
  }

  function doGoogleLogin() {
    if (window.ENV?.DEMO_MODE || !window.firebase?.auth) {
      // 데모: 바로 로그인 처리
      localStorage.setItem('sw_logged_in', 'true');
      afterLoginSuccess();
      return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(() => { localStorage.setItem('sw_logged_in','true'); afterLoginSuccess(); })
      .catch(err => alert(err?.message || 'Google sign-in failed.'));
  }

  // ------------ Intercept login links to open panel
  function interceptLoginLinks() {
    // 조건: 템플릿/패널을 만들 수 있을 때만 개입 (그 외엔 기존 페이지 이동 허용)
    const canOpen = true;
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;

      // (1) navAuthLink가 "Login" 상태이거나
      if (a.id === 'navAuthLink' && (a.getAttribute('data-i18n') === 'nav_login' || /login/i.test(a.textContent))) {
        if (canOpen) { e.preventDefault(); openLoginPanel(); }
        return;
      }
      // (2) 또는 href가 login.html인 일반 링크
      if (a.getAttribute('href') && /(^|\/)login\.html(\?.*)?$/i.test(a.getAttribute('href'))) {
        if (canOpen) { e.preventDefault(); openLoginPanel(); }
        return;
      }
      // 그 외는 패스
    }, { capture: true });
  }

  // ------------ Minimal i18n fallback (키가 없을 때만)
  function ensureI18nFallback() {
    if (!window.I18N) return; // 프로젝트의 I18N 사용 중이면 그대로
    // 없다면 아주 최소 키만 영어로…
    window.I18N = {
      EN: {
        login_title: "Log in",
        login_email: "Email",
        login_password: "Password",
        login_btn: "Login",
        login_google: "Continue with Google",
        login_no_account: "Don’t have an account?",
        nav_signup: "Sign Up"
      }
    };
    window.applyI18NPage = function(){ /* noop fallback */ };
  }

  // ------------ Expose
  window.openLoginPanel = openLoginPanel;
  window.closeLoginPanel = closeLoginPanel;

  // ------------ Init
  ensureI18nFallback();
  ensureStyles();
  ensureDialog();
  ensureTemplate();
  interceptLoginLinks();

})();
