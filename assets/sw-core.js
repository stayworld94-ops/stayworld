/* /assets/sw-core.js  — i18n + Currency + Apply */

(() => {
  // ===== 10개 언어 사전 =====
  const I18N = {
    EN:{lang_label:"Language", nav_home:"Home", nav_membership:"Membership", nav_hotels:"Hotels",
        nav_login:"Log in", nav_signup:"Sign up", nav_host:"Host login",
        hero_luxury:"Luxury stays.", hero_reach:"Global reach.", hero_sub:"Cards, bank transfer & crypto (BTC · ETH · USDT).",
        placeholder_city:"Paris, Tokyo, Istanbul…", filters:"Filter", search:"Search",
        feat_verified:"Verified stays", feat_verified_sub:"Top picks near you.",
        feat_rewards:"StayWorld+ Rewards", feat_rewards_sub:"Earn points on every booking.",
        feat_payments:"Secure payments", feat_payments_sub:"Visa, Mastercard, Amex & Crypto."
    },
    KO:{lang_label:"언어", nav_home:"홈", nav_membership:"멤버십", nav_hotels:"호텔",
        nav_login:"로그인", nav_signup:"가입하기", nav_host:"호스트 로그인",
        hero_luxury:"럭셔리 스테이.", hero_reach:"글로벌 리치.", hero_sub:"카드, 계좌이체 & 크립토 (BTC · ETH · USDT).",
        placeholder_city:"파리, 도쿄, 이스탄불…", filters:"필터", search:"검색",
        feat_verified:"검증된 숙소", feat_verified_sub:"내 주변 추천 숙소.",
        feat_rewards:"StayWorld+ 리워드", feat_rewards_sub:"예약마다 포인트 적립.",
        feat_payments:"안전한 결제", feat_payments_sub:"VISA, 마스터, 아멕스 & 크립토."
    },
    JA:{lang_label:"言語", nav_home:"ホーム", nav_membership:"メンバーシップ", nav_hotels:"ホテル",
        nav_login:"ログイン", nav_signup:"登録", nav_host:"ホストログイン",
        hero_luxury:"贅沢な滞在。", hero_reach:"グローバルに。", hero_sub:"カード・振込・暗号資産（BTC / ETH / USDT）",
        placeholder_city:"パリ、東京、イスタンブール…", filters:"フィルター", search:"検索",
        feat_verified:"検証済み宿", feat_verified_sub:"近くのおすすめ。",
        feat_rewards:"StayWorld+ リワード", feat_rewards_sub:"毎回の予約でポイント。",
        feat_payments:"安全な支払い", feat_payments_sub:"Visa/Mastercard/Amex/暗号資産"
    },
    ZH:{lang_label:"语言", nav_home:"首页", nav_membership:"会员", nav_hotels:"酒店",
        nav_login:"登录", nav_signup:"注册", nav_host:"房东登录",
        hero_luxury:"奢华住宿。", hero_reach:"全球覆盖。", hero_sub:"银行卡、转账与加密货币（BTC/ETH/USDT）",
        placeholder_city:"巴黎、东京、伊斯坦布尔…", filters:"筛选", search:"搜索",
        feat_verified:"已验证住宿", feat_verified_sub:"附近精选。",
        feat_rewards:"StayWorld+ 奖励", feat_rewards_sub:"每次预订赚积分。",
        feat_payments:"安全支付", feat_payments_sub:"Visa/Mastercard/Amex/加密"
    },
    FR:{lang_label:"Langue", nav_home:"Accueil", nav_membership:"Adhésion", nav_hotels:"Hôtels",
        nav_login:"Connexion", nav_signup:"S’inscrire", nav_host:"Espace hôte",
        hero_luxury:"Séjours de luxe.", hero_reach:"Portée mondiale.", hero_sub:"Carte, virement & crypto (BTC·ETH·USDT).",
        placeholder_city:"Paris, Tokyo, Istanbul…", filters:"Filtres", search:"Rechercher",
        feat_verified:"Logements vérifiés", feat_verified_sub:"Meilleurs choix près de chez vous.",
        feat_rewards:"Récompenses StayWorld+", feat_rewards_sub:"Des points à chaque réservation.",
        feat_payments:"Paiements sécurisés", feat_payments_sub:"Visa/Mastercard/Amex/Crypto"
    },
    ES:{lang_label:"Idioma", nav_home:"Inicio", nav_membership:"Membresía", nav_hotels:"Hoteles",
        nav_login:"Ingresar", nav_signup:"Regístrate", nav_host:"Acceso anfitrión",
        hero_luxury:"Estancias de lujo.", hero_reach:"Alcance global.", hero_sub:"Tarjeta, transferencia y cripto (BTC·ETH·USDT).",
        placeholder_city:"París, Tokio, Estambul…", filters:"Filtros", search:"Buscar",
        feat_verified:"Alojamientos verificados", feat_verified_sub:"Mejores opciones cerca de ti.",
        feat_rewards:"Recompensas StayWorld+", feat_rewards_sub:"Puntos en cada reserva.",
        feat_payments:"Pagos seguros", feat_payments_sub:"Visa/Mastercard/Amex/Cripto"
    },
    DE:{lang_label:"Sprache", nav_home:"Start", nav_membership:"Mitgliedschaft", nav_hotels:"Hotels",
        nav_login:"Login", nav_signup:"Registrieren", nav_host:"Gastgeber-Login",
        hero_luxury:"Luxuriöse Aufenthalte.", hero_reach:"Globale Reichweite.", hero_sub:"Karte, Überweisung & Krypto (BTC·ETH·USDT).",
        placeholder_city:"Paris, Tokio, Istanbul…", filters:"Filter", search:"Suchen",
        feat_verified:"Verifizierte Unterkünfte", feat_verified_sub:"Top-Auswahl in deiner Nähe.",
        feat_rewards:"StayWorld+ Prämien", feat_rewards_sub:"Punkte bei jeder Buchung.",
        feat_payments:"Sichere Zahlungen", feat_payments_sub:"Visa/Mastercard/Amex/Krypto"
    },
    IT:{lang_label:"Lingua", nav_home:"Home", nav_membership:"Abbonamento", nav_hotels:"Hotel",
        nav_login:"Accedi", nav_signup:"Registrati", nav_host:"Login host",
        hero_luxury:"Soggiorni di lusso.", hero_reach:"Copertura globale.", hero_sub:"Carte, bonifico e cripto (BTC·ETH·USDT).",
        placeholder_city:"Parigi, Tokyo, Istanbul…", filters:"Filtri", search:"Cerca",
        feat_verified:"Soggiorni verificati", feat_verified_sub:"Migliori scelte vicino a te.",
        feat_rewards:"StayWorld+ Ricompense", feat_rewards_sub:"Punti ad ogni prenotazione.",
        feat_payments:"Pagamenti sicuri", feat_payments_sub:"Visa/Mastercard/Amex/Cripto"
    },
    TR:{lang_label:"Dil", nav_home:"Ana Sayfa", nav_membership:"Üyelik", nav_hotels:"Oteller",
        nav_login:"Giriş", nav_signup:"Kaydol", nav_host:"Ev Sahibi Girişi",
        hero_luxury:"Lüks konaklamalar.", hero_reach:"Küresel erişim.", hero_sub:"Kart, havale ve kripto (BTC·ETH·USDT).",
        placeholder_city:"Paris, Tokyo, İstanbul…", filters:"Filtreler", search:"Ara",
        feat_verified:"Doğrulanmış konaklamalar", feat_verified_sub:"Yakındaki en iyi seçenekler.",
        feat_rewards:"StayWorld+ Ödülleri", feat_rewards_sub:"Her rezervasyonda puan.",
        feat_payments:"Güvenli ödemeler", feat_payments_sub:"Visa/Mastercard/Amex/Kripto"
    },
    AR:{lang_label:"اللغة", nav_home:"الرئيسية", nav_membership:"العضوية", nav_hotels:"الفنادق",
        nav_login:"تسجيل الدخول", nav_signup:"إنشاء حساب", nav_host:"دخول المضيف",
        hero_luxury:"إقامات فاخرة.", hero_reach:"انتشار عالمي.", hero_sub:"بطاقات، تحويل وبِتكوين/إيثريوم/USDT",
        placeholder_city:"باريس، طوكيو، إسطنبول…", filters:"الفلاتر", search:"بحث",
        feat_verified:"إقامات موثوقة", feat_verified_sub:"أفضل الخيارات بالقرب منك.",
        feat_rewards:"مكافآت StayWorld+", feat_rewards_sub:"نقاط مع كل حجز.",
        feat_payments:"مدفوعات آمنة", feat_payments_sub:"Visa/Mastercard/Amex/Crypto"
    },
    RU:{lang_label:"Язык", nav_home:"Главная", nav_membership:"Подписка", nav_hotels:"Отели",
        nav_login:"Войти", nav_signup:"Регистрация", nav_host:"Вход хоста",
        hero_luxury:"Роскошное проживание.", hero_reach:"Глобальный охват.", hero_sub:"Карты, перевод и крипто (BTC·ETH·USDT).",
        placeholder_city:"Париж, Токио, Стамбул…", filters:"Фильтры", search:"Поиск",
        feat_verified:"Проверенные варианты", feat_verified_sub:"Лучшее рядом с вами.",
        feat_rewards:"Бонусы StayWorld+", feat_rewards_sub:"Баллы за каждое бронирование.",
        feat_payments:"Безопасные платежи", feat_payments_sub:"Visa/Mastercard/Amex/Крипто"
    },
  };

  // ===== 언어 → 통화 기본 매핑 =====
  const LANG_TO_CUR = { EN:'USD', KO:'KRW', JA:'JPY', ZH:'CNY', FR:'EUR', ES:'EUR', DE:'EUR', IT:'EUR', TR:'TRY', AR:'AED', RU:'RUB' };

  // ===== 헬퍼 =====
  const $ = s => document.querySelector(s);

  function currentLang(){
    const el = document.getElementById('swLang');
    const saved = localStorage.getItem('sw_lang');
    const lang = (el?.value || saved || 'EN').toUpperCase();
    return I18N[lang] ? lang : 'EN';
  }

  // ===== 번역 적용 =====
  function applyI18N(){
    const lang = currentLang();
    const dict = I18N[lang] || I18N.EN;

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      if(dict[k]) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const k = el.getAttribute('data-i18n-placeholder');
      if(dict[k]) el.setAttribute('placeholder', dict[k]);
    });

    // "Language" 라벨
    document.querySelectorAll('[data-i18n-langlabel]').forEach(el=>{
      el.textContent = dict.lang_label || I18N.EN.lang_label;
    });
  }

  // ===== 언어 변경 시 통화 동기화 =====
  function syncCurrencyToLang(){
    const lang = currentLang();
    const curSel = document.getElementById('swCur');
    if(!curSel) return;
    const code = LANG_TO_CUR[lang] || 'USD';
    curSel.value = code;
    localStorage.setItem('sw_cur', code);
  }

  // ===== 초기 바인딩 =====
  function initI18N(){
    const langSel = document.getElementById('swLang');
    const curSel  = document.getElementById('swCur');

    // 저장된 값 복원
    const savedLang = (localStorage.getItem('sw_lang') || langSel?.value || 'EN').toUpperCase();
    if(langSel) langSel.value = I18N[savedLang] ? savedLang : 'EN';
    const savedCur = localStorage.getItem('sw_cur');
    if(curSel && savedCur) curSel.value = savedCur;

    // 적용
    applyI18N();
    if(!savedCur) syncCurrencyToLang();

    langSel?.addEventListener('change', e=>{
      localStorage.setItem('sw_lang', e.target.value.toUpperCase());
      applyI18N();
      syncCurrencyToLang();
    });
  }

  // ===== 전역 노출 =====
  window.SW_I18N = { I18N, applyI18N, initI18N, syncCurrencyToLang, LANG_TO_CUR };

  // DOMContentLoaded 때 자동 실행
  document.addEventListener('DOMContentLoaded', initI18N);
})();
