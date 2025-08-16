const translations = {
  en: { home: "Home", search: "Search", membership: "Membership", login: "Login", signup: "Sign Up", welcome: "Welcome to StayWorld", tagline: "Book hotels, apartments, and more worldwide with crypto & cards.", search_btn: "Search", search_placeholder: "Search destinations..." },
  ko: { home: "홈", search: "검색", membership: "멤버십", login: "로그인", signup: "회원가입", welcome: "스테이월드에 오신 것을 환영합니다", tagline: "전 세계 호텔, 아파트 등을 카드와 암호화폐로 예약하세요.", search_btn: "검색", search_placeholder: "목적지를 검색하세요..." },
  fr: { home: "Accueil", search: "Rechercher", membership: "Adhésion", login: "Connexion", signup: "S'inscrire", welcome: "Bienvenue chez StayWorld", tagline: "Réservez hôtels, appartements et plus encore dans le monde entier avec crypto et cartes.", search_btn: "Rechercher", search_placeholder: "Rechercher des destinations..." },
  tr: { home: "Ana Sayfa", search: "Ara", membership: "Üyelik", login: "Giriş Yap", signup: "Kayıt Ol", welcome: "StayWorld'e Hoş Geldiniz", tagline: "Otelleri, daireleri ve daha fazlasını dünya çapında kripto ve kart ile rezerve edin.", search_btn: "Ara", search_placeholder: "Destinasyonları ara..." },
  ja: { home: "ホーム", search: "検索", membership: "メンバーシップ", login: "ログイン", signup: "新規登録", welcome: "StayWorldへようこそ", tagline: "世界中のホテル、アパートなどを暗号通貨とカードで予約できます。", search_btn: "検索", search_placeholder: "目的地を検索..." },
  de: { home: "Startseite", search: "Suche", membership: "Mitgliedschaft", login: "Anmelden", signup: "Registrieren", welcome: "Willkommen bei StayWorld", tagline: "Buchen Sie Hotels, Apartments und mehr weltweit mit Krypto & Karten.", search_btn: "Suchen", search_placeholder: "Ziele suchen..." },
  es: { home: "Inicio", search: "Buscar", membership: "Membresía", login: "Iniciar sesión", signup: "Registrarse", welcome: "Bienvenido a StayWorld", tagline: "Reserva hoteles, apartamentos y más en todo el mundo con criptomonedas y tarjetas.", search_btn: "Buscar", search_placeholder: "Buscar destinos..." },
  ru: { home: "Главная", search: "Поиск", membership: "Членство", login: "Войти", signup: "Зарегистрироваться", welcome: "Добро пожаловать в StayWorld", tagline: "Бронируйте отели, апартаменты и многое другое по всему миру с помощью криптовалюты и карт.", search_btn: "Поиск", search_placeholder: "Поиск направлений..." },
  it: { home: "Home", search: "Cerca", membership: "Iscrizione", login: "Accedi", signup: "Registrati", welcome: "Benvenuto in StayWorld", tagline: "Prenota hotel, appartamenti e altro in tutto il mondo con criptovalute e carte.", search_btn: "Cerca", search_placeholder: "Cerca destinazioni..." },
  zh: { home: "首页", search: "搜索", membership: "会员", login: "登录", signup: "注册", welcome: "欢迎来到StayWorld", tagline: "使用加密货币和银行卡预订全球酒店、公寓等。", search_btn: "搜索", search_placeholder: "搜索目的地..." }
};

let currentLang = "en";
const langSelector = document.getElementById("languageSelector");
Object.keys(translations).forEach(lang => {
  const opt = document.createElement("option");
  opt.value = lang;
  opt.textContent = lang.toUpperCase();
  langSelector.appendChild(opt);
});
langSelector.addEventListener("change", () => {
  currentLang = langSelector.value;
  document.querySelectorAll("[data-translate]").forEach(el => {
    el.textContent = translations[currentLang][el.getAttribute("data-translate")];
  });
  document.querySelectorAll("[data-placeholder]").forEach(el => {
    el.placeholder = translations[currentLang][el.getAttribute("data-placeholder")];
  });
});
