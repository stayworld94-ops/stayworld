// StayWorld i18n — EN/KO/FR/TR/JA/DE/ES/IT/ZH/RU
(function(){
  const LANGS = {
    en:{ // NAV + INDEX
      nav:{home:"Home",deals:"Deals",membership:"Membership",host:"Host",support:"Support"},
      kicker:"Global stays • Verified hosts • Premium design",
      h1:"Luxury stays.<br><span class='gold'>Global reach.</span>",
      pay:"Cards, bank transfer & crypto (BTC · ETH · USDT).",
      filters:"Filters", search:"Search", popular:"Popular:", level:"Level", plus:"StayWorld+ active",
      deals_title:"Verified stays for you",
      level_hint:"Earn points. 60+ days inactive ➝ auto downgrade (−1 level).",
      placeholder:"Paris, Tokyo, Istanbul…",
      auth:{login:"Log in",signup:"Sign up"},

      // MEMBERSHIP
      membership_title:"StayWorld+ Rewards",
      membership_sub:"Higher levels include all benefits of lower levels.",
      level_bronze:"Bronze", bronze_desc:"Basic access granted upon signup.",
      level_silver:"Silver", silver_desc:"3% points on first booking.",
      level_gold:"Gold", gold_desc:"5% points on every booking + priority support.",
      level_platinum:"Platinum", platinum_desc:"7% points + seasonal discounts.",
      level_diamond:"Diamond", diamond_desc:"10% points + exclusive coupons + VIP support.",
      level_elite:"Elite", elite_desc:"15% points + private deals + urgent priority service.",

      // LOGIN
      login_title:"Log in to StayWorld", login_sub:"Welcome back. Access your bookings, points and perks.",
      login_email_label:"Email", login_email_ph:"you@example.com",
      login_password_label:"Password", login_password_ph:"Enter your password",
      login_remember:"Remember me", login_forgot:"Forgot password?", login_btn:"Log in",
      login_to_signup:"No account? Sign up",

      // SIGNUP
      signup_title:"Create your account", signup_sub:"Earn points from day one and unlock rewards.",
      signup_name_label:"Full name", signup_name_ph:"Your name",
      signup_email_label:"Email", signup_email_ph:"you@example.com",
      signup_password_label:"Password", signup_password_ph:"Minimum 8 characters",
      signup_btn:"Sign up", signup_to_login:"Already have an account? Log in",

      // HOST REGISTER
      host_title:"Host with confidence", host_sub:"ID verification required. Listings go live automatically.",
      host_benefits_title:"Benefits",
      host_benefit1:"Instant listing activation",
      host_benefit2:"Secure payments",
      host_benefit3:"AI-powered pricing tips",
      host_benefit4:"24/7 host support",
      host_verify_btn:"Start verification",
      host_register_title:"Register property",
      host_label_title:"Property title",
      host_label_city:"City",
      host_label_type:"Type",
      host_register_btn:"Submit registration"
    },
    ko:{
      nav:{home:"Home",deals:"딜",membership:"멤버십",host:"호스트",support:"지원"},
      kicker:"글로벌 스테이 • 인증된 호스트 • 프리미엄 디자인",
      h1:"럭셔리 스테이.<br><span class='gold'>글로벌 리치.</span>",
      pay:"카드, 계좌이체 & 크립토 (BTC · ETH · USDT).",
      filters:"필터", search:"검색", popular:"인기:", level:"레벨", plus:"StayWorld+ 활성",
      deals_title:"추천 인증 숙소",
      level_hint:"포인트 적립. 60일 이상 미접속 시 자동 강등(−1레벨).",
      placeholder:"파리, 도쿄, 이스탄불…",
      auth:{login:"로그인",signup:"가입"},

      membership_title:"StayWorld+ 리워드",
      membership_sub:"상위 등급은 하위 등급의 모든 혜택을 포함합니다.",
      level_bronze:"브론즈", bronze_desc:"회원가입 시 기본 부여.",
      level_silver:"실버", silver_desc:"첫 예약 시 3% 포인트 적립.",
      level_gold:"골드", gold_desc:"매 예약 5% 적립 + 우선 응대.",
      level_platinum:"플래티넘", platinum_desc:"7% 적립 + 시즌 할인.",
      level_diamond:"다이아몬드", diamond_desc:"10% 적립 + 전용 쿠폰 + VIP 지원.",
      level_elite:"엘리트", elite_desc:"15% 적립 + 프라이빗 딜 + 긴급 우선 처리.",

      login_title:"StayWorld 로그인", login_sub:"다시 오신 걸 환영합니다. 예약·포인트·혜택을 확인하세요.",
      login_email_label:"이메일", login_email_ph:"you@example.com",
      login_password_label:"비밀번호", login_password_ph:"비밀번호를 입력하세요",
      login_remember:"자동 로그인", login_forgot:"비밀번호 찾기", login_btn:"로그인",
      login_to_signup:"계정이 없나요? 가입하기",

      signup_title:"계정 만들기", signup_sub:"첫날부터 포인트 적립, 리워드 해제.",
      signup_name_label:"이름", signup_name_ph:"이름을 입력",
      signup_email_label:"이메일", signup_email_ph:"you@example.com",
      signup_password_label:"비밀번호", signup_password_ph:"최소 8자",
      signup_btn:"가입", signup_to_login:"이미 계정이 있나요? 로그인",

      host_title:"신뢰할 수 있는 호스팅",
      host_sub:"신원 인증 필요. 등록 즉시 자동 게재.",
      host_benefits_title:"혜택",
      host_benefit1:"즉시 게재",
      host_benefit2:"안전한 결제",
      host_benefit3:"AI 요금 제안",
      host_benefit4:"24/7 호스트 지원",
      host_verify_btn:"인증 시작",
      host_register_title:"숙소 등록",
      host_label_title:"숙소 제목",
      host_label_city:"도시",
      host_label_type:"유형",
      host_register_btn:"등록 제출"
    },
    fr:{
      nav:{home:"Accueil",deals:"Offres",membership:"Adhésion",host:"Hôte",support:"Assistance"},
      kicker:"Séjours mondiaux • Hôtes vérifiés • Design premium",
      h1:"Séjours de luxe.<br><span class='gold'>Portée mondiale.</span>",
      pay:"Cartes, virement & crypto (BTC · ETH · USDT).",
      filters:"Filtres", search:"Rechercher", popular:"Populaire :", level:"Niveau", plus:"StayWorld+ actif",
      deals_title:"Séjours vérifiés pour vous",
      level_hint:"Gagnez des points. 60+ jours inactif ➝ rétrogradation (−1).",
      placeholder:"Paris, Tokyo, Istanbul…",
      auth:{login:"Connexion",signup:"S’inscrire"},

      membership_title:"Récompenses StayWorld+",
      membership_sub:"Les niveaux supérieurs incluent tous les avantages des niveaux inférieurs.",
      level_bronze:"Bronze", bronze_desc:"Accès de base à l’inscription.",
      level_silver:"Argent", silver_desc:"3% de points à la première réservation.",
      level_gold:"Or", gold_desc:"5% de points par réservation + support prioritaire.",
      level_platinum:"Platine", platinum_desc:"7% de points + réductions saisonnières.",
      level_diamond:"Diamant", diamond_desc:"10% de points + coupons exclusifs + support VIP.",
      level_elite:"Élite", elite_desc:"15% de points + offres privées + service urgent prioritaire.",

      login_title:"Connexion à StayWorld", login_sub:"Ravi de vous revoir. Accédez à vos réservations, points et avantages.",
      login_email_label:"E-mail", login_email_ph:"vous@exemple.com",
      login_password_label:"Mot de passe", login_password_ph:"Entrez votre mot de passe",
      login_remember:"Se souvenir de moi", login_forgot:"Mot de passe oublié ?", login_btn:"Se connecter",
      login_to_signup:"Pas de compte ? Inscrivez-vous",

      signup_title:"Créez votre compte", signup_sub:"Gagnez des points dès le premier jour.",
      signup_name_label:"Nom complet", signup_name_ph:"Votre nom",
      signup_email_label:"E-mail", signup_email_ph:"vous@exemple.com",
      signup_password_label:"Mot de passe", signup_password_ph:"Au moins 8 caractères",
      signup_btn:"S’inscrire", signup_to_login:"Vous avez déjà un compte ? Connectez-vous",

      host_title:"Hébergez en toute confiance", host_sub:"Vérification d’identité requise. Mise en ligne automatique.",
      host_benefits_title:"Avantages",
      host_benefit1:"Activation instantanée",
      host_benefit2:"Paiements sécurisés",
      host_benefit3:"Conseils tarifaires par IA",
      host_benefit4:"Support hôte 24/7",
      host_verify_btn:"Démarrer la vérification",
      host_register_title:"Enregistrer un bien",
      host_label_title:"Titre de l’hébergement",
      host_label_city:"Ville",
      host_label_type:"Type",
      host_register_btn:"Envoyer l’inscription"
    },
    tr:{
      nav:{home:"Ana sayfa",deals:"Fırsatlar",membership:"Üyelik",host:"Ev Sahibi",support:"Destek"},
      kicker:"Küresel konaklamalar • Doğrulanmış ev sahipleri • Premium tasarım",
      h1:"Lüks konaklamalar.<br><span class='gold'>Küresel erişim.</span>",
      pay:"Kart, havale & kripto (BTC · ETH · USDT).",
      filters:"Filtreler", search:"Ara", popular:"Popüler:", level:"Seviye", plus:"StayWorld+ aktif",
      deals_title:"Sizin için doğrulanmış konaklamalar",
      level_hint:"Puan kazanın. 60+ gün pasif ➝ otomatik düşürme (−1).",
      placeholder:"Paris, Tokyo, İstanbul…",
      auth:{login:"Giriş",signup:"Kaydol"},

      membership_title:"StayWorld+ Ödülleri",
      membership_sub:"Üst seviyeler, alt seviyelerin tüm avantajlarını içerir.",
      level_bronze:"Bronz", bronze_desc:"Kayıtla birlikte temel erişim.",
      level_silver:"Gümüş", silver_desc:"İlk rezervasyonda %3 puan.",
      level_gold:"Altın", gold_desc:"Her rezervasyonda %5 puan + öncelikli destek.",
      level_platinum:"Platin", platinum_desc:"%7 puan + sezon indirimleri.",
      level_diamond:"Elmas", diamond_desc:"%10 puan + özel kuponlar + VIP destek.",
      level_elite:"Elit", elite_desc:"%15 puan + özel fırsatlar + acil öncelikli hizmet.",

      login_title:"StayWorld Giriş", login_sub:"Tekrar hoş geldiniz. Rezervasyon ve puanlarınıza erişin.",
      login_email_label:"E-posta", login_email_ph:"siz@ornek.com",
      login_password_label:"Şifre", login_password_ph:"Şifrenizi girin",
      login_remember:"Beni hatırla", login_forgot:"Şifremi unuttum", login_btn:"Giriş",
      login_to_signup:"Hesabınız yok mu? Kaydolun",

      signup_title:"Hesap oluştur", signup_sub:"İlk günden puan kazanın.",
      signup_name_label:"Ad Soyad", signup_name_ph:"Adınız",
      signup_email_label:"E-posta", signup_email_ph:"siz@ornek.com",
      signup_password_label:"Şifre", signup_password_ph:"En az 8 karakter",
      signup_btn:"Kaydol", signup_to_login:"Zaten hesabınız var mı? Giriş yapın",

      host_title:"Güvenle ev sahipliği yapın", host_sub:"Kimlik doğrulaması gerekir. İlanlar otomatik yayına girer.",
      host_benefits_title:"Avantajlar",
      host_benefit1:"Anında ilan yayını",
      host_benefit2:"Güvenli ödemeler",
      host_benefit3:"YZ tabanlı fiyat önerileri",
      host_benefit4:"7/24 ev sahibi desteği",
      host_verify_btn:"Doğrulamayı başlat",
      host_register_title:"İlan kaydı",
      host_label_title:"İlan başlığı",
      host_label_city:"Şehir",
      host_label_type:"Tür",
      host_register_btn:"Kaydı gönder"
    },
    ja:{
      nav:{home:"ホーム",deals:"お得情報",membership:"メンバーシップ",host:"ホスト",support:"サポート"},
      kicker:"世界の滞在先 • 認証ホスト • プレミアムデザイン",
      h1:"ラグジュアリーな滞在。<br><span class='gold'>グローバルに。</span>",
      pay:"カード・振込・暗号資産 (BTC · ETH · USDT)。",
      filters:"フィルター", search:"検索", popular:"人気:", level:"レベル", plus:"StayWorld+ 有効",
      deals_title:"あなたへの認証済みステイ",
      level_hint:"ポイント獲得。60日以上の非アクティブで自動降格(−1)。",
      placeholder:"パリ、東京、イスタンブール…",
      auth:{login:"ログイン",signup:"登録"},

      membership_title:"StayWorld+ リワード",
      membership_sub:"上位レベルは下位レベルの全特典を含みます。",
      level_bronze:"ブロンズ", bronze_desc:"登録時に基本アクセス付与。",
      level_silver:"シルバー", silver_desc:"初回予約で3%ポイント。",
      level_gold:"ゴールド", gold_desc:"毎回の予約で5%ポイント + 優先サポート。",
      level_platinum:"プラチナ", platinum_desc:"7%ポイント + シーズン割引。",
      level_diamond:"ダイヤモンド", diamond_desc:"10%ポイント + 限定クーポン + VIPサポート。",
      level_elite:"エリート", elite_desc:"15%ポイント + プライベートディール + 緊急優先サービス。",

      login_title:"StayWorld にログイン", login_sub:"お帰りなさい。予約・ポイント・特典へアクセス。",
      login_email_label:"メール", login_email_ph:"あなた@example.com",
      login_password_label:"パスワード", login_password_ph:"パスワードを入力",
      login_remember:"ログイン情報を保持", login_forgot:"パスワードをお忘れですか？", login_btn:"ログイン",
      login_to_signup:"アカウント未作成？ 新規登録",

      signup_title:"アカウント作成", signup_sub:"初日からポイントを獲得。",
      signup_name_label:"氏名", signup_name_ph:"お名前",
      signup_email_label:"メール", signup_email_ph:"あなた@example.com",
      signup_password_label:"パスワード", signup_password_ph:"8文字以上",
      signup_btn:"登録", signup_to_login:"すでにアカウントがありますか？ ログイン",

      host_title:"安心してホスティング", host_sub:"本人確認が必要。掲載は自動で公開。",
      host_benefits_title:"特典",
      host_benefit1:"即時掲載",
      host_benefit2:"安全な決済",
      host_benefit3:"AI料金アドバイス",
      host_benefit4:"24時間365日サポート",
      host_verify_btn:"認証を開始",
      host_register_title:"物件登録",
      host_label_title:"物件名",
      host_label_city:"都市",
      host_label_type:"タイプ",
      host_register_btn:"登録を送信"
    },
    de:{
      nav:{home:"Start",deals:"Angebote",membership:"Mitgliedschaft",host:"Gastgeber",support:"Support"},
      kicker:"Weltweite Aufenthalte • Verifizierte Gastgeber • Premium-Design",
      h1:"Luxuriöse Aufenthalte.<br><span class='gold'>Weltweite Reichweite.</span>",
      pay:"Karten, Überweisung & Krypto (BTC · ETH · USDT).",
      filters:"Filter", search:"Suchen", popular:"Beliebt:", level:"Level", plus:"StayWorld+ aktiv",
      deals_title:"Verifizierte Unterkünfte für dich",
      level_hint:"Punkte sammeln. 60+ Tage inaktiv ➝ Auto-Downgrade (−1).",
      placeholder:"Paris, Tokio, Istanbul…",
      auth:{login:"Anmelden",signup:"Registrieren"},

      membership_title:"StayWorld+ Prämien",
      membership_sub:"Höhere Stufen enthalten alle Vorteile der niedrigeren.",
      level_bronze:"Bronze", bronze_desc:"Grundzugang bei Registrierung.",
      level_silver:"Silber", silver_desc:"3 % Punkte bei der ersten Buchung.",
      level_gold:"Gold", gold_desc:"5 % Punkte pro Buchung + priorisierter Support.",
      level_platinum:"Platin", platinum_desc:"7 % Punkte + saisonale Rabatte.",
      level_diamond:"Diamant", diamond_desc:"10 % Punkte + exklusive Coupons + VIP-Support.",
      level_elite:"Elite", elite_desc:"15 % Punkte + private Angebote + dringender Premium-Service.",

      login_title:"Bei StayWorld anmelden", login_sub:"Willkommen zurück – auf Buchungen, Punkte & Vorteile zugreifen.",
      login_email_label:"E-Mail", login_email_ph:"du@beispiel.de",
      login_password_label:"Passwort", login_password_ph:"Passwort eingeben",
      login_remember:"Angemeldet bleiben", login_forgot:"Passwort vergessen?", login_btn:"Anmelden",
      login_to_signup:"Noch kein Konto? Registrieren",

      signup_title:"Konto erstellen", signup_sub:"Sammle ab dem ersten Tag Punkte.",
      signup_name_label:"Vollständiger Name", signup_name_ph:"Dein Name",
      signup_email_label:"E-Mail", signup_email_ph:"du@beispiel.de",
      signup_password_label:"Passwort", signup_password_ph:"Mindestens 8 Zeichen",
      signup_btn:"Registrieren", signup_to_login:"Schon ein Konto? Anmelden",

      host_title:"Mit Vertrauen hosten", host_sub:"ID-Verifizierung erforderlich. Listings gehen automatisch live.",
      host_benefits_title:"Vorteile",
      host_benefit1:"Sofortige Aktivierung",
      host_benefit2:"Sichere Zahlungen",
      host_benefit3:"KI-gestützte Preis-Tipps",
      host_benefit4:"24/7-Host-Support",
      host_verify_btn:"Verifizierung starten",
      host_register_title:"Unterkunft registrieren",
      host_label_title:"Titel der Unterkunft",
      host_label_city:"Stadt",
      host_label_type:"Typ",
      host_register_btn:"Registrierung senden"
    },
    es:{
      nav:{home:"Inicio",deals:"Ofertas",membership:"Membresía",host:"Anfitrión",support:"Soporte"},
      kicker:"Estancias globales • Anfitriones verificados • Diseño premium",
      h1:"Estancias de lujo.<br><span class='gold'>Alcance global.</span>",
      pay:"Tarjetas, transferencia y cripto (BTC · ETH · USDT).",
      filters:"Filtros", search:"Buscar", popular:"Popular:", level:"Nivel", plus:"StayWorld+ activo",
      deals_title:"Estancias verificadas para ti",
      level_hint:"Gana puntos. 60+ días inactivo ➝ degradación automática (−1).",
      placeholder:"París, Tokio, Estambul…",
      auth:{login:"Entrar",signup:"Registrarse"},

      membership_title:"Recompensas StayWorld+",
      membership_sub:"Los niveles superiores incluyen todos los beneficios de los inferiores.",
      level_bronze:"Bronce", bronze_desc:"Acceso básico al registrarte.",
      level_silver:"Plata", silver_desc:"3% de puntos en la primera reserva.",
      level_gold:"Oro", gold_desc:"5% de puntos por reserva + soporte prioritario.",
      level_platinum:"Platino", platinum_desc:"7% de puntos + descuentos de temporada.",
      level_diamond:"Diamante", diamond_desc:"10% de puntos + cupones exclusivos + soporte VIP.",
      level_elite:"Élite", elite_desc:"15% de puntos + ofertas privadas + servicio urgente prioritario.",

      login_title:"Inicia sesión en StayWorld", login_sub:"Bienvenido de nuevo: accede a reservas, puntos y beneficios.",
      login_email_label:"Correo", login_email_ph:"tú@ejemplo.com",
      login_password_label:"Contraseña", login_password_ph:"Escribe tu contraseña",
      login_remember:"Recordarme", login_forgot:"¿Olvidaste la contraseña?", login_btn:"Entrar",
      login_to_signup:"¿Sin cuenta? Regístrate",

      signup_title:"Crea tu cuenta", signup_sub:"Gana puntos desde el primer día.",
      signup_name_label:"Nombre completo", signup_name_ph:"Tu nombre",
      signup_email_label:"Correo", signup_email_ph:"tú@ejemplo.com",
      signup_password_label:"Contraseña", signup_password_ph:"Mínimo 8 caracteres",
      signup_btn:"Registrarse", signup_to_login:"¿Ya tienes cuenta? Inicia sesión",

      host_title:"Anfitriona con confianza", host_sub:"Se requiere verificación de identidad. Publicación automática.",
      host_benefits_title:"Beneficios",
      host_benefit1:"Activación instantánea",
      host_benefit2:"Pagos seguros",
      host_benefit3:"Consejos de precios con IA",
      host_benefit4:"Soporte 24/7",
      host_verify_btn:"Iniciar verificación",
      host_register_title:"Registrar propiedad",
      host_label_title:"Título de la propiedad",
      host_label_city:"Ciudad",
      host_label_type:"Tipo",
      host_register_btn:"Enviar registro"
    },
    it:{
      nav:{home:"Home",deals:"Offerte",membership:"Abbonamento",host:"Host",support:"Supporto"},
      kicker:"Soggiorni globali • Host verificati • Design premium",
      h1:"Soggiorni di lusso.<br><span class='gold'>Portata globale.</span>",
      pay:"Carte, bonifico e crypto (BTC · ETH · USDT).",
      filters:"Filtri", search:"Cerca", popular:"Popolari:", level:"Livello", plus:"StayWorld+ attivo",
      deals_title:"Soggiorni verificati per te",
      level_hint:"Guadagna punti. 60+ giorni inattivo ➝ retrocessione automatica (−1).",
      placeholder:"Parigi, Tokyo, Istanbul…",
      auth:{login:"Accedi",signup:"Registrati"},

      membership_title:"Premi StayWorld+",
      membership_sub:"I livelli superiori includono tutti i vantaggi di quelli inferiori.",
      level_bronze:"Bronzo", bronze_desc:"Accesso di base alla registrazione.",
      level_silver:"Argento", silver_desc:"3% punti alla prima prenotazione.",
      level_gold:"Oro", gold_desc:"5% punti a prenotazione + supporto prioritario.",
      level_platinum:"Platino", platinum_desc:"7% punti + sconti stagionali.",
      level_diamond:"Diamante", diamond_desc:"10% punti + coupon esclusivi + supporto VIP.",
      level_elite:"Elite", elite_desc:"15% punti + offerte private + servizio urgente prioritario.",

      login_title:"Accedi a StayWorld", login_sub:"Bentornato. Accedi a prenotazioni, punti e vantaggi.",
      login_email_label:"Email", login_email_ph:"tu@esempio.com",
      login_password_label:"Password", login_password_ph:"Inserisci la password",
      login_remember:"Ricordami", login_forgot:"Password dimenticata?", login_btn:"Accedi",
      login_to_signup:"Non hai un account? Registrati",

      signup_title:"Crea il tuo account", signup_sub:"Guadagna punti dal primo giorno.",
      signup_name_label:"Nome e cognome", signup_name_ph:"Il tuo nome",
      signup_email_label:"Email", signup_email_ph:"tu@esempio.com",
      signup_password_label:"Password", signup_password_ph:"Minimo 8 caratteri",
      signup_btn:"Registrati", signup_to_login:"Hai già un account? Accedi",

      host_title:"Ospita in tutta sicurezza", host_sub:"Verifica ID richiesta. Pubblicazione automatica.",
      host_benefits_title:"Vantaggi",
      host_benefit1:"Attivazione immediata",
      host_benefit2:"Pagamenti sicuri",
      host_benefit3:"Suggerimenti di prezzo IA",
      host_benefit4:"Supporto 24/7",
      host_verify_btn:"Avvia verifica",
      host_register_title:"Registra proprietà",
      host_label_title:"Titolo proprietà",
      host_label_city:"Città",
      host_label_type:"Tipo",
      host_register_btn:"Invia registrazione"
    },
    zh:{
      nav:{home:"首页",deals:"优惠",membership:"会员",host:"房东",support:"支持"},
      kicker:"全球住宿 • 认证房东 • 高端设计",
      h1:"奢华住宿。<br><span class='gold'>全球触达。</span>",
      pay:"支持银行卡、转账与加密货币 (BTC · ETH · USDT)。",
      filters:"筛选", search:"搜索", popular:"热门：", level:"等级", plus:"StayWorld+ 已启用",
      deals_title:"为你精选的认证住宿",
      level_hint:"赚取积分。60+ 天不活跃 ➝ 自动降级（−1）。",
      placeholder:"巴黎、东京、伊斯坦布尔…",
      auth:{login:"登录",signup:"注册"},

      membership_title:"StayWorld+ 奖励",
      membership_sub:"更高级别包含低级别的所有福利。",
      level_bronze:"青铜", bronze_desc:"注册后获得基本访问。",
      level_silver:"白银", silver_desc:"首次预订 3% 积分。",
      level_gold:"黄金", gold_desc:"每次预订 5% 积分 + 优先支持。",
      level_platinum:"白金", platinum_desc:"7% 积分 + 季节性折扣。",
      level_diamond:"钻石", diamond_desc:"10% 积分 + 独家优惠券 + VIP 支持。",
      level_elite:"精英", elite_desc:"15% 积分 + 私享优惠 + 紧急优先服务。",

      login_title:"登录 StayWorld", login_sub:"欢迎回来。访问预订、积分与权益。",
      login_email_label:"邮箱", login_email_ph:"you@example.com",
      login_password_label:"密码", login_password_ph:"请输入密码",
      login_remember:"记住我", login_forgot:"忘记密码？", login_btn:"登录",
      login_to_signup:"没有账号？立即注册",

      signup_title:"创建账户", signup_sub:"从第一天开始赚取积分。",
      signup_name_label:"姓名", signup_name_ph:"你的名字",
      signup_email_label:"邮箱", signup_email_ph:"you@example.com",
      signup_password_label:"密码", signup_password_ph:"至少 8 个字符",
      signup_btn:"注册", signup_to_login:"已有账号？去登录",

      host_title:"放心成为房东", host_sub:"需要身份验证。房源自动上线。",
      host_benefits_title:"优势",
      host_benefit1:"即时上线",
      host_benefit2:"安全支付",
      host_benefit3:"AI 定价建议",
      host_benefit4:"7×24 小时支持",
      host_verify_btn:"开始验证",
      host_register_title:"注册房源",
      host_label_title:"房源标题",
      host_label_city:"城市",
      host_label_type:"类型",
      host_register_btn:"提交注册"
    },
    ru:{
      nav:{home:"Главная",deals:"Акции",membership:"Членство",host:"Хост",support:"Поддержка"},
      kicker:"Мировые размещения • Проверенные хосты • Премиум-дизайн",
      h1:"Роскошное проживание.<br><span class='gold'>Глобальный охват.</span>",
      pay:"Карты, банковский перевод и крипто (BTC · ETH · USDT).",
      filters:"Фильтры", search:"Поиск", popular:"Популярное:", level:"Уровень", plus:"StayWorld+ активен",
      deals_title:"Проверенные предложения для вас",
      level_hint:"Копите баллы. 60+ дней неактивности ➝ понижение (−1).",
      placeholder:"Париж, Токио, Стамбул…",
      auth:{login:"Войти",signup:"Регистрация"},

      membership_title:"Награды StayWorld+",
      membership_sub:"Высшие уровни включают все преимущества нижних.",
      level_bronze:"Бронза", bronze_desc:"Базовый доступ при регистрации.",
      level_silver:"Серебро", silver_desc:"3% баллов при первом бронировании.",
      level_gold:"Золото", gold_desc:"5% баллов за каждое бронирование + приоритетная поддержка.",
      level_platinum:"Платина", platinum_desc:"7% баллов + сезонные скидки.",
      level_diamond:"Бриллиант", diamond_desc:"10% баллов + эксклюзивные купоны + VIP поддержка.",
      level_elite:"Элита", elite_desc:"15% баллов + приватные предложения + срочный приоритетный сервис.",

      login_title:"Вход в StayWorld", login_sub:"С возвращением. Доступ к бронированиям, баллам и привилегиям.",
      login_email_label:"Email", login_email_ph:"you@example.com",
      login_password_label:"Пароль", login_password_ph:"Введите пароль",
      login_remember:"Запомнить меня", login_forgot:"Забыли пароль?", login_btn:"Войти",
      login_to_signup:"Нет аккаунта? Зарегистрируйтесь",

      signup_title:"Создать аккаунт", signup_sub:"Получайте баллы с первого дня.",
      signup_name_label:"Полное имя", signup_name_ph:"Ваше имя",
      signup_email_label:"Email", signup_email_ph:"you@example.com",
      signup_password_label:"Пароль", signup_password_ph:"Минимум 8 символов",
      signup_btn:"Зарегистрироваться", signup_to_login:"Уже есть аккаунт? Войдите",

      host_title:"Хостинг с уверенностью", host_sub:"Требуется проверка личности. Объявления публикуются автоматически.",
      host_benefits_title:"Преимущества",
      host_benefit1:"Мгновенная публикация",
      host_benefit2:"Безопасные платежи",
      host_benefit3:"Рекомендации цен на базе ИИ",
      host_benefit4:"Круглосуточная поддержка",
      host_verify_btn:"Начать проверку",
      host_register_title:"Зарегистрировать объект",
      host_label_title:"Название объекта",
      host_label_city:"Город",
      host_label_type:"Тип",
      host_register_btn:"Отправить регистрацию"
    }
  };

  // --- Apply language to elements ---
  function setHTML(id, html){ const el=document.getElementById(id); if(el) el.innerHTML = html; }
  function setText(id, txt){ const el=document.getElementById(id); if(el) el.textContent = txt; }
  function setPH(id, ph){ const el=document.getElementById(id); if(el && 'placeholder' in el) el.placeholder = ph; }

  function applyLang(code){
    const t = LANGS[code] || LANGS.en;

    // INDEX / NAV
    setHTML("t_kicker", t.kicker);
    setHTML("t_h1", t.h1);
    setHTML("t_pay", t.pay);
    setText("t_filters", t.filters);
    setText("t_search", t.search);
    setText("t_popular", t.popular);
    setText("t_level", t.level);
    setText("t_plus", t.plus);
    setText("t_deals_title", t.deals_title);
    setText("t_level_hint", t.level_hint);
    const si = document.getElementById("searchInput"); if (si) si.placeholder = t.placeholder;

    // NAV + auth (for pages that have them)
    setText("t_nav_home", t.nav?.home);
    setText("t_nav_deals", t.nav?.deals);
    setText("t_nav_membership", t.nav?.membership);
    setText("t_nav_host", t.nav?.host);
    setText("t_nav_support", t.nav?.support);
    setText("loginBtn", t.auth?.login);
    setText("signupBtn", t.auth?.signup);

    // MEMBERSHIP
    setText("t_membership_title", t.membership_title);
    setText("t_membership_sub", t.membership_sub);
    setText("t_level_bronze", t.level_bronze);
    setText("t_bronze_desc", t.bronze_desc);
    setText("t_level_silver", t.level_silver);
    setText("t_silver_desc", t.silver_desc);
    setText("t_level_gold", t.level_gold);
    setText("t_gold_desc", t.gold_desc);
    setText("t_level_platinum", t.level_platinum);
    setText("t_platinum_desc", t.platinum_desc);
    setText("t_level_diamond", t.level_diamond);
    setText("t_diamond_desc", t.diamond_desc);
    setText("t_level_elite", t.level_elite);
    setText("t_elite_desc", t.elite_desc);

    // LOGIN
    setText("t_login_title", t.login_title);
    setText("t_login_sub", t.login_sub);
    setText("t_login_email_label", t.login_email_label);
    setPH("i_login_email", t.login_email_ph);
    setText("t_login_password_label", t.login_password_label);
    setPH("i_login_password", t.login_password_ph);
    setText("t_login_remember", t.login_remember);
    setText("t_login_forgot", t.login_forgot);
    setText("t_login_btn", t.login_btn);
    setText("t_login_to_signup", t.login_to_signup);

    // SIGNUP
    setText("t_signup_title", t.signup_title);
    setText("t_signup_sub", t.signup_sub);
    setText("t_signup_name_label", t.signup_name_label);
    setPH("i_signup_name", t.signup_name_ph);
    setText("t_signup_email_label", t.signup_email_label);
    setPH("i_signup_email", t.signup_email_ph);
    setText("t_signup_password_label", t.signup_password_label);
    setPH("i_signup_password", t.signup_password_ph);
    setText("t_signup_btn", t.signup_btn);
    setText("t_signup_to_login", t.signup_to_login);

    // HOST REGISTER
    setText("t_host_title", t.host_title);
    setText("t_host_sub", t.host_sub);
    setText("t_host_benefits_title", t.host_benefits_title);
    setText("t_host_benefit1", t.host_benefit1);
    setText("t_host_benefit2", t.host_benefit2);
    setText("t_host_benefit3", t.host_benefit3);
    setText("t_host_benefit4", t.host_benefit4);
    setText("t_host_verify_btn", t.host_verify_btn);
    setText("t_host_register_title", t.host_register_title);
    setText("t_host_label_title", t.host_label_title);
    setText("t_host_label_city", t.host_label_city);
    setText("t_host_label_type", t.host_label_type);
    setText("t_host_register_btn", t.host_register_btn);
  }

  // Init & persist
  function initI18n(){
    const sel = document.getElementById("langSelect");
    const saved = localStorage.getItem("sw_lang") || (navigator.language||"en").slice(0,2).toLowerCase();
    const final = LANGS[saved] ? saved : "en";
    if (sel){ sel.value = final; sel.addEventListener("change", e=>{ const v=e.target.value; localStorage.setItem("sw_lang", v); applyLang(v); }); }
    applyLang(final);
  }

  window.StayWorldI18n = { applyLang };
  document.addEventListener("DOMContentLoaded", initI18n);
})();
