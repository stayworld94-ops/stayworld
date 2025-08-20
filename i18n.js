// 다국어 사전
const I18N = {
  EN:{
    nav_home:"Home", nav_membership:"Membership", nav_host:"Host",
    nav_login:"Login", nav_logout:"Logout", nav_signup:"Sign Up",
    host_login:"Host Login", host_signup:"Host Sign Up",
    host_register_property:"Register Property", host_my_listings:"My Listings", host_logout:"Logout",
    language:"Language"
  },
  KO:{
    nav_home:"홈", nav_membership:"멤버십", nav_host:"호스트",
    nav_login:"로그인", nav_logout:"로그아웃", nav_signup:"가입하기",
    host_login:"호스트 로그인", host_signup:"호스트 가입",
    host_register_property:"숙소 등록", host_my_listings:"호스트 등록목록", host_logout:"로그아웃",
    language:"언어"
  },
  JA:{
    nav_home:"Home", nav_membership:"Membership", nav_host:"ホスト",
    nav_login:"Login", nav_logout:"ログアウト", nav_signup:"Sign Up",
    host_login:"ホストログイン", host_signup:"ホスト登録",
    host_register_property:"物件を登録", host_my_listings:"マイリスティング", host_logout:"ログアウト",
    language:"Language"
  },
  ZH:{
    nav_home:"首页", nav_membership:"会员", nav_host:"房东",
    nav_login:"登录", nav_logout:"退出登录", nav_signup:"注册",
    host_login:"房东登录", host_signup:"房东注册",
    host_register_property:"登记房源", host_my_listings:"我的房源", host_logout:"退出登录",
    language:"语言"
  },
  FR:{
    nav_home:"Accueil", nav_membership:"Adhésion", nav_host:"Hôte",
    nav_login:"Connexion", nav_logout:"Déconnexion", nav_signup:"S’inscrire",
    host_login:"Connexion hôte", host_signup:"Inscription hôte",
    host_register_property:"Enregistrer un logement", host_my_listings:"Mes annonces", host_logout:"Déconnexion",
    language:"Langue"
  },
  ES:{
    nav_home:"Inicio", nav_membership:"Membresía", nav_host:"Anfitrión",
    nav_login:"Ingresar", nav_logout:"Cerrar sesión", nav_signup:"Regístrate",
    host_login:"Inicio de sesión de anfitrión", host_signup:"Registro de anfitrión",
    host_register_property:"Registrar propiedad", host_my_listings:"Mis anuncios", host_logout:"Cerrar sesión",
    language:"Idioma"
  },
  DE:{
    nav_home:"Start", nav_membership:"Mitgliedschaft", nav_host:"Gastgeber",
    nav_login:"Login", nav_logout:"Abmelden", nav_signup:"Registrieren",
    host_login:"Gastgeber-Login", host_signup:"Gastgeber-Registrierung",
    host_register_property:"Unterkunft registrieren", host_my_listings:"Meine Inserate", host_logout:"Abmelden",
    language:"Sprache"
  },
  TR:{
    nav_home:"Ana Sayfa", nav_membership:"Üyelik", nav_host:"Ev Sahibi",
    nav_login:"Giriş", nav_logout:"Çıkış", nav_signup:"Kaydol",
    host_login:"Ev Sahibi Girişi", host_signup:"Ev Sahibi Kaydı",
    host_register_property:"İlan Oluştur", host_my_listings:"İlanlarım", host_logout:"Çıkış",
    language:"Dil"
  },
  AR:{
    nav_home:"الرئيسية", nav_membership:"العضوية", nav_host:"المضيف",
    nav_login:"تسجيل الدخول", nav_logout:"تسجيل الخروج", nav_signup:"إنشاء حساب",
    host_login:"تسجيل دخول المضيف", host_signup:"تسجيل المضيف",
    host_register_property:"تسجيل عقار", host_my_listings:"قوائمي", host_logout:"تسجيل الخروج",
    language:"اللغة"
  },
  RU:{
    nav_home:"Главная", nav_membership:"Подписка", nav_host:"Хост",
    nav_login:"Войти", nav_logout:"Выйти", nav_signup:"Регистрация",
    host_login:"Вход хоста", host_signup:"Регистрация хоста",
    host_register_property:"Добавить объект", host_my_listings:"Мои объявления", host_logout:"Выйти",
    language:"Язык"
  }
};

// 현재 언어 상태 저장
let currentLang = localStorage.getItem('sw_lang') || 'EN';

// 번역 적용 함수
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const txt = I18N[currentLang]?.[key];
    if(txt) el.textContent = txt;
  });
}

// 언어 선택 UI 이벤트 연결 (index.html 등에 select#lang 있어야 동작)
document.addEventListener('DOMContentLoaded', ()=>{
  applyI18n();
  const sel = document.getElementById('lang');
  if(sel){
    sel.value = currentLang;
    sel.addEventListener('change', e=>{
      currentLang = e.target.value;
      localStorage.setItem('sw_lang', currentLang);
      applyI18n();
    });
  }
});
