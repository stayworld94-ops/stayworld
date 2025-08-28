/* ===== i18n (compat, 10 languages) – underscore & dotted keys both supported =====
   - Drop-in replacement for your current /scripts/i18n.js
   - Keep old API: applyI18NPage(), applyI18n (alias)
   - New helpers: t(key[,lang]), applyLang([lang]), setLang(lang)
   - Load this BEFORE other scripts on every page
*/
(function(){
  /* --------------------------
   * 1) NEW (dotted) dictionary
   * -------------------------- */
  const I18N_NEW = {
    en:{
      /* nav / controls */
      "nav.home":"Home","nav.hotels":"Hotels","nav.membership":"Membership","nav.search":"Search","nav.becomeHost":"Become a Host",
      "nav.login":"Log in","nav.logout":"Logout","nav.signup":"Sign up",
      "controls.sort":"Sort","controls.filter":"Filter","controls.map":"Map","controls.rateHint":"* Demo rates. Connect a live FX API.",
      /* filters */
      "filters.title":"Filters","filters.reset":"Reset","filters.apply":"Apply",
      "filters.maxPrice":"Max price (converted)","filters.minRating":"Minimum rating","filters.maxDistance":"Max distance from center (km)","filters.freeCancel":"Free cancellation only",
      "filters.type":"Stay type","filters.amen":"Amenities","filters.booking":"Booking","filters.verify":"Verification","filters.long":"Long-stay",
      "filters.biz":"Business","filters.acc":"Accessibility","filters.view":"View","filters.safe":"Safety",
      "filters.family":"Family","filters.ent":"Entertainment","filters.out":"Outdoor","filters.park":"Parking",
      "filters.pets":"Pets","filters.checkin":"Check-in","filters.exp":"Experiences","filters.loc":"Location",
      /* option labels */
      "type.hotel":"Hotel","type.motel":"Motel","type.hostel":"Hostel","type.apartment":"Apartment","type.villa":"Villa","type.ryokan":"Ryokan","type.guesthouse":"Guesthouse","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"Kitchen","amen.parking":"Parking","amen.pool":"Pool","amen.ac":"Air conditioning","amen.gym":"Gym","amen.workspace":"Workspace","amen.washer":"Washer","amen.dryer":"Dryer","amen.breakfast":"Breakfast",
      "book.instant":"Instant book","book.request":"Request to book",
      "verify.listings":"Verified listings only","verify.reviews":"Verified reviews",
      "long.deals":"Show long-stay deals","biz.b2b":"B2B-ready","biz.invoice":"Invoice available",
      "acc.stepfree":"Step-free access","acc.elevator":"Elevator","acc.doorway":"Wide doorway","acc.bathroom":"Accessible bathroom",
      "view.sea":"Sea view","view.city":"City view","view.mountain":"Mountain view","view.garden":"Garden",
      "safe.co":"Carbon monoxide alarm","safe.smoke":"Smoke alarm","safe.aid":"First aid kit",
      "family.crib":"Crib","family.chair":"High chair","family.stroller":"Stroller friendly",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"Game console",
      "out.bbq":"BBQ grill","out.patio":"Patio","out.garden":"Private garden",
      "park.onsite":"On-site","park.street":"Street","park.garage":"Paid garage",
      "pets.allowed":"Allowed","checkin.self":"Self check-in",
      "exp.nature":"Nature","exp.camping":"Camping","exp.traditional":"Traditional","exp.ski":"Ski-in/out","exp.wine":"Wine country",
      "loc.airport":"Near airport","loc.station":"Near station","loc.beach":"Near beach","loc.center":"City center",
      /* footer + card */
      "foot.about":"About","foot.careers":"Careers","foot.press":"Press","foot.help":"Help","foot.center":"Help Center","foot.protect":"Guest Protection","foot.contact":"Contact","foot.legal":"Legal","foot.terms":"Terms","foot.privacy":"Privacy","foot.cookies":"Cookies",
      "cta.book":"Book","cta.perNight":"/ night","cta.freeCancel":"Free cancellation","badge.verified":"Verified","msg.noListings":"No listings yet."
    },
    ko:{
      "nav.home":"홈","nav.hotels":"숙소","nav.membership":"멤버십","nav.search":"검색","nav.becomeHost":"호스트 되기",
      "nav.login":"로그인","nav.logout":"로그아웃","nav.signup":"가입하기",
      "controls.sort":"정렬","controls.filter":"필터","controls.map":"지도","controls.rateHint":"* 데모 환율입니다. 운영 시 환율 API를 연결하세요.",
      "filters.title":"필터","filters.reset":"초기화","filters.apply":"적용",
      "filters.maxPrice":"최대 가격(환산)","filters.minRating":"최소 평점","filters.maxDistance":"도심까지 최대 거리(km)","filters.freeCancel":"무료 취소만",
      "filters.type":"숙소 유형","filters.amen":"편의시설","filters.booking":"예약 방식","filters.verify":"검증","filters.long":"장기 숙박",
      "filters.biz":"비즈니스","filters.acc":"접근성","filters.view":"전망","filters.safe":"안전",
      "filters.family":"가족","filters.ent":"엔터테인먼트","filters.out":"아웃도어","filters.park":"주차",
      "filters.pets":"반려동물","filters.checkin":"체크인","filters.exp":"경험","filters.loc":"위치",
      "type.hotel":"호텔","type.motel":"모텔","type.hostel":"호스텔","type.apartment":"아파트","type.villa":"빌라","type.ryokan":"료칸","type.guesthouse":"게스트하우스","type.bnb":"B&B",
      "amen.wifi":"와이파이","amen.kitchen":"주방","amen.parking":"주차","amen.pool":"수영장","amen.ac":"에어컨","amen.gym":"피트니스","amen.workspace":"업무 공간","amen.washer":"세탁기","amen.dryer":"건조기","amen.breakfast":"조식",
      "book.instant":"즉시 예약","book.request":"예약 요청","verify.listings":"검증된 숙소만","verify.reviews":"검증된 리뷰",
      "long.deals":"장기 숙박 특가만 보기","biz.b2b":"B2B 지원","biz.invoice":"인보이스 제공",
      "acc.stepfree":"무단차 출입","acc.elevator":"엘리베이터","acc.doorway":"넓은 출입문","acc.bathroom":"장애인 화장실",
      "view.sea":"바다 전망","view.city":"도시 전망","view.mountain":"산 전망","view.garden":"정원",
      "safe.co":"일산화탄소 감지기","safe.smoke":"연기 감지기","safe.aid":"구급상자",
      "family.crib":"아기 침대","family.chair":"아기의자","family.stroller":"유모차 가능",
      "ent.tv":"TV","ent.netflix":"넷플릭스","ent.console":"게임 콘솔",
      "out.bbq":"바비큐 그릴","out.patio":"파티오","out.garden":"전용 정원",
      "park.onsite":"현장 주차","park.street":"노상 주차","park.garage":"유료 차고",
      "pets.allowed":"가능","checkin.self":"셀프 체크인",
      "exp.nature":"자연","exp.camping":"캠핑","exp.traditional":"전통","exp.ski":"스키 인/아웃","exp.wine":"와인",
      "loc.airport":"공항 인근","loc.station":"역 인근","loc.beach":"해변 인근","loc.center":"도심",
      "foot.about":"회사 소개","foot.careers":"채용","foot.press":"보도자료","foot.help":"도움말","foot.center":"도움말 센터","foot.protect":"게스트 보호","foot.contact":"문의","foot.legal":"법적 고지","foot.terms":"이용약관","foot.privacy":"개인정보 처리방침","foot.cookies":"쿠키",
      "cta.book":"예약","cta.perNight":"/ 1박","cta.freeCancel":"무료 취소","badge.verified":"검증됨","msg.noListings":"등록된 숙소가 없습니다."
    },
    tr:{
      "nav.home":"Ana sayfa","nav.hotels":"Konaklama","nav.membership":"Üyelik","nav.search":"Arama","nav.becomeHost":"Ev sahibi olun",
      "nav.login":"Giriş","nav.logout":"Çıkış","nav.signup":"Kaydol",
      "controls.sort":"Sırala","controls.filter":"Filtre","controls.map":"Harita","controls.rateHint":"* Demo kur. Canlı kur API’si bağlayın.",
      "filters.title":"Filtreler","filters.reset":"Sıfırla","filters.apply":"Uygula",
      "filters.maxPrice":"Azami fiyat (çevrilmiş)","filters.minRating":"Asgari puan","filters.maxDistance":"Merkeze azami mesafe (km)","filters.freeCancel":"Yalnızca ücretsiz iptal",
      "filters.type":"Konaklama türü","filters.amen":"Olanaklar","filters.booking":"Rezervasyon","filters.verify":"Doğrulama","filters.long":"Uzun konaklama",
      "filters.biz":"İş","filters.acc":"Erişilebilirlik","filters.view":"Manzara","filters.safe":"Güvenlik","filters.family":"Aile","filters.ent":"Eğlence","filters.out":"Açık alan","filters.park":"Park","filters.pets":"Evcil","filters.checkin":"Giriş","filters.exp":"Deneyimler","filters.loc":"Konum",
      "type.hotel":"Otel","type.motel":"Motel","type.hostel":"Hostel","type.apartment":"Daire","type.villa":"Villa","type.ryokan":"Ryokan","type.guesthouse":"Pansiyon","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"Mutfak","amen.parking":"Otopark","amen.pool":"Havuz","amen.ac":"Klima","amen.gym":"Spor salonu","amen.workspace":"Çalışma alanı","amen.washer":"Çamaşır mak.","amen.dryer":"Kurutma mak.","amen.breakfast":"Kahvaltı",
      "book.instant":"Anında rezervasyon","book.request":"Talep ile rezervasyon","verify.listings":"Yalnızca doğrulanmış ilanlar","verify.reviews":"Doğrulanmış yorumlar",
      "long.deals":"Uzun konaklama fırsatları","biz.b2b":"B2B uyumlu","biz.invoice":"Fatura mevcut",
      "acc.stepfree":"Basamaksız erişim","acc.elevator":"Asansör","acc.doorway":"Geniş kapı","acc.bathroom":"Erişilebilir banyo",
      "view.sea":"Deniz manzarası","view.city":"Şehir manzarası","view.mountain":"Dağ manzarası","view.garden":"Bahçe",
      "safe.co":"CO alarmı","safe.smoke":"Duman alarmı","safe.aid":"İlk yardım çantası",
      "family.crib":"Bebek yatağı","family.chair":"Mama sandalyesi","family.stroller":"Bebek arabası uygun",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"Oyun konsolu",
      "out.bbq":"Mangal","out.patio":"Avlu","out.garden":"Özel bahçe",
      "park.onsite":"Tesis içi","park.street":"Sokak","park.garage":"Ücretli garaj",
      "pets.allowed":"İzinli","checkin.self":"Kendi kendine giriş",
      "exp.nature":"Doğa","exp.camping":"Kamp","exp.traditional":"Geleneksel","exp.ski":"Kayak in/out","exp.wine":"Şarap bölgesi",
      "loc.airport":"Havalimanına yakın","loc.station":"İstasyona yakın","loc.beach":"Plaja yakın","loc.center":"Şehir merkezi",
      "foot.about":"Hakkımızda","foot.careers":"Kariyer","foot.press":"Basın","foot.help":"Yardım","foot.center":"Yardım Merkezi","foot.protect":"Misafir Koruma","foot.contact":"İletişim","foot.legal":"Hukuki","foot.terms":"Şartlar","foot.privacy":"Gizlilik","foot.cookies":"Çerezler",
      "cta.book":"Rezervasyon","cta.perNight":"/ gecelik","cta.freeCancel":"Ücretsiz iptal","badge.verified":"Doğrulandı","msg.noListings":"İlan yok."
    },
    fr:{}, ja:{}, zh:{},
    de:{"nav.home":"Startseite","nav.hotels":"Unterkünfte","nav.membership":"Mitgliedschaft","nav.search":"Suche","nav.becomeHost":"Gastgeber werden","nav.login":"Anmelden","nav.logout":"Abmelden","nav.signup":"Registrieren","controls.sort":"Sortieren","controls.filter":"Filter","controls.map":"Karte","filters.title":"Filter","filters.reset":"Zurücksetzen","filters.apply":"Anwenden","cta.book":"Buchen","cta.perNight":"/ Nacht","cta.freeCancel":"Kostenlose Stornierung","badge.verified":"Verifiziert","msg.noListings":"Keine Einträge."},
    es:{"nav.home":"Inicio","nav.hotels":"Alojamientos","nav.membership":"Membresía","nav.search":"Buscar","nav.becomeHost":"Convertirse en anfitrión","nav.login":"Iniciar sesión","nav.logout":"Cerrar sesión","nav.signup":"Registrarse","controls.sort":"Ordenar","controls.filter":"Filtro","controls.map":"Mapa","filters.title":"Filtros","filters.reset":"Restablecer","filters.apply":"Aplicar","cta.book":"Reservar","cta.perNight":"/ noche","cta.freeCancel":"Cancelación gratuita","badge.verified":"Verificado","msg.noListings":"Sin alojamientos."},
    it:{"nav.home":"Home","nav.hotels":"Alloggi","nav.membership":"Abbonamento","nav.search":"Cerca","nav.becomeHost":"Diventa host","nav.login":"Accedi","nav.logout":"Esci","nav.signup":"Registrati","controls.sort":"Ordina","controls.filter":"Filtro","controls.map":"Mappa","filters.title":"Filtri","filters.reset":"Reimposta","filters.apply":"Applica","cta.book":"Prenota","cta.perNight":"/ notte","cta.freeCancel":"Cancellazione gratuita","badge.verified":"Verificato","msg.noListings":"Nessun annuncio."},
    ru:{"nav.home":"Главная","nav.hotels":"Жильё","nav.membership":"Подписка","nav.search":"Поиск","nav.becomeHost":"Стать хозяином","nav.login":"Войти","nav.logout":"Выйти","nav.signup":"Регистрация","controls.sort":"Сортировка","controls.filter":"Фильтр","controls.map":"Карта","filters.title":"Фильтры","filters.reset":"Сбросить","filters.apply":"Применить","cta.book":"Забронировать","cta.perNight":"/ ночь","cta.freeCancel":"Бесплатная отмена","badge.verified":"Проверено","msg.noListings":"Пока нет объявлений."}
  };

  /* -------------------------------------------------
   * 2) OLD (underscore) dictionary – from your file
   *    (en/ko/fr/ja/zh 주요 키 발췌, 나머지는 EN 폴백)
   * ------------------------------------------------- */
  const I18N_OLD = {
    EN:{nav_home:"Home",nav_membership:"Membership",nav_login:"Login",nav_logout:"Logout",nav_signup:"Sign Up",language:"Language",
      hero_luxury:"Luxury stays.",hero_reach:"Global reach.",hero_sub:"Cards, bank transfer & crypto (BTC · ETH · USDT).",
      placeholder_city:"Paris, Tokyo, Istanbul…",filters:"Filters",search:"Search",
      feat_verified:"Verified stays",feat_verified_sub:"Top picks near you.",
      feat_rewards:"StayWorld+ Rewards",feat_rewards_sub:"Earn points on every booking.",
      feat_payments:"Secure payments",feat_payments_sub:"Visa, Mastercard, Amex & Crypto.",
      f_title:"Filters", f_reset:"Reset", f_apply:"Apply", f_currency:"Currency", f_price:"Price per night",
      f_staytype:"Stay type", f_review:"Review score", f_beds:"Beds & Baths", f_pets:"Pets", f_checkin:"Check-in",
      f_amen:"Amenities", f_booking:"Booking", f_verify:"Verification", f_long:"Long-stay", f_biz:"Business",
      f_loc:"Location", f_access:"Accessibility", f_ex:"Experiences", f_view:"View", f_safe:"Safety",
      f_family:"Family", f_ent:"Entertainment", f_out:"Outdoor", f_park:"Parking",
      footer_copy:"© StayWorld — stayworldbooking.com",
      nav_host:"Host", host_login:"Host Login", host_signup:"Host Sign Up", host_register_property:"Register Property",
      host_my_listings:"My Listings", host_logout:"Logout",
      email:"Email", password:"Password", login:"Login", signup:"Sign Up",
      dont_have_account:"Don’t have an account?", already_have_account:"Already have an account?",
      passport_upload:"Upload Passport / ID", full_name:"Full name", property_name:"Property name",
      description:"Description", address:"Address", nightly_price:"Nightly price (USD)",
      sign_in_with_google:"Sign in with Google", go_dashboard:"Go to Dashboard", logout:"Logout"
    },
    KO:{nav_home:"홈",nav_membership:"멤버십",nav_login:"로그인",nav_logout:"로그아웃",nav_signup:"가입하기",language:"언어",
      hero_luxury:"럭셔리 스테이.",hero_reach:"글로벌 리치.",hero_sub:"카드, 계좌이체 & 크립토 (BTC · ETH · USDT).",
      placeholder_city:"파리, 도쿄, 이스탄불…",filters:"필터",search:"검색",
      feat_verified:"검증된 스테이",feat_verified_sub:"가까운 추천 숙소.",feat_rewards:"StayWorld+ 리워드",feat_rewards_sub:"예약마다 포인트 적립.",
      feat_payments:"안전한 결제",feat_payments_sub:"VISA, 마스터, 아멕스 & 크립토.",
      f_title:"필터", f_reset:"초기화", f_apply:"적용", f_currency:"통화", f_price:"1박 가격",
      f_staytype:"숙소 유형", f_review:"후기 점수", f_beds:"침대&욕실", f_pets:"반려동물", f_checkin:"체크인",
      f_amen:"편의시설", f_booking:"예약 방식", f_verify:"검증", f_long:"장기 숙박", f_biz:"비즈니스",
      f_loc:"위치", f_access:"접근성", f_ex:"체험", f_view:"전망", f_safe:"안전",
      f_family:"가족", f_ent:"엔터테인먼트", f_out:"야외", f_park:"주차",
      footer_copy:"© 스테이월드 — stayworldbooking.com",
      nav_host:"호스트", host_login:"호스트 로그인", host_signup:"호스트 가입", host_register_property:"숙소 등록",
      host_my_listings:"호스트 등록목록", host_logout:"로그아웃",
      email:"이메일", password:"비밀번호", login:"로그인", signup:"가입하기",
      dont_have_account:"계정이 없나요?", already_have_account:"이미 계정이 있나요?",
      passport_upload:"여권/신분증 업로드", full_name:"이름", property_name:"숙소명",
      description:"설명", address:"주소", nightly_price:"1박 요금 (USD)",
      sign_in_with_google:"Google로 로그인", go_dashboard:"대시보드로 가기", logout:"로그아웃"
    },
    FR:{nav_home:"Accueil",nav_membership:"Adhésion",nav_login:"Connexion",nav_logout:"Déconnexion",nav_signup:"S’inscrire",language:"Langue",
      hero_luxury:"Séjours de luxe.",hero_reach:"Portée mondiale.",hero_sub:"Carte, virement & crypto (BTC · ETH · USDT).",
      placeholder_city:"Paris, Tokyo, Istanbul…",filters:"Filtres",search:"Rechercher",
      feat_verified:"Logements vérifiés",feat_verified_sub:"Meilleurs choix près de chez vous.",
      feat_rewards:"Récompenses StayWorld+",feat_rewards_sub:"Des points à chaque réservation.",
      feat_payments:"Paiements sécurisés",feat_payments_sub:"Visa, Mastercard, Amex & Crypto.",
      f_title:"Filtres", f_reset:"Réinitialiser", f_apply:"Appliquer", f_currency:"Devise", f_price:"Prix par nuit",
      f_staytype:"Type d’hébergement", f_review:"Note", f_beds:"Lits & Salles de bain", f_pets:"Animaux", f_checkin:"Arrivée",
      f_amen:"Équipements", f_booking:"Réservation", f_verify:"Vérification", f_long:"Long séjour", f_biz:"Affaires",
      f_loc:"Emplacement", f_access:"Accessibilité", f_ex:"Expériences", f_view:"Vue", f_safe:"Sécurité",
      f_family:"Famille", f_ent:"Divertissement", f_out:"Extérieur", f_park:"Parking",
      email:"E-mail", password:"Mot de passe", login:"Connexion", signup:"S’inscrire",
      dont_have_account:"Pas de compte ?", already_have_account:"Vous avez déjà un compte ?",
      passport_upload:"Téléverser passeport / pièce d’identité", full_name:"Nom complet", property_name:"Nom du logement",
      description:"Description", address:"Adresse", nightly_price:"Prix par nuit (USD)",
      sign_in_with_google:"Se connecter avec Google", go_dashboard:"Aller au tableau de bord", logout:"Déconnexion",
      footer_copy:"© StayWorld — stayworldbooking.com"
    },
    JA:{nav_home:"Home",nav_membership:"Membership",nav_login:"Login",nav_logout:"ログアウト",nav_signup:"Sign Up",language:"Language",
      hero_luxury:"贅沢な滞在。",hero_reach:"グローバルに。",hero_sub:"カード、銀行振込、暗号資産（BTC・ETH・USDT）。",
      placeholder_city:"パリ、東京、イスタンブール…",filters:"フィルター",search:"検索",
      feat_verified:"検証済みの宿",feat_verified_sub:"近くのおすすめ。",feat_rewards:"StayWorld+ リワード",feat_rewards_sub:"予約毎にポイント。",
      feat_payments:"安全な支払い",feat_payments_sub:"VISA, Master, Amex & Crypto。",
      f_title:"フィルター", f_reset:"リセット", f_apply:"適用", f_currency:"通貨", f_price:"1泊の価格",
      f_staytype:"宿タイプ", f_review:"レビュー評価", f_beds:"ベッド&バス", f_pets:"ペット", f_checkin:"チェックイン",
      f_amen:"アメニティ", f_booking:"予約方法", f_verify:"認証", f_long:"長期滞在", f_biz:"ビジネス",
      f_loc:"場所", f_access:"アクセシビリティ", f_ex:"体験", f_view:"眺望", f_safe:"安全",
      f_family:"家族向け", f_ent:"エンタメ", f_out:"屋外", f_park:"駐車",
      email:"メール", password:"パスワード", login:"ログイン", signup:"登録",
      dont_have_account:"アカウントがありませんか？", already_have_account:"すでにアカウント？",
      passport_upload:"パスポート/ID をアップロード", full_name:"氏名", property_name:"物件名",
      description:"説明", address:"住所", nightly_price:"1泊料金 (USD)",
      sign_in_with_google:"Googleでログイン", go_dashboard:"ダッシュボードへ", logout:"ログアウト",
      footer_copy:"© StayWorld — stayworldbooking.com"
    },
    ZH:{nav_home:"首页",nav_membership:"会员",nav_login:"登录",nav_logout:"退出登录",nav_signup:"注册",language:"语言",
      hero_luxury:"奢华住宿。",hero_reach:"全球覆盖。",hero_sub:"银行卡、转账与加密货币（BTC · ETH · USDT）。",
      placeholder_city:"巴黎、东京、伊斯坦布尔…",filters:"筛选",search:"搜索",
      feat_verified:"已验证住宿",feat_verified_sub:"附近精选。",feat_rewards:"StayWorld+ 奖励",feat_rewards_sub:"每次预订赚积分。",
      feat_payments:"安全支付",feat_payments_sub:"Visa、Mastercard、Amex 与加密货币。",
      f_title:"筛选", f_reset:"重置", f_apply:"应用", f_currency:"货币", f_price:"每晚价格",
      f_staytype:"房源类型", f_review:"评分", f_beds:"床&浴室", f_pets:"宠物", f_checkin:"入住",
      f_amen:"设施", f_booking:"预订方式", f_verify:"认证", f_long:"长住", f_biz:"商务",
      f_loc:"位置", f_access:"无障碍", f_ex:"体验", f_view:"景观", f_safe:"安全",
      f_family:"亲子", f_ent:"娱乐", f_out:"户外", f_park:"停车",
      email:"邮箱", password:"密码", login:"登录", signup:"注册",
      dont_have_account:"还没有账号？", already_have_account:"已有账号？",
      passport_upload:"上传护照/证件", full_name:"姓名", property_name:"房源名称",
      description:"简介", address:"地址", nightly_price:"每晚价格 (USD)",
      sign_in_with_google:"用 Google 登录", go_dashboard:"前往控制台", logout:"退出登录",
      footer_copy:"© StayWorld — stayworldbooking.com"
    }
  };

  /* -----------------------------------------------
   * 3) alias map: dotted → old underscore special
   * ----------------------------------------------- */
  const ALIAS = {
    "nav.home":"nav_home","nav.membership":"nav_membership","nav.login":"nav_login","nav.logout":"nav_logout","nav.signup":"nav_signup",
    "filters.title":"f_title","filters.reset":"f_reset","filters.apply":"f_apply",
    "filters.maxPrice":"f_price","filters.type":"f_staytype","filters.minRating":"f_review",
    "filters.pets":"f_pets","filters.checkin":"f_checkin","filters.amen":"f_amen",
    "filters.booking":"f_booking","filters.verify":"f_verify","filters.long":"f_long",
    "filters.biz":"f_biz","filters.loc":"f_loc","filters.acc":"f_access","filters.exp":"f_ex",
    "filters.view":"f_view","filters.safe":"f_safe","filters.family":"f_family",
    "filters.ent":"f_ent","filters.out":"f_out","filters.park":"f_park"
  };

  /* -----------------
   * 4) lang normalize
   * ----------------- */
  const MAP2 = {zh:'zh',ja:'ja',ko:'ko',tr:'tr',de:'de',es:'es',it:'it',ru:'ru',fr:'fr',en:'en'};
  function normLang(l){ const s=(l||'en').toString().toLowerCase(); const k=s.slice(0,2); return MAP2[k]||'en'; }

  /* ------------------------------
   * 5) dictionary accessor & t(key)
   * ------------------------------ */
  function getPair(lang){
    const L = normLang(lang || localStorage.getItem('sw_lang') || navigator.language || 'en');
    return {
      old: I18N_OLD[L.toUpperCase()] || I18N_OLD[L] || {},
      neo: I18N_NEW[L] || {}
    };
  }

  function t(key, lang){
    const {old, neo} = getPair(lang);
    // a) dotted direct
    if (neo && Object.prototype.hasOwnProperty.call(neo,key)) return neo[key];
    // b) alias to old
    const alias = ALIAS[key];
    if (alias && Object.prototype.hasOwnProperty.call(old, alias)) return old[alias];
    // c) dot → underscore guess
    const us = key.replace(/\./g,'_');
    if (Object.prototype.hasOwnProperty.call(old, us)) return old[us];
    // d) underscore → dotted guess
    const dot = key.replace(/_/g,'.');
    if (Object.prototype.hasOwnProperty.call(neo, dot)) return neo[dot];
    // e) EN fallback
    if (Object.prototype.hasOwnProperty.call(I18N_NEW.en, key)) return I18N_NEW.en[key];
    if (alias && I18N_OLD.EN && Object.prototype.hasOwnProperty.call(I18N_OLD.EN, alias)) return I18N_OLD.EN[alias];
    return key;
  }

  /* ----------------------------
   * 6) DOM applier & public API
   * ---------------------------- */
  function applyLang(lang){
    const code = normLang(lang || localStorage.getItem('sw_lang') || navigator.language || 'en');
    document.documentElement.setAttribute('lang', code);
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n'); const v = t(k, code);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el=>{
      const k = el.getAttribute('data-i18n-title'); const v = t(k, code);
      if (v != null) el.title = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const k = el.getAttribute('data-i18n-placeholder'); const v = t(k, code);
      if (v != null) el.setAttribute('placeholder', v);
    });
  }

  function setLang(code){
    const n = normLang(code).toUpperCase();
    localStorage.setItem('sw_lang', n);
    applyLang(n);
  }

  // Backwards-compat function names (kept for your pages)
  function applyI18NPage(){
    applyLang(localStorage.getItem('sw_lang'));
    const sel = document.getElementById('lang');
    if (sel) sel.value = (localStorage.getItem('sw_lang') || 'EN');
  }
  const applyI18n = applyI18NPage;

  /* -------------
   * 7) export & init
   * ------------- */
  window.I18N_OLD = I18N_OLD;
  window.I18N_NEW = I18N_NEW;
  window.t = t; window.applyLang = applyLang; window.setLang = setLang;
  window.applyI18NPage = applyI18NPage; window.applyI18n = applyI18n;

  document.addEventListener('DOMContentLoaded', ()=>{
    if (!localStorage.getItem('sw_lang')) localStorage.setItem('sw_lang','EN');
    applyLang();
  });
})();
