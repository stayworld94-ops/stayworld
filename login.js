/* ============================
   STAYWORLD Login Modal Logic
   - Works with existing <dialog id="loginModal"> and <template id="loginTpl">
   - Adds close (✕), ESC & backdrop-click close
   - Demo mode friendly; optional Firebase hooks when DEMO_MODE=false
   ============================ */

(function(){
  // Utilities
  const $ = (sel, scope)=> (scope||document).querySelector(sel);

  // Ensure close button exists even if template is old
  function ensureCloseBtn(container){
    if (!container) return;
    const hasBtn = container.querySelector('[data-login-close]');
    if (hasBtn) return;
    const header = container.querySelector('.border-b') || container.firstElementChild;
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-login-close', '1');
    btn.setAttribute('aria-label', 'Close');
    btn.className = 'btn-icon btn-ghost-gold';
    btn.textContent = '✕';
    // Insert to header right
    if (header && header.classList.contains('flex')) {
      header.appendChild(btn);
    } else {
      // create a header wrapper if none
      const bar = document.createElement('div');
      bar.className = 'p-4 border-b border-white/10 flex items-center justify-between';
      const h = document.createElement('h3');
      h.className = 'text-lg font-bold';
      h.textContent = 'Log in';
      bar.appendChild(h);
      bar.appendChild(btn);
      container.prepend(bar);
    }
    btn.addEventListener('click', closeLogin);
  }

  function attachBackdropAndEsc(dlg){
    if (!dlg) return;
    // Backdrop click (only once per open)
    function onClick(e){
      const rect = dlg.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                     e.clientY >= rect.top  && e.clientY <= rect.bottom;
      if (!inside) closeLogin();
    }
    dlg.addEventListener('click', onClick, { once:true });

    // ESC to close
    function onCancel(ev){ ev.preventDefault(); closeLogin(); }
    dlg.addEventListener('cancel', onCancel, { once:true });
  }

  function hydrateActions(container){
    if (!container) return;
    const googleBtn = container.querySelector('[data-login-google]');
    if (googleBtn) googleBtn.addEventListener('click', googleLogin);
    const submitBtn = container.querySelector('[data-login-submit]');
    if (submitBtn) submitBtn.addEventListener('click', doLogin);
    // Also bind the ✕ if template already has it
    const xBtn = container.querySelector('[aria-label="Close"]');
    if (xBtn) xBtn.addEventListener('click', closeLogin);
  }

  // Public: open & close
  function openLogin(){
    const dlg = $('#loginModal');
    const tpl = $('#loginTpl');
    if (!dlg){ console.warn('loginModal not found'); return; }

    // Mount template
    if (tpl){
      dlg.innerHTML = tpl.innerHTML;
    } else {
      // fallback minimal content
      dlg.innerHTML = [
        '<div class="p-5 space-y-3">',
        '<h3 class="text-lg font-bold mb-2">Log in</h3>',
        '<input id="loginEmail" class="w-full px-4 py-3 rounded-xl bg-[#0f0f15] border border-white/10" placeholder="Email"/>',
        '<input id="loginPwd" type="password" class="w-full px-4 py-3 rounded-xl bg-[#0f0f15] border border-white/10" placeholder="Password"/>',
        '<button data-login-submit class="btn btn-gold w-full">Log in</button>',
        '<button data-login-google class="btn w-full bg-white text-black flex items-center justify-center gap-2"><span class="text-lg">G</span><span>Continue with Google</span></button>',
        '</div>'
      ].join('');
    }

    ensureCloseBtn(dlg);
    hydrateActions(dlg);
    dlg.showModal();
    attachBackdropAndEsc(dlg);
  }

  function closeLogin(){
    const dlg = $('#loginModal');
    if (dlg && dlg.open) dlg.close();
  }

  // Demo login + optional Firebase hooks
  function doLogin(){
    if (window.ENV?.DEMO_MODE){
      alert('Logged in (demo mode).');
      closeLogin();
      return;
    }
    if (window._fbReady && window.firebase?.auth){
      const email = $('#loginEmail')?.value || '';
      const pwd = $('#loginPwd')?.value || '';
      firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then(()=>{ alert('Logged in!'); closeLogin(); })
        .catch(e=> alert(e.message));
    } else {
      alert('Connect your auth backend (Firebase/OAuth) — not initialized.');
    }
  }

  function googleLogin(){
    if (window.ENV?.DEMO_MODE){
      alert('Google login (demo mode).');
      closeLogin();
      return;
    }
    if (window._fbReady && window.firebase?.auth){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(()=>{ alert('Google login OK'); closeLogin(); })
        .catch(e=> alert(e.message));
    } else {
      alert('Google OAuth not initialized.');
    }
  }

  // expose to global
  window.openLogin = openLogin;
  window.closeLogin = closeLogin;
  window.doLogin = doLogin;
  window.googleLogin = googleLogin;
})();