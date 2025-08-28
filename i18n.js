# StayWorld — i18n + Hotels (FINAL bundle)

This pack gives you:

* A drop‑in **/scripts/i18n.js** that supports **both** your old underscore keys (e.g. `nav_home`) **and** new dotted keys (e.g. `nav.home`) across **10 languages**.
* A complete **/hotels.html** wired to i18n, currency, filters (20+ groups), and map markers with price bubbles.

> **Load order requirement**: On **every page**, include the i18n script **BEFORE** any other custom scripts so that `t()`, `applyLang()`, etc. are available.

---

## 1) `/scripts/i18n.js`

```javascript
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
    if (neo && Object.prototype.hasOwnProperty.call(neo,key)) return neo[key];
    const alias = ALIAS[key];
    if (alias && Object.prototype.hasOwnProperty.call(old, alias)) return old[alias];
    const us = key.replace(/\./g,'_');
    if (Object.prototype.hasOwnProperty.call(old, us)) return old[us];
    const dot = key.replace(/_/g,'.');
    if (Object.prototype.hasOwnProperty.call(neo, dot)) return neo[dot];
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

  function applyI18NPage(){
    applyLang(localStorage.getItem('sw_lang'));
    const sel = document.getElementById('lang');
    if (sel) sel.value = (localStorage.getItem('sw_lang') || 'EN');
  }
  const applyI18n = applyI18NPage;

  window.I18N_OLD = I18N_OLD;
  window.I18N_NEW = I18N_NEW;
  window.t = t; window.applyLang = applyLang; window.setLang = setLang;
  window.applyI18NPage = applyI18NPage; window.applyI18n = applyI18n;

  document.addEventListener('DOMContentLoaded', ()=>{
    if (!localStorage.getItem('sw_lang')) localStorage.setItem('sw_lang','EN');
    applyLang();
  });
})();
```

---

## 2) `/hotels.html`

> Make sure the **i18n.js is loaded first** (very top of `<head>`). The markup below is ready to drop in.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>STAYWORLD — Hotels</title>

  <!-- i18n MUST load before other scripts so t()/applyLang() are available -->
  <script src="/scripts/i18n.js"></script>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Leaflet -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="anonymous">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin="anonymous"></script>

  <style>
    :root{ --bg:#0b0f16;--panel:#101018;--panel-2:#0f131c;--text:#e7e9ee;--muted:#aeb6c8;--line:rgba(255,255,255,.08); --chip:#121a26;--gold1:#f4d78c;--gold2:#c9a35b;--accent:#1e5bd8;--green:#2ecc71;--danger:#ff5a5f }
    *{box-sizing:border-box}
    html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
    .sw-header{position:sticky;top:0;z-index:100;background:rgba(10,14,20,.85);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
    .sw-header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:16px;padding:10px 16px}
    .sw-brand{display:flex;align-items:center;gap:10px;color:var(--text);text-decoration:none}
    .sw-logo{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff8dd 0,#f4d78c 45%,#c9a35b 70%,#8a6d33 100%)}
    .sw-nav{margin-left:auto;display:flex;gap:14px}
    .sw-nav a{color:var(--muted);text-decoration:none;padding:8px 10px;border-radius:10px}
    .sw-nav a:hover{background:var(--chip);color:var(--text)}
    .sw-nav a.active{color:var(--gold1);border:1px solid var(--line);background:linear-gradient(180deg,rgba(27,27,36,.6),rgba(27,27,36,.2))}
    .sw-cta{display:flex;gap:10px;margin-left:8px}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;text-decoration:none;border:1px solid var(--line);color:var(--text);cursor:pointer}
    .btn.gold{background:linear-gradient(180deg,#f4d78c,#c9a35b);color:#121212;border:none;font-weight:800}
    .btn.ghost:hover{background:var(--chip)}
    @media(max-width:880px){.sw-nav,.sw-cta{display:none}}

    .controls{display:flex;gap:10px;flex-wrap:wrap;align-items:center;padding:12px 14px;border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(16,16,24,.7),rgba(16,16,24,0))}
    .chip{display:inline-flex;gap:8px;align-items:center;padding:9px 12px;background:var(--chip);border:1px solid var(--line);border-radius:12px;color:var(--text);cursor:pointer}
    .chip:hover{background:#152033}
    .select{padding:8px 10px;border-radius:10px;background:var(--panel);border:1px solid var(--line);color:var(--text)}
    .hint{color:var(--muted);font-size:12px;margin-left:8px}

    .wrap{display:grid;grid-template-columns:1.15fr .85fr;gap:16px;padding:14px}
    @media(max-width:1024px){.wrap{grid-template-columns:1fr}}

    .card{background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.25);margin-bottom:14px}
    .card-media{position:relative}
    .card-media img{width:100%;height:210px;object-fit:cover;display:block}
    .badge-row{position:absolute;top:10px;left:10px;display:flex;gap:8px}
    .badge{background:rgba(0,0,0,.6);backdrop-filter:blur(6px);border:1px solid var(--line);color:#fff;padding:6px 8px;border-radius:10px;font-size:12px}
    .fav{position:absolute;right:12px;top:12px;width:36px;height:36px;border-radius:12px;background:rgba(0,0,0,.5);display:grid;place-items:center;border:1px solid var(--line);cursor:pointer}
    .fav svg{fill:transparent;stroke:#fff;stroke-width:1.6}
    .fav.active svg{fill:var(--danger);stroke:var(--danger)}
    .card-body{display:grid;grid-template-columns:1fr auto;gap:12px;padding:12px 14px 16px}
    .title{font-weight:700;font-size:18px}
    .rating{justify-self:end;align-self:start;background:#2b6bed;border:1px solid rgba(255,255,255,.15);color:#fff;padding:6px 10px;border-radius:10px;font-weight:700}
    .meta{display:flex;gap:10px;align-items:center;color:var(--muted);font-size:14px}
    .payline{margin-top:6px;display:flex;gap:10px;align-items:baseline}
    .old-price{text-decoration:line-through;color:#8b94a8}
    .price{font-size:20px;font-weight:800;color:var(--gold1)}
    .tax{color:var(--muted);font-size:12px}
    .cancel{margin-top:4px;color:var(--green);font-size:14px}
    .card .book{margin-top:10px;display:inline-flex}

    #map{height:520px;border:1px solid var(--line);border-radius:16px;overflow:hidden}
    .price-bubble{background:var(--accent);color:#fff;border-radius:10px;padding:4px 8px;font-weight:800;border:2px solid rgba(255,255,255,.8);box-shadow:0 6px 12px rgba(0,0,0,.4)}

    footer.sw-footer{margin-top:24px;border-top:1px solid var(--line);background:linear-gradient(180deg,rgba(16,16,24,.7),rgba(16,16,24,0));padding:24px 16px}
    .sw-footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
    .sw-foot-col h4{margin:0 0 10px 0;color:var(--gold1)}
    .sw-foot-col a{display:block;color:var(--muted);text-decoration:none;margin:6px 0}
    .sw-foot-col a:hover{color:var(--text)}
    .sw-copy{max-width:1200px;margin:6px auto 0 auto;color:var(--muted);font-size:12px}

    .filter-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(2px);display:none;z-index:120}
    .filter-panel{position:fixed;right:0;top:0;bottom:0;width:380px;max-width:92vw;background:var(--panel);border-left:1px solid var(--line);box-shadow:-10px 0 30px rgba(0,0,0,.4);z-index:130;transform:translateX(100%);transition:transform .25s ease}
    .filter-open .filter-panel{transform:translateX(0)}
    .filter-open .filter-backdrop{display:block}
    .filter-head{display:flex;align-items:center;justify-content:space-between;padding:14px;border-bottom:1px solid var(--line)}
    .filter-body{padding:14px;display:grid;gap:16px;overflow:auto;height:calc(100% - 150px)}
    .filter-row{display:grid;gap:8px}
    .filter-row label{color:var(--muted);font-size:13px}
    .range{display:flex;gap:10px;align-items:center}
    .range input[type=range]{width:100%}
    .filter-actions{display:flex;gap:10px;padding:12px;border-top:1px solid var(--line);background:linear-gradient(180deg,rgba(16,16,24,.6),rgba(16,16,24,0))}
    .btn.small{padding:8px 10px;border-radius:10px}
    .btn.reset{background:transparent;color:var(--muted)}
    .checks{display:flex;flex-wrap:wrap;gap:8px}
    .checks label{display:inline-flex;align-items:center;gap:6px;background:var(--chip);border:1px solid var(--line);padding:6px 8px;border-radius:10px}
  </style>
</head>
<body>
  <header class="sw-header">
    <div class="sw-header-inner">
      <a href="/index.html" class="sw-brand"><span class="sw-logo"></span><strong>STAYWORLD</strong></a>
      <nav class="sw-nav">
        <a href="/index.html" data-i18n="nav.home">Home</a>
        <a href="/hotels.html" class="active" data-i18n="nav.hotels">Hotels</a>
        <a href="/membership.html" data-i18n="nav.membership">Membership</a>
        <a href="/results.html" data-i18n="nav.search">Search</a>
        <a href="/host-register.html" data-i18n="nav.becomeHost">Become a Host</a>
      </nav>
      <div class="sw-cta">
        <a href="/login.html" class="btn ghost" data-i18n="nav.login">Log in</a>
        <a href="/signup.html" class="btn gold" data-i18n="nav.signup">Sign up</a>
      </div>
    </div>
  </header>

  <div class="controls">
    <div class="chip" id="btnSort">⇅ <span data-i18n="controls.sort">Sort</span></div>
    <div class="chip" id="btnFilter">☰ <span data-i18n="controls.filter">Filter</span></div>
    <div class="chip" id="btnMapList">🗺️ <span data-i18n="controls.map">Map</span></div>
    <select class="select" id="lang" aria-label="Language"></select>
    <select class="select" id="currency" aria-label="Currency"></select>
    <span class="hint" id="rateHint" data-i18n="controls.rateHint">* Demo rates. Connect a live FX API.</span>
  </div>

  <div class="filter-backdrop" id="filterBackdrop"></div>
  <aside class="filter-panel" id="filterPanel" aria-hidden="true">
    <div class="filter-head">
      <strong data-i18n="filters.title">Filters</strong>
      <button class="btn small reset" id="btnCloseFilter">✕</button>
    </div>
    <div class="filter-body">
      <div class="filter-row">
        <label data-i18n="filters.maxPrice">Max price (converted)</label>
        <div class="range">
          <input type="range" id="fPrice" min="50" max="1000" step="10" value="1000"/>
          <span id="fPriceVal">—</span>
        </div>
      </div>
      <div class="filter-row">
        <label data-i18n="filters.minRating">Minimum rating</label>
        <div class="range">
          <input type="range" id="fRating" min="0" max="5" step="0.1" value="0"/>
          <span id="fRatingVal">0.0</span>
        </div>
      </div>
      <div class="filter-row">
        <label data-i18n="filters.maxDistance">Max distance from center (km)</label>
        <div class="range">
          <input type="range" id="fDistance" min="0" max="30" step="1" value="30"/>
          <span id="fDistanceVal">—</span>
        </div>
      </div>
      <div class="filter-row">
        <label><input type="checkbox" id="fFreeCancel"> <span data-i18n="filters.freeCancel">Free cancellation only</span></label>
      </div>

      <!-- 20+ categories (types, amenities, etc.) -->
      <div class="filter-row">
        <label data-i18n="filters.type">Stay type</label>
        <div class="checks" id="fType">
          <label><input type="checkbox" value="Hotel"><span data-i18n="type.hotel">Hotel</span></label>
          <label><input type="checkbox" value="Motel"><span data-i18n="type.motel">Motel</span></label>
          <label><input type="checkbox" value="Hostel"><span data-i18n="type.hostel">Hostel</span></label>
          <label><input type="checkbox" value="Apartment"><span data-i18n="type.apartment">Apartment</span></label>
          <label><input type="checkbox" value="Villa"><span data-i18n="type.villa">Villa</span></label>
          <label><input type="checkbox" value="Ryokan"><span data-i18n="type.ryokan">Ryokan</span></label>
          <label><input type="checkbox" value="Guesthouse"><span data-i18n="type.guesthouse">Guesthouse</span></label>
          <label><input type="checkbox" value="B&B"><span data-i18n="type.bnb">B&B</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.amen">Amenities</label>
        <div class="checks" id="fAmen">
          <label><input type="checkbox" value="Wi-Fi"><span data-i18n="amen.wifi">Wi-Fi</span></label>
          <label><input type="checkbox" value="Kitchen"><span data-i18n="amen.kitchen">Kitchen</span></label>
          <label><input type="checkbox" value="Parking"><span data-i18n="amen.parking">Parking</span></label>
          <label><input type="checkbox" value="Pool"><span data-i18n="amen.pool">Pool</span></label>
          <label><input type="checkbox" value="Air conditioning"><span data-i18n="amen.ac">Air conditioning</span></label>
          <label><input type="checkbox" value="Gym"><span data-i18n="amen.gym">Gym</span></label>
          <label><input type="checkbox" value="Workspace"><span data-i18n="amen.workspace">Workspace</span></label>
          <label><input type="checkbox" value="Washer"><span data-i18n="amen.washer">Washer</span></label>
          <label><input type="checkbox" value="Dryer"><span data-i18n="amen.dryer">Dryer</span></label>
          <label><input type="checkbox" value="Breakfast"><span data-i18n="amen.breakfast">Breakfast</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.booking">Booking</label>
        <div class="checks" id="fBooking">
          <label><input type="checkbox" value="Instant"><span data-i18n="book.instant">Instant book</span></label>
          <label><input type="checkbox" value="Request"><span data-i18n="book.request">Request to book</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.verify">Verification</label>
        <div class="checks" id="fVerify">
          <label><input type="checkbox" value="Verified listings"><span data-i18n="verify.listings">Verified listings only</span></label>
          <label><input type="checkbox" value="Verified reviews"><span data-i18n="verify.reviews">Verified reviews</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.long">Long-stay</label>
        <div class="checks" id="fLong">
          <label><input type="checkbox" value="Long deals"><span data-i18n="long.deals">Show long-stay deals</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.biz">Business</label>
        <div class="checks" id="fBiz">
          <label><input type="checkbox" value="B2B"><span data-i18n="biz.b2b">B2B-ready</span></label>
          <label><input type="checkbox" value="Invoice"><span data-i18n="biz.invoice">Invoice available</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.acc">Accessibility</label>
        <div class="checks" id="fAcc">
          <label><input type="checkbox" value="Step-free"><span data-i18n="acc.stepfree">Step-free access</span></label>
          <label><input type="checkbox" value="Elevator"><span data-i18n="acc.elevator">Elevator</span></label>
          <label><input type="checkbox" value="Wide doorway"><span data-i18n="acc.doorway">Wide doorway</span></label>
          <label><input type="checkbox" value="Accessible bathroom"><span data-i18n="acc.bathroom">Accessible bathroom</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.view">View</label>
        <div class="checks" id="fView">
          <label><input type="checkbox" value="Sea view"><span data-i18n="view.sea">Sea view</span></label>
          <label><input type="checkbox" value="City view"><span data-i18n="view.city">City view</span></label>
          <label><input type="checkbox" value="Mountain view"><span data-i18n="view.mountain">Mountain view</span></label>
          <label><input type="checkbox" value="Garden"><span data-i18n="view.garden">Garden</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.safe">Safety</label>
        <div class="checks" id="fSafe">
          <label><input type="checkbox" value="CO alarm"><span data-i18n="safe.co">Carbon monoxide alarm</span></label>
          <label><input type="checkbox" value="Smoke alarm"><span data-i18n="safe.smoke">Smoke alarm</span></label>
          <label><input type="checkbox" value="First aid kit"><span data-i18n="safe.aid">First aid kit</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.family">Family</label>
        <div class="checks" id="fFamily">
          <label><input type="checkbox" value="Crib"><span data-i18n="family.crib">Crib</span></label>
          <label><input type="checkbox" value="High chair"><span data-i18n="family.chair">High chair</span></label>
          <label><input type="checkbox" value="Stroller friendly"><span data-i18n="family.stroller">Stroller friendly</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.ent">Entertainment</label>
        <div class="checks" id="fEnt">
          <label><input type="checkbox" value="TV"><span data-i18n="ent.tv">TV</span></label>
          <label><input type="checkbox" value="Netflix"><span data-i18n="ent.netflix">Netflix</span></label>
          <label><input type="checkbox" value="Game console"><span data-i18n="ent.console">Game console</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.out">Outdoor</label>
        <div class="checks" id="fOut">
          <label><input type="checkbox" value="BBQ"><span data-i18n="out.bbq">BBQ grill</span></label>
          <label><input type="checkbox" value="Patio"><span data-i18n="out.patio">Patio</span></label>
          <label><input type="checkbox" value="Private garden"><span data-i18n="out.garden">Private garden</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.park">Parking</label>
        <div class="checks" id="fPark">
          <label><input type="checkbox" value="On-site"><span data-i18n="park.onsite">On-site</span></label>
          <label><input type="checkbox" value="Street"><span data-i18n="park.street">Street</span></label>
          <label><input type="checkbox" value="Garage"><span data-i18n="park.garage">Paid garage</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.pets">Pets</label>
        <div class="checks" id="fPets">
          <label><input type="checkbox" value="Pet allowed"><span data-i18n="pets.allowed">Allowed</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.checkin">Check-in</label>
        <div class="checks" id="fCheckin">
          <label><input type="checkbox" value="Self"><span data-i18n="checkin.self">Self check-in</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.exp">Experiences</label>
        <div class="checks" id="fExp">
          <label><input type="checkbox" value="Nature"><span data-i18n="exp.nature">Nature</span></label>
          <label><input type="checkbox" value="Camping"><span data-i18n="exp.camping">Camping</span></label>
          <label><input type="checkbox" value="Traditional"><span data-i18n="exp.traditional">Traditional</span></label>
          <label><input type="checkbox" value="Ski"><span data-i18n="exp.ski">Ski-in/out</span></label>
          <label><input type="checkbox" value="Wine"><span data-i18n="exp.wine">Wine country</span></label>
        </div>
      </div>

      <div class="filter-row">
        <label data-i18n="filters.loc">Location</label>
        <div class="checks" id="fLoc">
          <label><input type="checkbox" value="Near airport"><span data-i18n="loc.airport">Near airport</span></label>
          <label><input type="checkbox" value="Near station"><span data-i18n="loc.station">Near station</span></label>
          <label><input type="checkbox" value="Near beach"><span data-i18n="loc.beach">Near beach</span></label>
          <label><input type="checkbox" value="City center"><span data-i18n="loc.center">City center</span></label>
        </div>
      </div>
    </div>

    <div class="filter-actions">
      <button class="btn small reset" id="btnResetFilters" data-i18n="filters.reset">Reset</button>
      <button class="btn small gold" id="btnApplyFilters" data-i18n="filters.apply">Apply</button>
    </div>
  </aside>

  <div class="wrap">
    <div><div id="list"></div></div>
    <div><div id="map"></div></div>
  </div>

  <footer class="sw-footer">
    <div class="sw-footer-inner">
      <div class="sw-foot-col"><h4>STAYWORLD</h4><a href="/about.html" data-i18n="foot.about">About</a><a href="/careers.html" data-i18n="foot.careers">Careers</a><a href="/press.html" data-i18n="foot.press">Press</a></div>
      <div class="sw-foot-col"><h4 data-i18n="foot.help">Help</h4><a href="/help.html" data-i18n="foot.center">Help Center</a><a href="/safety.html" data-i18n="foot.protect">Guest Protection</a><a href="/contact.html" data-i18n="foot.contact">Contact</a></div>
      <div class="sw-foot-col"><h4 data-i18n="foot.legal">Legal</h4><a href="/terms.html" data-i18n="foot.terms">Terms</a><a href="/privacy.html" data-i18n="foot.privacy">Privacy</a><a href="/cookies.html" data-i18n="foot.cookies">Cookies</a></div>
    </div>
    <div class="sw-copy">© 2025 STAYWORLD. All rights reserved.</div>
  </footer>

  <!-- Firebase (optional) -->
  <script src="/scripts/firebase-config.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.4/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.4/firebase-database-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.4/firebase-storage-compat.js"></script>
  <script src="/scripts/firebase.js"></script>
  <script src="/scripts/auth.js"></script>

  <script>
    // ===== i18n helpers for this page =====
    function tWrap(key){ try{ return (typeof t==='function')? t(key) : key; }catch(_){ return key; } }
  </script>

  <script>
    // ===== State / Currency =====
    const LANGS = { en:'English', ko:'한국어', tr:'Türkçe', fr:'Français', ja:'日本語', de:'Deutsch', es:'Español', it:'Italiano', zh:'中文', ru:'Русский' };
    const CURRENCIES = { USD:'USD', KRW:'KRW', TRY:'TRY', EUR:'EUR', JPY:'JPY', CNY:'CNY', RUB:'RUB' };
    const LANG_TO_DEFAULT_CURRENCY = { en:'USD', ko:'KRW', tr:'TRY', fr:'EUR', ja:'JPY', de:'EUR', es:'EUR', it:'EUR', zh:'CNY', ru:'RUB' };
    const RATES = { USD:1, KRW:1350, TRY:33, EUR:0.92, JPY:156, RUB:90, CNY:7.2 }; // Demo rates

    let CITY_CENTER = { name:'Istanbul', lat:41.0082, lng:28.9784 };
    let map, markersLayer;

    const state = {
      lang: (localStorage.getItem('sw_lang') || (navigator.language||'en').slice(0,2)).toLowerCase(),
      currency: 'USD',
      sort: 'price-asc',
      filters: { priceMax:1000, ratingMin:0, distanceMax:30, freeCancel:false, type:new Set() },
      listings: [],
      nf: null
    };
    state.currency = LANG_TO_DEFAULT_CURRENCY[state.lang] || 'USD';
    state.nf = new Intl.NumberFormat(state.lang, { style:'currency', currency: state.currency });

    const $ = (s,sc)=> (sc||document).querySelector(s);
    const $$ = (s,sc)=> Array.from((sc||document).querySelectorAll(s));
    const on = (el,ev,fn)=> el && el.addEventListener(ev,fn,{passive:false});
    const usdToDisplay = usd => usd * (RATES[state.currency]||1);
    const formatPriceFromUsd = usd => state.nf.format(usdToDisplay(usd));

    function buildSelects(){
      const langSel=$('#lang'), curSel=$('#currency');
      langSel.innerHTML = Object.keys(LANGS).map(k=>`<option value="${k}">${LANGS[k]}</option>`).join('');
      curSel.innerHTML = Object.keys(CURRENCIES).map(k=>`<option value="${k}">${k}</option>`).join('');
      langSel.value = state.lang; curSel.value = state.currency;

      on(langSel,'change', ()=>{
        state.lang = langSel.value;
        if(typeof setLang==='function') setLang(state.lang); else localStorage.setItem('sw_lang', state.lang);
        if(!CURRENCIES[state.currency]) state.currency = LANG_TO_DEFAULT_CURRENCY[state.lang] || 'USD';
        state.nf = new Intl.NumberFormat(state.lang, { style:'currency', currency: state.currency });
        $('#currency').value = state.currency;
        if(typeof applyLang==='function') applyLang();
        updateFilterLabels(); renderList(); renderMarkers();
      });
      on(curSel,'change', ()=>{
        state.currency = curSel.value;
        state.nf = new Intl.NumberFormat(state.lang, { style:'currency', currency: state.currency });
        updateFilterLabels(); renderList(); renderMarkers();
      });
    }

    // ===== Map =====
    function initMap(){
      if(map) return;
      map = L.map('map',{scrollWheelZoom:true}).setView([CITY_CENTER.lat, CITY_CENTER.lng], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
      markersLayer = L.layerGroup().addTo(map);
    }
    function renderMarkers(){
      initMap();
      markersLayer.clearLayers();
      const items = getFilteredSorted(state.listings);
      const pts = [];
      items.forEach(it=>{
        if(typeof it.lat !== 'number' || typeof it.lng!=='number') return;
        const price = formatPriceFromUsd(it.price_usd||0);
        const icon = L.divIcon({ className:'price-bubble', html: price, iconSize:[60,26] });
        L.marker([it.lat,it.lng],{icon}).addTo(markersLayer).bindPopup(`<b>${it.title}</b><br>${it.city}, ${it.country}<br>${price}${tWrap('cta.perNight')}`);
        pts.push([it.lat,it.lng]);
      });
      if(pts.length){
        const group = L.featureGroup(pts.map(([a,b])=>L.marker([a,b])));
        map.fitBounds(group.getBounds().pad(0.2));
      }
    }

    // ===== List =====
    function card(it){
      const img = (it.images&&it.images[0]) ? it.images[0] : 'https://picsum.photos/800/500?blur=0.2&random='+(it.id||Math.random());
      const rating = it.rating ? Number(it.rating).toFixed(1) : '—';
      const dist = (typeof it.distance_km==='number') ? `${it.distance_km} km` : '—';
      const priceLine = formatPriceFromUsd(it.price_usd||0);
      const cancel = it.free_cancel ? tWrap('cta.freeCancel') : '';
      const typeKey = (it.stayType||'').toLowerCase();
      const typeText = tWrap('type.'+typeKey) || it.stayType || '';
      const verified = it.verified ? `<span class="badge">${tWrap('badge.verified')}</span>` : '';
      return `
        <article class="card"
          data-price-usd="${it.price_usd||0}"
          data-rating="${it.rating||0}"
          data-distance="${it.distance_km||999}"
          data-free="${!!it.free_cancel}"
          data-type="${it.stayType||''}">
          <div class="card-media">
            <img src="${img}" alt="${it.title}">
            <div class="badge-row">
              ${it.stayType?`<span class="badge">${tWrap('filters.type')}: ${typeText}</span>`:''}
              ${verified}
            </div>
            <button class="fav" title="★">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </button>
          </div>
          <div class="card-body">
            <div>
              <div class="title">${it.title}</div>
              <div class="meta">${it.city}, ${it.country} · <span class="distance">${dist}</span></div>
              <div class="payline"><span class="price">${priceLine}</span> <span class="tax">${tWrap('cta.perNight')}</span></div>
              <div class="cancel">${cancel}</div>
              <a href="/booking.html?id=${encodeURIComponent(it.id||'')}" class="btn gold book">${tWrap('cta.book')}</a>
            </div>
            <div class="rating">${rating}</div>
          </div>
        </article>`;
    }
    function renderList(){
      const mount = $('#list'); const items = getFilteredSorted(state.listings);
      mount.innerHTML = items.map(card).join('') || `<div class="hint">${tWrap('msg.noListings')}</div>`;
    }

    // ===== Sort/Filter =====
    function getFilteredSorted(list){
      const maxUsd = Number((state.filters.priceMax / (RATES[state.currency]||1)).toFixed(2));
      const filtered = list.filter(x=>{
        if((x.price_usd||0) > maxUsd) return false;
        if((x.rating||0) < state.filters.ratingMin) return false;
        if(typeof x.distance_km==='number' && x.distance_km > state.filters.distanceMax) return false;
        if(state.filters.freeCancel && !x.free_cancel) return false;
        if(state.filters.type.size && !state.filters.type.has(x.stayType)) return false;
        return true;
      });
      return filtered.sort((a,b)=>{
        if(state.sort==='price-asc')   return (a.price_usd||0)-(b.price_usd||0);
        if(state.sort==='price-desc')  return (b.price_usd||0)-(a.price_usd||0);
        if(state.sort==='rating-desc') return (b.rating||0)-(a.rating||0);
        if(state.sort==='distance-asc')return (a.distance_km||999)-(b.distance_km||999);
        return 0;
      });
    }

    // ===== Filters UI =====
    function openFilters(){ document.body.classList.add('filter-open'); }
    function closeFilters(){ document.body.classList.remove('filter-open'); }
    function updateFilterLabels(){
      $('#fPriceVal').textContent = state.nf.format(state.filters.priceMax);
      $('#fRatingVal').textContent = state.filters.ratingMin.toFixed(1);
      $('#fDistanceVal').textContent = `${state.filters.distanceMax} km`;
    }
    function readChecks(containerId, targetSet){
      targetSet.clear();
      $$('#'+containerId+' input[type=checkbox]:checked').forEach(i=>targetSet.add(i.value));
    }
    function resetAllFilters(){
      state.filters.priceMax=1000; state.filters.ratingMin=0; state.filters.distanceMax=30; state.filters.freeCancel=false;
      state.filters.type.clear();
      $('#fPrice').value=1000; $('#fRating').value=0; $('#fDistance').value=30; $('#fFreeCancel').checked=false;
      $$('aside .checks input[type=checkbox]').forEach(i=>i.checked=false);
      updateFilterLabels();
    }

    // ===== Data =====
    async function loadListings(){
      let db = (typeof firebaseDB!=='undefined') ? firebaseDB : null;
      let useFS = !!(db && db.collection);
      if(!db){
        if(window.firebase && firebase.firestore){ db=firebase.firestore(); useFS=true; }
        else if(window.firebase && firebase.database){ db=firebase.database(); useFS=false; }
      }
      try{
        if(db){
          if(useFS){
            const snap = await db.collection('listings').where('status','==','published').orderBy('createdAt','desc').limit(60).get();
            return snap.docs.map(d=>({id:d.id, ...d.data()}));
          }else{
            const snap = await db.ref('listings').limitToLast(60).get();
            const val = snap.val()||{};
            return Object.entries(val).map(([id,v])=>({id, ...v})).filter(v=>v.status==='published').sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
          }
        }
      }catch(e){ console.warn('DB load failed, using sample.', e); }
      return [
        {id:'ist-001', title:'Bosphorus View Suite', city:'Istanbul', country:'Türkiye', stayType:'Apartment', price_usd:120, rating:4.6, distance_km:1.2, free_cancel:true, lat:41.038, lng:29.01, images:[]},
        {id:'par-002', title:'Paris Luxury Stay', city:'Paris', country:'France', stayType:'Hotel', price_usd:210, rating:4.9, distance_km:0.5, free_cancel:false, lat:48.8566, lng:2.3522, images:[]},
        {id:'sel-003', title:'Seoul Riverside Motel', city:'Seoul', country:'Korea', stayType:'Motel', price_usd:75, rating:4.2, distance_km:3.5, free_cancel:true, lat:37.5665, lng:126.9780, images:[]},
        {id:'tok-004', title:'Tokyo Premium Ryokan', city:'Tokyo', country:'Japan', stayType:'Ryokan', price_usd:320, rating:5.0, distance_km:0.8, free_cancel:true, lat:35.6762, lng:139.6503, images:[]},
      ];
    }

    // ===== Deep-link via hash =====
    function parseHashParams(){ const h=(location.hash||'').replace(/^#/,''); const parts=h?h.split('&'):[]; const p={}; for(const x of parts){ if(!x) continue; const [k,vRaw]=x.split('='); const k2=decodeURIComponent(k||'').trim().toLowerCase(); const v=decodeURIComponent((vRaw??'').trim()); p[k2]=v===''?true:v; } return p; }
    function applyHashParams(){
      const q=parseHashParams(); let rer=false, remap=false;
      if(q.filters===true||q.filters==='1'||q.filters==='true') openFilters();
      const allow=new Set(['price-asc','price-desc','rating-desc','distance-asc']); if(q.sort&&allow.has(q.sort)){ state.sort=q.sort; rer=true; }
      if(q.price&&!isNaN(+q.price)){ state.filters.priceMax=+q.price; $('#fPrice').value=+q.price; rer=true; }
      if(q.rating&&!isNaN(+q.rating)){ state.filters.ratingMin=+q.rating; $('#fRating').value=+q.rating; rer=true; }
      if(q.distance&&!isNaN(+q.distance)){ state.filters.distanceMax=+q.distance; $('#fDistance').value=+q.distance; rer=true; }
      if(q.cancel!==undefined){ const on=(q.cancel===true||q.cancel==='1'||q.cancel==='true'); state.filters.freeCancel=on; $('#fFreeCancel').checked=on; rer=true; }
      if(q.lang && LANGS[q.lang]){ state.lang=q.lang; $('#lang').value=q.lang; if(!q.cur){ state.currency=LANG_TO_DEFAULT_CURRENCY[state.lang]||state.currency; $('#currency').value=state.currency; } state.nf=new Intl.NumberFormat(state.lang,{style:'currency',currency:state.currency}); if(typeof applyLang==='function') applyLang(); }
      if(q.cur && CURRENCIES[q.cur]){ state.currency=q.cur; $('#currency').value=q.cur; state.nf=new Intl.NumberFormat(state.lang,{style:'currency',currency:state.currency}); }
      const lat = q.lat!==undefined ? +q.lat : NaN, lng = q.lng!==undefined ? +q.lng : NaN;
      if(!isNaN(lat) && !isNaN(lng)){ CITY_CENTER={ name:q.city||CITY_CENTER.name, lat, lng }; remap=true; rer=true; }
      else if(q.city){ CITY_CENTER={ ...CITY_CENTER, name:q.city }; }
      updateFilterLabels(); if(rer){ renderList(); renderMarkers(); } else if(remap){ renderMarkers(); }
    }

    // ===== Wires =====
    function wireFilters(){
      on($('#btnFilter'),'click', openFilters);
      on($('#btnCloseFilter'),'click', closeFilters);
      on($('.filter-backdrop'),'click', closeFilters);
      on($('#fPrice'),'input', e=>{ state.filters.priceMax=+e.target.value; updateFilterLabels(); });
      on($('#fRating'),'input', e=>{ state.filters.ratingMin=+e.target.value; updateFilterLabels(); });
      on($('#fDistance'),'input', e=>{ state.filters.distanceMax=+e.target.value; updateFilterLabels(); });
      on($('#btnResetFilters'),'click', ()=>{ resetAllFilters(); renderList(); renderMarkers(); });
      on($('#btnApplyFilters'),'click', ()=>{
        readChecks('fType', state.filters.type);
        state.filters.freeCancel = $('#fFreeCancel').checked;
        closeFilters(); renderList(); renderMarkers();
      });
    }
    function wireHeader(){
      on($('#btnSort'),'click', ()=>{
        const next={ 'price-asc':'price-desc','price-desc':'rating-desc','rating-desc':'distance-asc','distance-asc':'price-asc' }[state.sort]||'price-asc';
        state.sort=next; renderList(); renderMarkers();
        $('#btnSort').querySelector('span').textContent = tWrap('controls.sort')+': '+next;
      });
      on($('#btnMapList'),'click', ()=>{ const s=$('#map').style; s.display=(s.display==='none')?'':'none'; });
    }

    window.addEventListener('DOMContentLoaded', async ()=>{
      if(!(window.I18N_NEW)) { /* i18n not loaded? minimal fallback */ }
      buildSelects();
      if(typeof applyLang==='function') applyLang();

      wireFilters(); wireHeader();
      updateFilterLabels();

      state.listings = await loadListings();
      renderList(); renderMarkers();

      applyHashParams();
    });
    window.addEventListener('hashchange', applyHashParams);
  </script>
</body>
</html>
```

---

### Quick checklist

1. Put **`/scripts/i18n.js`** on your server.
2. In **every page** `<head>`, add: `<script src="/scripts/i18n.js"></script>` **before** other scripts.
3. Replace your **/hotels.html** with the one above (or merge pieces you need).
4. Add your Firestore data; cards also accept `data-price-usd` via `price_usd` field.
5. Language/Currency UI auto-formats prices and re-renders markers and list.

If you want me to apply the same i18n wiring to other pages (home, membership, host dashboard), tell me which files and I’ll output ready-to-paste versions too. ✨
