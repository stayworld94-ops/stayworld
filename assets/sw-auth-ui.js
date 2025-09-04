/* /assets/sw-auth-ui.js — Auth & Visibility */

(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  function getUser(){
    // sw_user: {name:"", isHost:true/false} 저장한다고 가정
    try { return JSON.parse(localStorage.getItem('sw_user')||'null'); }
    catch { return null; }
  }

  function show(sel){ $$(sel).forEach(el=>el.style.display=''); }
  function hide(sel){ $$(sel).forEach(el=>el.style.display='none'); }

  function applyAuthUI(){
    const user = getUser();
    const isLogged = !!user;
    const isHost = !!user?.isHost;

    // 헤더 버튼들
    // data-auth="guest" → 비로그인 전용
    // data-auth="user"  → 로그인 전용
    if(isLogged){
      hide('[data-auth="guest"]');
      show('[data-auth="user"]');
      // 환영 배너/문구
      $$('#welcomeUser,[data-welcome-name]').forEach(el=>{
        if(el.tagName==='INPUT' || el.tagName==='TEXTAREA') return;
        if(el.hasAttribute('data-welcome-name')) el.textContent = user.name || 'Guest';
        else el.textContent = `Welcome, ${user.name||'Guest'} 🎉`;
      });
    }else{
      show('[data-auth="guest"]');
      hide('[data-auth="user"]');
    }

    // 호스트/비호스트 전용
    if(isHost){
      show('[data-host="in"]');  hide('[data-host="out"]');
    }else{
      show('[data-host="out"]'); hide('[data-host="in"]');
    }

    // 알림 벨/패널: 로그인 상태에서만 보이기
    const notifWrap = document.getElementById('notifWrap');
    if(notifWrap){
      notifWrap.style.display = isLogged ? '' : 'none';
    }
  }

  // 데모용 쿼리스트링 로그인 스위치 (?login=user&name=GIJUN&host=1 , ?logout=1)
  function demoQSLogin(){
    const qs = new URLSearchParams(location.search);
    if(qs.has('logout')){
      localStorage.removeItem('sw_user');
      history.replaceState({}, '', location.pathname);
      return;
    }
    if(qs.get('login')==='user'){
      const name = qs.get('name') || 'Guest';
      const host = qs.get('host') === '1';
      localStorage.setItem('sw_user', JSON.stringify({name, isHost:host}));
      history.replaceState({}, '', location.pathname);
    }
  }

  // 전역 노출 및 초기 실행
  window.SW_AUTH = { applyAuthUI };

  document.addEventListener('DOMContentLoaded', () => {
    demoQSLogin();
    applyAuthUI();

    // 공통 로그아웃 버튼
    $$('#logoutBtn,[data-logout]').forEach(btn=>{
      btn.addEventListener('click', e=>{
        e.preventDefault();
        localStorage.removeItem('sw_user');
        applyAuthUI();
        location.href = '/';
      });
    });
  });
})();
