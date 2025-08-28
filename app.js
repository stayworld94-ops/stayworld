/* =============== i18n CORE (inline, drop at top of app.js / hotels.js) =============== */
(function(){
  // 10 languages dictionary
  const DICT = {
    en:{
      "nav.home":"Home","nav.hotels":"Hotels","nav.membership":"Membership","nav.search":"Search","nav.becomeHost":"Become a Host",
      "nav.login":"Log in","nav.signup":"Sign up",
      "controls.sort":"Sort","controls.filter":"Filter","controls.map":"Map",
      "controls.rateHint":"* Demo rates. Connect a live FX API.",
      "filters.title":"Filters","filters.maxPrice":"Max price (converted)","filters.minRating":"Minimum rating",
      "filters.maxDistance":"Max distance from center (km)","filters.freeCancel":"Free cancellation only",
      "filters.type":"Stay type","filters.amen":"Amenities","filters.booking":"Booking","filters.verify":"Verification",
      "filters.long":"Long-stay","filters.biz":"Business","filters.acc":"Accessibility","filters.view":"View","filters.safe":"Safety",
      "filters.family":"Family","filters.ent":"Entertainment","filters.out":"Outdoor","filters.park":"Parking",
      "filters.pets":"Pets","filters.checkin":"Check-in","filters.exp":"Experiences","filters.loc":"Location",
      "filters.reset":"Reset","filters.apply":"Apply",
      "type.hotel":"Hotel","type.motel":"Motel","type.hostel":"Hostel","type.apartment":"Apartment","type.villa":"Villa",
      "type.ryokan":"Ryokan","type.guesthouse":"Guesthouse","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"Kitchen","amen.parking":"Parking","amen.pool":"Pool","amen.ac":"Air conditioning",
      "amen.gym":"Gym","amen.workspace":"Workspace","amen.washer":"Washer","amen.dryer":"Dryer","amen.breakfast":"Breakfast",
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
      "foot.about":"About","foot.careers":"Careers","foot.press":"Press","foot.help":"Help","foot.center":"Help Center",
      "foot.protect":"Guest Protection","foot.contact":"Contact","foot.legal":"Legal","foot.terms":"Terms",
      "foot.privacy":"Privacy","foot.cookies":"Cookies",
      "buttons.book":"Book","labels.perNight":"/ night","labels.from":"From","labels.night":"night"
    },
    ko:{
      "nav.home":"홈","nav.hotels":"숙소","nav.membership":"멤버십","nav.search":"검색","nav.becomeHost":"호스트 되기",
      "nav.login":"로그인","nav.signup":"가입하기",
      "controls.sort":"정렬","controls.filter":"필터","controls.map":"지도",
      "controls.rateHint":"* 데모 환율입니다. 운영 시 환율 API를 연결하세요.",
      "filters.title":"필터","filters.maxPrice":"최대 가격(환산)","filters.minRating":"최소 평점",
      "filters.maxDistance":"도심까지 최대 거리(km)","filters.freeCancel":"무료 취소만",
      "filters.type":"숙소 유형","filters.amen":"편의시설","filters.booking":"예약 방식","filters.verify":"검증",
      "filters.long":"장기 숙박","filters.biz":"비즈니스","filters.acc":"접근성","filters.view":"전망","filters.safe":"안전",
      "filters.family":"가족","filters.ent":"엔터테인먼트","filters.out":"야외","filters.park":"주차",
      "filters.pets":"반려동물","filters.checkin":"체크인","filters.exp":"경험","filters.loc":"위치",
      "filters.reset":"초기화","filters.apply":"적용",
      "type.hotel":"호텔","type.motel":"모텔","type.hostel":"호스텔","type.apartment":"아파트","type.villa":"빌라",
      "type.ryokan":"료칸","type.guesthouse":"게스트하우스","type.bnb":"B&B",
      "amen.wifi":"와이파이","amen.kitchen":"주방","amen.parking":"주차","amen.pool":"수영장","amen.ac":"에어컨",
      "amen.gym":"피트니스","amen.workspace":"업무 공간","amen.washer":"세탁기","amen.dryer":"건조기","amen.breakfast":"조식",
      "book.instant":"즉시 예약","book.request":"예약 요청",
      "verify.listings":"검증된 숙소만","verify.reviews":"검증된 리뷰",
      "long.deals":"장기 숙박 특가","biz.b2b":"B2B 지원","biz.invoice":"인보이스 제공",
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
      "foot.about":"회사 소개","foot.careers":"채용","foot.press":"보도자료","foot.help":"도움말","foot.center":"도움말 센터",
      "foot.protect":"게스트 보호","foot.contact":"문의","foot.legal":"법적 고지","foot.terms":"이용약관",
      "foot.privacy":"개인정보 처리방침","foot.cookies":"쿠키",
      "buttons.book":"예약하기","labels.perNight":"/ 1박","labels.from":"최저","labels.night":"박"
    },
    tr:{
      "nav.home":"Ana sayfa","nav.hotels":"Konaklama","nav.membership":"Üyelik","nav.search":"Arama","nav.becomeHost":"Ev sahibi olun",
      "nav.login":"Giriş","nav.signup":"Kaydol",
      "controls.sort":"Sırala","controls.filter":"Filtre","controls.map":"Harita",
      "controls.rateHint":"* Demo kur. Canlı kur API’si bağlayın.",
      "filters.title":"Filtreler","filters.maxPrice":"Azami fiyat (çevrilmiş)","filters.minRating":"Asgari puan",
      "filters.maxDistance":"Merkeze azami mesafe (km)","filters.freeCancel":"Yalnızca ücretsiz iptal",
      "filters.type":"Konaklama türü","filters.amen":"Olanaklar","filters.booking":"Rezervasyon","filters.verify":"Doğrulama",
      "filters.long":"Uzun konaklama","filters.biz":"İş","filters.acc":"Erişilebilirlik","filters.view":"Manzara","filters.safe":"Güvenlik",
      "filters.family":"Aile","filters.ent":"Eğlence","filters.out":"Açık alan","filters.park":"Park",
      "filters.pets":"Evcil","filters.checkin":"Giriş","filters.exp":"Deneyimler","filters.loc":"Konum",
      "filters.reset":"Sıfırla","filters.apply":"Uygula",
      "type.hotel":"Otel","type.motel":"Motel","type.hostel":"Hostel","type.apartment":"Daire","type.villa":"Villa",
      "type.ryokan":"Ryokan","type.guesthouse":"Pansiyon","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"Mutfak","amen.parking":"Otopark","amen.pool":"Havuz","amen.ac":"Klima",
      "amen.gym":"Spor salonu","amen.workspace":"Çalışma alanı","amen.washer":"Çamaşır mak.","amen.dryer":"Kurutma mak.","amen.breakfast":"Kahvaltı",
      "book.instant":"Anında rezervasyon","book.request":"Talep ile rezervasyon",
      "verify.listings":"Yalnızca doğrulanmış ilanlar","verify.reviews":"Doğrulanmış yorumlar",
      "long.deals":"Uzun konaklama fırsatları","biz.b2b":"B2B uyumlu","biz.invoice":"Fatura mevcut",
      "acc.stepfree":"Basamaksız erişim","acc.elevator":"Asansör","acc.doorway":"Geniş kapı","acc.bathroom":"Erişilebilir banyo",
      "view.sea":"Deniz manzarası","view.city":"Şehir manzarası","view.mountain":"Dağ manzarası","view.garden":"Bahçe",
      "safe.co":"Karbon monoksit alarmı","safe.smoke":"Duman alarmı","safe.aid":"İlk yardım çantası",
      "family.crib":"Bebek yatağı","family.chair":"Mama sandalyesi","family.stroller":"Bebek arabası uygun",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"Oyun konsolu",
      "out.bbq":"Mangal","out.patio":"Avlu","out.garden":"Özel bahçe",
      "park.onsite":"Tesis içi","park.street":"Sokak","park.garage":"Ücretli otopark",
      "pets.allowed":"İzinli","checkin.self":"Kendi kendine giriş",
      "exp.nature":"Doğa","exp.camping":"Kamp","exp.traditional":"Geleneksel","exp.ski":"Kayak in/out","exp.wine":"Şarap bölgesi",
      "loc.airport":"Havalimanına yakın","loc.station":"İstasyona yakın","loc.beach":"Plaja yakın","loc.center":"Şehir merkezi",
      "foot.about":"Hakkımızda","foot.careers":"Kariyer","foot.press":"Basın","foot.help":"Yardım","foot.center":"Yardım Merkezi",
      "foot.protect":"Misafir Koruma","foot.contact":"İletişim","foot.legal":"Hukuki","foot.terms":"Şartlar",
      "foot.privacy":"Gizlilik","foot.cookies":"Çerezler",
      "buttons.book":"Rezervasyon","labels.perNight":"/ gece","labels.from":"Başlangıç","labels.night":"gece"
    },
    fr:{
      "nav.home":"Accueil","nav.hotels":"Hébergements","nav.membership":"Adhésion","nav.search":"Recherche","nav.becomeHost":"Devenir hôte",
      "nav.login":"Connexion","nav.signup":"S’inscrire",
      "controls.sort":"Trier","controls.filter":"Filtrer","controls.map":"Carte",
      "controls.rateHint":"* Taux démo. Connectez une API de change.",
      "filters.title":"Filtres","filters.maxPrice":"Prix max (converti)","filters.minRating":"Note minimale",
      "filters.maxDistance":"Distance max du centre (km)","filters.freeCancel":"Annulation gratuite uniquement",
      "filters.type":"Type d’hébergement","filters.amen":"Équipements","filters.booking":"Réservation","filters.verify":"Vérification",
      "filters.long":"Long séjour","filters.biz":"Affaires","filters.acc":"Accessibilité","filters.view":"Vue","filters.safe":"Sécurité",
      "filters.family":"Famille","filters.ent":"Divertissement","filters.out":"Extérieur","filters.park":"Parking",
      "filters.pets":"Animaux","filters.checkin":"Arrivée","filters.exp":"Expériences","filters.loc":"Emplacement",
      "filters.reset":"Réinitialiser","filters.apply":"Appliquer",
      "type.hotel":"Hôtel","type.motel":"Motel","type.hostel":"Auberge","type.apartment":"Appartement","type.villa":"Villa",
      "type.ryokan":"Ryokan","type.guesthouse":"Maison d’hôtes","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"Cuisine","amen.parking":"Parking","amen.pool":"Piscine","amen.ac":"Climatisation",
      "amen.gym":"Salle de sport","amen.workspace":"Espace de travail","amen.washer":"Lave-linge","amen.dryer":"Sèche-linge","amen.breakfast":"Petit-déjeuner",
      "book.instant":"Réservation instantanée","book.request":"Demande de réservation",
      "verify.listings":"Annonces vérifiées uniquement","verify.reviews":"Avis vérifiés",
      "long.deals":"Offres long séjour","biz.b2b":"Compatible B2B","biz.invoice":"Facture disponible",
      "acc.stepfree":"Accès sans marche","acc.elevator":"Ascenseur","acc.doorway":"Large porte","acc.bathroom":"Salle de bain accessible",
      "view.sea":"Vue mer","view.city":"Vue ville","view.mountain":"Vue montagne","view.garden":"Jardin",
      "safe.co":"Détecteur CO","safe.smoke":"Détecteur de fumée","safe.aid":"Trousse de secours",
      "family.crib":"Lit bébé","family.chair":"Chaise haute","family.stroller":"Poussette OK",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"Console de jeux",
      "out.bbq":"Barbecue","out.patio":"Patio","out.garden":"Jardin privé",
      "park.onsite":"Sur place","park.street":"Rue","park.garage":"Garage payant",
      "pets.allowed":"Autorisé","checkin.self":"Arrivée autonome",
      "exp.nature":"Nature","exp.camping":"Camping","exp.traditional":"Traditionnel","exp.ski":"Ski-in/out","exp.wine":"Vignobles",
      "loc.airport":"Près de l’aéroport","loc.station":"Près de la gare","loc.beach":"Près de la plage","loc.center":"Centre-ville",
      "foot.about":"À propos","foot.careers":"Carrières","foot.press":"Presse","foot.help":"Aide","foot.center":"Centre d’aide",
      "foot.protect":"Protection des invités","foot.contact":"Contact","foot.legal":"Mentions légales","foot.terms":"Conditions",
      "foot.privacy":"Confidentialité","foot.cookies":"Cookies",
      "buttons.book":"Réserver","labels.perNight":"/ nuit","labels.from":"Dès","labels.night":"nuit"
    },
    ja:{
      "nav.home":"ホーム","nav.hotels":"宿泊先","nav.membership":"メンバーシップ","nav.search":"検索","nav.becomeHost":"ホストになる",
      "nav.login":"ログイン","nav.signup":"登録",
      "controls.sort":"並び替え","controls.filter":"フィルター","controls.map":"地図",
      "controls.rateHint":"* デモ為替レートです。運用時はFX APIを接続してください。",
      "filters.title":"フィルター","filters.maxPrice":"最大価格（換算）","filters.minRating":"最小評価",
      "filters.maxDistance":"中心からの最大距離（km）","filters.freeCancel":"無料キャンセルのみ",
      "filters.type":"宿タイプ","filters.amen":"アメニティ","filters.booking":"予約方法","filters.verify":"認証",
      "filters.long":"長期滞在","filters.biz":"ビジネス","filters.acc":"アクセシビリティ","filters.view":"眺望","filters.safe":"安全",
      "filters.family":"ファミリー","filters.ent":"エンタメ","filters.out":"屋外","filters.park":"駐車",
      "filters.pets":"ペット","filters.checkin":"チェックイン","filters.exp":"体験","filters.loc":"場所",
      "filters.reset":"リセット","filters.apply":"適用",
      "type.hotel":"ホテル","type.motel":"モーテル","type.hostel":"ホステル","type.apartment":"アパート","type.villa":"ヴィラ",
      "type.ryokan":"旅館","type.guesthouse":"ゲストハウス","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"キッチン","amen.parking":"駐車場","amen.pool":"プール","amen.ac":"エアコン",
      "amen.gym":"ジム","amen.workspace":"ワークスペース","amen.washer":"洗濯機","amen.dryer":"乾燥機","amen.breakfast":"朝食",
      "book.instant":"即時予約","book.request":"リクエスト予約",
      "verify.listings":"認証済みリスティングのみ","verify.reviews":"認証済みレビュー",
      "long.deals":"長期割引","biz.b2b":"B2B対応","biz.invoice":"請求書あり",
      "acc.stepfree":"段差なし","acc.elevator":"エレベーター","acc.doorway":"広い出入口","acc.bathroom":"バリアフリーバスルーム",
      "view.sea":"海の景色","view.city":"シティビュー","view.mountain":"山の景色","view.garden":"庭",
      "safe.co":"一酸化炭素警報器","safe.smoke":"煙探知器","safe.aid":"救急箱",
      "family.crib":"ベビーベッド","family.chair":"ハイチェア","family.stroller":"ベビーカー可",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"ゲーム機",
      "out.bbq":"BBQグリル","out.patio":"パティオ","out.garden":"専用庭",
      "park.onsite":"館内","park.street":"路上","park.garage":"有料ガレージ",
      "pets.allowed":"可","checkin.self":"セルフチェックイン",
      "exp.nature":"自然","exp.camping":"キャンプ","exp.traditional":"伝統体験","exp.ski":"スキー in/out","exp.wine":"ワイン産地",
      "loc.airport":"空港近く","loc.station":"駅近く","loc.beach":"ビーチ近く","loc.center":"中心部",
      "foot.about":"会社情報","foot.careers":"採用情報","foot.press":"プレス","foot.help":"ヘルプ","foot.center":"ヘルプセンター",
      "foot.protect":"ゲ스트保護","foot.contact":"お問い合わせ","foot.legal":"法的事項","foot.terms":"利用規約",
      "foot.privacy":"プライバシー","foot.cookies":"クッキー",
      "buttons.book":"予約","labels.perNight":"/ 泊","labels.from":"最低","labels.night":"泊"
    },
    de:{
      "nav.home":"Startseite","nav.hotels":"Unterkünfte","nav.membership":"Mitgliedschaft","nav.search":"Suche","nav.becomeHost":"Gastgeber werden",
      "nav.login":"Anmelden","nav.signup":"Registrieren",
      "controls.sort":"Sortieren","controls.filter":"Filtern","controls.map":"Karte",
      "controls.rateHint":"* Demo-Wechselkurse. Binden Sie eine FX-API an.",
      "filters.title":"Filter","filters.maxPrice":"Max. Preis (umgerechnet)","filters.minRating":"Mindestbewertung",
      "filters.maxDistance":"Max. Entfernung zum Zentrum (km)","filters.freeCancel":"Nur kostenlose Stornierung",
      "filters.type":"Unterkunftstyp","filters.amen":"Ausstattung","filters.booking":"Buchung","filters.verify":"Verifizierung",
      "filters.long":"Langzeitaufenthalt","filters.biz":"Business","filters.acc":"Barrierefreiheit","filters.view":"Aussicht","filters.safe":"Sicherheit",
      "filters.family":"Familie","filters.ent":"Entertainment","filters.out":"Outdoor","filters.park":"Parken",
      "filters.pets":"Haustiere","filters.checkin":"Check-in","filters.exp":"Erlebnisse","filters.loc":"Lage",
      "filters.reset":"Zurücksetzen","filters.apply":"Übernehmen",
      "type.hotel":"Hotel","type.motel":"Motel","type.hostel":"Hostel","type.apartment":"Apartment","type.villa":"Villa",
      "type.ryokan":"Ryokan","type.guesthouse":"Gästehaus","type.bnb":"B&B",
      "amen.wifi":"WLAN","amen.kitchen":"Küche","amen.parking":"Parkplatz","amen.pool":"Pool","amen.ac":"Klimaanlage",
      "amen.gym":"Fitnessraum","amen.workspace":"Arbeitsplatz","amen.washer":"Waschmaschine","amen.dryer":"Trockner","amen.breakfast":"Frühstück",
      "book.instant":"Sofort buchen","book.request":"Anfragebuchung",
      "verify.listings":"Nur verifizierte Inserate","verify.reviews":"Verifizierte Bewertungen",
      "long.deals":"Langzeitangebote","biz.b2b":"B2B-fähig","biz.invoice":"Rechnung verfügbar",
      "acc.stepfree":"Stufenloser Zugang","acc.elevator":"Aufzug","acc.doorway":"Breite Tür","acc.bathroom":"Barrierefreies Bad",
      "view.sea":"Meerblick","view.city":"Stadtblick","view.mountain":"Bergblick","view.garden":"Garten",
      "safe.co":"CO-Melder","safe.smoke":"Rauchmelder","safe.aid":"Erste-Hilfe-Set",
      "family.crib":"Babybett","family.chair":"Hochstuhl","family.stroller":"Kinderwagenfreundlich",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"Spielkonsole",
      "out.bbq":"Grill","out.patio":"Terrasse","out.garden":"Privater Garten",
      "park.onsite":"Vor Ort","park.street":"Straße","park.garage":"Kostenpflichtige Garage",
      "pets.allowed":"Erlaubt","checkin.self":"Selbst-Check-in",
      "exp.nature":"Natur","exp.camping":"Camping","exp.traditional":"Traditionell","exp.ski":"Ski-in/out","exp.wine":"Weinregion",
      "loc.airport":"Nähe Flughafen","loc.station":"Nähe Bahnhof","loc.beach":"Nähe Strand","loc.center":"Zentrum",
      "foot.about":"Über uns","foot.careers":"Karriere","foot.press":"Presse","foot.help":"Hilfe","foot.center":"Hilfe-Center",
      "foot.protect":"Gästeschutz","foot.contact":"Kontakt","foot.legal":"Rechtliches","foot.terms":"AGB",
      "foot.privacy":"Datenschutz","foot.cookies":"Cookies",
      "buttons.book":"Buchen","labels.perNight":"/ Nacht","labels.from":"Ab","labels.night":"Nacht"
    },
    es:{
      "nav.home":"Inicio","nav.hotels":"Alojamientos","nav.membership":"Membresía","nav.search":"Buscar","nav.becomeHost":"Hazte anfitrión",
      "nav.login":"Iniciar sesión","nav.signup":"Registrarse",
      "controls.sort":"Ordenar","controls.filter":"Filtrar","controls.map":"Mapa",
      "controls.rateHint":"* Tipos de cambio de demo. Conecta una API FX.",
      "filters.title":"Filtros","filters.maxPrice":"Precio máx. (convertido)","filters.minRating":"Calificación mínima",
      "filters.maxDistance":"Distancia máx. al centro (km)","filters.freeCancel":"Solo cancelación gratuita",
      "filters.type":"Tipo de estancia","filters.amen":"Servicios","filters.booking":"Reserva","filters.verify":"Verificación",
      "filters.long":"Estancia larga","filters.biz":"Negocios","filters.acc":"Accesibilidad","filters.view":"Vista","filters.safe":"Seguridad",
      "filters.family":"Familia","filters.ent":"Entretenimiento","filters.out":"Exterior","filters.park":"Estacionamiento",
      "filters.pets":"Mascotas","filters.checkin":"Check-in","filters.exp":"Experiencias","filters.loc":"Ubicación",
      "filters.reset":"Restablecer","filters.apply":"Aplicar",
      "type.hotel":"Hotel","type.motel":"Motel","type.hostel":"Hostal","type.apartment":"Apartamento","type.villa":"Villa",
      "type.ryokan":"Ryokan","type.guesthouse":"Casa de huéspedes","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"Cocina","amen.parking":"Aparcamiento","amen.pool":"Piscina","amen.ac":"Aire acondicionado",
      "amen.gym":"Gimnasio","amen.workspace":"Espacio de trabajo","amen.washer":"Lavadora","amen.dryer":"Secadora","amen.breakfast":"Desayuno",
      "book.instant":"Reserva instantánea","book.request":"Solicitar reserva",
      "verify.listings":"Solo anuncios verificados","verify.reviews":"Reseñas verificadas",
      "long.deals":"Ofertas de larga estancia","biz.b2b":"Compatible B2B","biz.invoice":"Factura disponible",
      "acc.stepfree":"Acceso sin escalones","acc.elevator":"Ascensor","acc.doorway":"Puerta ancha","acc.bathroom":"Baño accesible",
      "view.sea":"Vista al mar","view.city":"Vista a la ciudad","view.mountain":"Vista a la montaña","view.garden":"Jardín",
      "safe.co":"Alarma de CO","safe.smoke":"Detector de humo","safe.aid":"Botiquín",
      "family.crib":"Cuna","family.chair":"Trona","family.stroller":"Carrito permitido",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"Consola",
      "out.bbq":"Parrilla BBQ","out.patio":"Patio","out.garden":"Jardín privado",
      "park.onsite":"En el sitio","park.street":"Calle","park.garage":"Garaje de pago",
      "pets.allowed":"Permitido","checkin.self":"Auto check-in",
      "exp.nature":"Naturaleza","exp.camping":"Camping","exp.traditional":"Tradicional","exp.ski":"Ski-in/out","exp.wine":"Región vinícola",
      "loc.airport":"Cerca del aeropuerto","loc.station":"Cerca de la estación","loc.beach":"Cerca de la playa","loc.center":"Centro",
      "foot.about":"Acerca de","foot.careers":"Empleo","foot.press":"Prensa","foot.help":"Ayuda","foot.center":"Centro de ayuda",
      "foot.protect":"Protección al huésped","foot.contact":"Contacto","foot.legal":"Legal","foot.terms":"Términos",
      "foot.privacy":"Privacidad","foot.cookies":"Cookies",
      "buttons.book":"Reservar","labels.perNight":"/ noche","labels.from":"Desde","labels.night":"noche"
    },
    it:{
      "nav.home":"Home","nav.hotels":"Alloggi","nav.membership":"Abbonamento","nav.search":"Cerca","nav.becomeHost":"Diventa host",
      "nav.login":"Accedi","nav.signup":"Registrati",
      "controls.sort":"Ordina","controls.filter":"Filtra","controls.map":"Mappa",
      "controls.rateHint":"* Tassi demo. Collega un’API FX.",
      "filters.title":"Filtri","filters.maxPrice":"Prezzo max (convertito)","filters.minRating":"Valutazione minima",
      "filters.maxDistance":"Distanza max dal centro (km)","filters.freeCancel":"Solo cancellazione gratuita",
      "filters.type":"Tipo di struttura","filters.amen":"Servizi","filters.booking":"Prenotazione","filters.verify":"Verifica",
      "filters.long":"Lungo soggiorno","filters.biz":"Business","filters.acc":"Accessibilità","filters.view":"Vista","filters.safe":"Sicurezza",
      "filters.family":"Famiglia","filters.ent":"Intrattenimento","filters.out":"Esterno","filters.park":"Parcheggio",
      "filters.pets":"Animali","filters.checkin":"Check-in","filters.exp":"Esperienze","filters.loc":"Posizione",
      "filters.reset":"Reimposta","filters.apply":"Applica",
      "type.hotel":"Hotel","type.motel":"Motel","type.hostel":"Ostello","type.apartment":"Appartamento","type.villa":"Villa",
      "type.ryokan":"Ryokan","type.guesthouse":"Guest house","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"Cucina","amen.parking":"Parcheggio","amen.pool":"Piscina","amen.ac":"Aria condizionata",
      "amen.gym":"Palestra","amen.workspace":"Spazio di lavoro","amen.washer":"Lavatrice","amen.dryer":"Asciugatrice","amen.breakfast":"Colazione",
      "book.instant":"Prenotazione immediata","book.request":"Richiesta di prenotazione",
      "verify.listings":"Solo annunci verificati","verify.reviews":"Recensioni verificate",
      "long.deals":"Offerte long stay","biz.b2b":"Compatibile B2B","biz.invoice":"Fattura disponibile",
      "acc.stepfree":"Accesso senza gradini","acc.elevator":"Ascensore","acc.doorway":"Porta larga","acc.bathroom":"Bagno accessibile",
      "view.sea":"Vista mare","view.city":"Vista città","view.mountain":"Vista montagna","view.garden":"Giardino",
      "safe.co":"Allarme CO","safe.smoke":"Rilevatore di fumo","safe.aid":"Kit di pronto soccorso",
      "family.crib":"Culla","family.chair":"Seggiolone","family.stroller":"Adatto passeggini",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"Console",
      "out.bbq":"Barbecue","out.patio":"Patio","out.garden":"Giardino privato",
      "park.onsite":"In loco","park.street":"Strada","park.garage":"Garage a pagamento",
      "pets.allowed":"Ammessi","checkin.self":"Self check-in",
      "exp.nature":"Natura","exp.camping":"Campeggio","exp.traditional":"Tradizionale","exp.ski":"Ski-in/out","exp.wine":"Zona vinicola",
      "loc.airport":"Vicino all’aeroporto","loc.station":"Vicino alla stazione","loc.beach":"Vicino alla spiaggia","loc.center":"Centro",
      "foot.about":"Chi siamo","foot.careers":"Carriere","foot.press":"Stampa","foot.help":"Aiuto","foot.center":"Centro assistenza",
      "foot.protect":"Protezione ospiti","foot.contact":"Contatti","foot.legal":"Legale","foot.terms":"Termini",
      "foot.privacy":"Privacy","foot.cookies":"Cookie",
      "buttons.book":"Prenota","labels.perNight":"/ notte","labels.from":"Da","labels.night":"notte"
    },
    zh:{
      "nav.home":"首页","nav.hotels":"住宿","nav.membership":"会员","nav.search":"搜索","nav.becomeHost":"成为房东",
      "nav.login":"登录","nav.signup":"注册",
      "controls.sort":"排序","controls.filter":"筛选","controls.map":"地图",
      "controls.rateHint":"* 演示汇率。上线请接入汇率API。",
      "filters.title":"筛选","filters.maxPrice":"最高价格（折算）","filters.minRating":"最低评分",
      "filters.maxDistance":"距市中心最大距离（公里）","filters.freeCancel":"仅限可免费取消",
      "filters.type":"房源类型","filters.amen":"设施","filters.booking":"预订方式","filters.verify":"认证",
      "filters.long":"长住","filters.biz":"商务","filters.acc":"无障碍","filters.view":"景观","filters.safe":"安全",
      "filters.family":"亲子","filters.ent":"娱乐","filters.out":"户外","filters.park":"停车",
      "filters.pets":"宠物","filters.checkin":"入住","filters.exp":"体验","filters.loc":"位置",
      "filters.reset":"重置","filters.apply":"应用",
      "type.hotel":"酒店","type.motel":"汽车旅馆","type.hostel":"青年旅舍","type.apartment":"公寓","type.villa":"别墅",
      "type.ryokan":"旅馆","type.guesthouse":"民宿","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"厨房","amen.parking":"停车位","amen.pool":"泳池","amen.ac":"空调",
      "amen.gym":"健身房","amen.workspace":"工作区","amen.washer":"洗衣机","amen.dryer":"烘干机","amen.breakfast":"早餐",
      "book.instant":"即时预订","book.request":"申请预订",
      "verify.listings":"仅显示已认证房源","verify.reviews":"已验证评价",
      "long.deals":"长住优惠","biz.b2b":"支持B2B","biz.invoice":"可开发票",
      "acc.stepfree":"无台阶通行","acc.elevator":"电梯","acc.doorway":"宽门","acc.bathroom":"无障碍卫生间",
      "view.sea":"海景","view.city":"城市景观","view.mountain":"山景","view.garden":"花园",
      "safe.co":"一氧化碳警报","safe.smoke":"烟雾报警","safe.aid":"急救箱",
      "family.crib":"婴儿床","family.chair":"儿童餐椅","family.stroller":"可推婴儿车",
      "ent.tv":"电视","ent.netflix":"Netflix","ent.console":"游戏机",
      "out.bbq":"烧烤架","out.patio":"露台","out.garden":"私家花园",
      "park.onsite":"场内","park.street":"路边","park.garage":"收费车库",
      "pets.allowed":"可携带","checkin.self":"自助入住",
      "exp.nature":"自然","exp.camping":"露营","exp.traditional":"传统","exp.ski":"滑进/滑出","exp.wine":"葡萄酒产区",
      "loc.airport":"近机场","loc.station":"近车站","loc.beach":"近海滩","loc.center":"市中心",
      "foot.about":"关于我们","foot.careers":"招聘","foot.press":"媒体","foot.help":"帮助","foot.center":"帮助中心",
      "foot.protect":"住客保障","foot.contact":"联系","foot.legal":"法律","foot.terms":"条款",
      "foot.privacy":"隐私","foot.cookies":"Cookie",
      "buttons.book":"预订","labels.perNight":"/ 晚","labels.from":"起","labels.night":"晚"
    },
    ru:{
      "nav.home":"Главная","nav.hotels":"Жильё","nav.membership":"Подписка","nav.search":"Поиск","nav.becomeHost":"Стать хозяином",
      "nav.login":"Войти","nav.signup":"Регистрация",
      "controls.sort":"Сортировать","controls.filter":"Фильтр","controls.map":"Карта",
      "controls.rateHint":"* Демонстрационные курсы. Подключите FX-API.",
      "filters.title":"Фильтры","filters.maxPrice":"Макс. цена (в пересчёте)","filters.minRating":"Мин. рейтинг",
      "filters.maxDistance":"Макс. расстояние от центра (км)","filters.freeCancel":"Только бесплатная отмена",
      "filters.type":"Тип размещения","filters.amen":"Удобства","filters.booking":"Бронирование","filters.verify":"Проверка",
      "filters.long":"Длительное проживание","filters.biz":"Бизнес","filters.acc":"Доступность","filters.view":"Вид","filters.safe":"Безопасность",
      "filters.family":"Семья","filters.ent":"Развлечения","filters.out":"На открытом воздухе","filters.park":"Парковка",
      "filters.pets":"Питомцы","filters.checkin":"Заезд","filters.exp":"Впечатления","filters.loc":"Локация",
      "filters.reset":"Сброс","filters.apply":"Применить",
      "type.hotel":"Отель","type.motel":"Мотель","type.hostel":"Хостел","type.apartment":"Апартаменты","type.villa":"Вилла",
      "type.ryokan":"Рёкан","type.guesthouse":"Гостевой дом","type.bnb":"B&B",
      "amen.wifi":"Wi-Fi","amen.kitchen":"Кухня","amen.parking":"Парковка","amen.pool":"Бассейн","amen.ac":"Кондиционер",
      "amen.gym":"Тренажёрный зал","amen.workspace":"Рабочая зона","amen.washer":"Стиральная машина","amen.dryer":"Сушильная машина","amen.breakfast":"Завтрак",
      "book.instant":"Мгновенное бронирование","book.request":"Запрос на бронирование",
      "verify.listings":"Только проверенные объекты","verify.reviews":"Проверенные отзывы",
      "long.deals":"Предложения для долгого проживания","biz.b2b":"Поддержка B2B","biz.invoice":"Счёт-фактура",
      "acc.stepfree":"Без ступенек","acc.elevator":"Лифт","acc.doorway":"Широкий проём","acc.bathroom":"Доступная ванная",
      "view.sea":"Вид на море","view.city":"Вид на город","view.mountain":"Вид на горы","view.garden":"Сад",
      "safe.co":"Датчик CO","safe.smoke":"Датчик дыма","safe.aid":"Аптечка",
      "family.crib":"Детская кроватка","family.chair":"Детский стул","family.stroller":"Для коляски",
      "ent.tv":"TV","ent.netflix":"Netflix","ent.console":"Игровая консоль",
      "out.bbq":"Мангал","out.patio":"Патио","out.garden":"Частный сад",
      "park.onsite":"На территории","park.street":"Улица","park.garage":"Платный гараж",
      "pets.allowed":"Разрешены","checkin.self":"Самостоятельный заезд",
      "exp.nature":"Природа","exp.camping":"Кемпинг","exp.traditional":"Традиционный","exp.ski":"Ski-in/out","exp.wine":"Винодельческий регион",
      "loc.airport":"Рядом с аэропортом","loc.station":"Рядом со станцией","loc.beach":"Рядом с пляжем","loc.center":"Центр",
      "foot.about":"О нас","foot.careers":"Карьера","foot.press":"Пресса","foot.help":"Помощь","foot.center":"Справочный центр",
      "foot.protect":"Защита гостей","foot.contact":"Контакты","foot.legal":"Правовая информация","foot.terms":"Условия",
      "foot.privacy":"Конфиденциальность","foot.cookies":"Cookies",
      "buttons.book":"Забронировать","labels.perNight":"/ ночь","labels.from":"От","labels.night":"ночь"
    }
  };

  // Merge with existing I18N if present
  window.I18N = Object.assign(window.I18N || {}, DICT);

  function pickLang(){
    const saved = localStorage.getItem('sw_lang');
    const guess = (navigator.language || 'en').slice(0,2).toLowerCase();
    const lang = (saved || guess).toLowerCase();
    return window.I18N[lang] ? lang : 'en';
  }

  // Simple translator
  window.t = window.t || function(key){
    const lang = pickLang();
    const L = window.I18N[lang] || window.I18N.en;
    return (L && L[key]) || (window.I18N.en && window.I18N.en[key]) || key;
  };

  // Apply to DOM
  window.applyI18NPage = window.applyI18NPage || function(forceLang){
    if(forceLang){ localStorage.setItem('sw_lang', forceLang); }
    const lang = pickLang();
    const L = window.I18N[lang] || window.I18N.en;

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      const v = L[k] || window.I18N.en[k];
      if(typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const k = el.getAttribute('data-i18n-placeholder');
      const v = L[k] || window.I18N.en[k];
      if(typeof v === 'string') el.setAttribute('placeholder', v);
    });
  };

  // Auto-apply on ready & wire #lang select if present
  document.addEventListener('DOMContentLoaded', function(){
    applyI18NPage();
    const sel = document.getElementById('lang');
    if(sel){
      // If options already built elsewhere, just sync value
      if(!sel.value) sel.value = pickLang();
      sel.addEventListener('change', e=> applyI18NPage(e.target.value));
    }
  });
})();

/* ================== STAYWORLD — app.js (FINAL) ================== */
(function(){
  const $  = (s,sc)=> (sc||document).querySelector(s);
  const $$ = (s,sc)=> Array.from((sc||document).querySelectorAll(s));
  const on = (el,ev,fn)=> el && el.addEventListener(ev,fn,{passive:false});

  // ==== [Currency & Price Formatting] =======================================
  // 언어→통화 매핑과 환율(간이값). 슬라이더/비교는 USD, 표시는 각 통화로.
  const LANG_CURRENCY = {
    ko:"KRW", tr:"TRY", en:"USD", fr:"EUR", ja:"JPY",
    es:"EUR", de:"EUR", ru:"RUB", it:"EUR", zh:"CNY"
  };
  const RATES = { USD:1, KRW:1350, TRY:33, EUR:0.92, JPY:156, RUB:90, CNY:7.2 };

  // 기존에 sw_lang 쓰고 있으므로 그대로 존중
  let currentLang = localStorage.getItem("sw_lang") || (navigator.language||"en").slice(0,2).toLowerCase();
  if(!['en','ko','tr','fr','ja','de','es','it','zh','ru'].includes(currentLang)) currentLang = 'en';
  let currentCurrency = LANG_CURRENCY[currentLang] || "USD";
  let nf = new Intl.NumberFormat(currentLang, { style:"currency", currency: currentCurrency });

  const usdToDisplay = usd => usd * (RATES[currentCurrency] || 1);
  const displayToUsd = val => {
    const r = (RATES[currentCurrency] || 1) || 1;
    return r ? (val / r) : val;
  };

  // [KEEP+ADD] 기존 [data-price-usd] 처리 + .price 요소가 부모에 data-price-usd만 가진 경우도 지원
  function refreshAllPrices(){
    // 1) data-price-usd 직접 붙은 엘리먼트
    $$("[data-price-usd]").forEach(el=>{
      const usd = parseFloat(el.getAttribute("data-price-usd") || "0");
      el.textContent = nf.format(usdToDisplay(usd));
    });
    // 2) .price 요소인데, 자신에게 data-price-usd가 없고 조상에만 있는 경우
    $$(".price").forEach(el=>{
      if(el.hasAttribute("data-price-usd")) return; // 위에서 처리됨
      const holder = el.closest("[data-price-usd]");
      if(!holder) return;
      const usd = parseFloat(holder.getAttribute("data-price-usd") || "0");
      el.textContent = nf.format(usdToDisplay(usd));
    });
  }

  function onLanguageChange(newLang){
    currentLang = newLang;
    localStorage.setItem("sw_lang", newLang);
    currentCurrency = LANG_CURRENCY[newLang] || "USD";
    nf = new Intl.NumberFormat(newLang, { style:"currency", currency: currentCurrency });
    // 번역 적용 이후 가격/라벨 즉시 갱신
    refreshAllPrices();
    if(typeof refreshFilterPriceLabels === 'function') refreshFilterPriceLabels();
  }
  // ==========================================================================

  /* -------- 공통 헤더/푸터 렌더 -------- */
  function renderHeader(){
    const el = $('#global-header');
    if(!el) return;

    el.innerHTML = `
    <header class="site-header">
      <div class="container header-row">
        <a href="/index.html" class="brand">
          <img src="/images/stayworld-logo.png" alt="StayWorld" class="brand-logo" />
          <span class="brand-text">STAYWORLD</span>
        </a>
        <nav class="main-nav" aria-label="Primary">
          <a id="t_nav_home" href="/index.html">Home</a>
          <a id="t_nav_membership" href="/membership.html">Membership</a>
          <a id="t_nav_login" href="/login.html">Login</a>
        </nav>
        <div class="header-cta">
          <label class="lang-label">Language</label>
          <select id="langSelect" class="lang-select">
            <option value="en">EN</option><option value="ko">KO</option>
            <option value="ja">JA</option><option value="zh">ZH</option>
            <option value="fr">FR</option><option value="es">ES</option>
            <option value="de">DE</option><option value="tr">TR</option>
            <option value="ar">AR</option><option value="ru">RU</option>
          </select>
          <a id="t_nav_signup" href="/signup.html" class="btn btn-gold">Sign Up</a>
          <button id="btnLogout" class="btn btn-ghost" style="display:none">Logout</button>
        </div>
      </div>
    </header>`;
  }

  function renderFooter(){
    const el = $('#global-footer');
    if(!el) return;
    el.innerHTML = `
      <footer class="site-footer">
        <div class="container"><small>© StayWorld — stayworldbooking.com</small></div>
      </footer>`;
  }

  /* -------- 로그인 상태 반영 -------- */
  // [ADD] firebaseAuth 미정의 환경에서 오류 방지
  function bindAuthHeader(){
    if(!(window.firebaseAuth && typeof firebaseAuth.onAuthStateChanged === 'function')) return;
    firebaseAuth.onAuthStateChanged(user=>{
      const loginLink = $('#t_nav_login');
      const signupBtn = $('#t_nav_signup');
      const logoutBtn = $('#btnLogout');

      if(user){
        if(loginLink){ loginLink.textContent = 'My Page'; loginLink.href = '/host-register.html'; }
        if(signupBtn){ signupBtn.style.display = 'none'; }
        if(logoutBtn){ logoutBtn.style.display = 'inline-flex'; logoutBtn.onclick = async()=>{ await firebaseAuth.signOut(); location.href='/index.html'; }; }
      }else{
        if(loginLink){ loginLink.textContent = 'Login'; loginLink.href = '/login.html'; }
        if(signupBtn){ signupBtn.style.display = 'inline-flex'; }
        if(logoutBtn){ logoutBtn.style.display = 'none'; }
      }
    });
  }

  /* -------- 챗봇 -------- */
  function ensureChat(){
    let fab = $('#chatFab'); if(!fab){ fab = document.createElement('button'); fab.id='chatFab'; fab.textContent='💬'; document.body.appendChild(fab); }
    let panel = $('#botPanel');
    if(!panel){
      panel = document.createElement('div'); panel.id='botPanel';
      panel.innerHTML = `
        <div class="hdr"><strong>AI Concierge</strong><button id="botClose" class="btn btn-ghost">✕</button></div>
        <div id="botBody" class="body"><div class="msg ai">Hello! Ask in any language.</div></div>
        <div class="row"><input id="botInput" placeholder="Type a message…" class="input"><button id="botSend" class="btn btn-gold">Send</button></div>`;
      document.body.appendChild(panel);
    }
    const open=()=>{panel.style.display='block';}; const close=()=>{panel.style.display='none';};
    on(fab,'click',e=>{e.stopPropagation();open();});
    on($('#botClose',panel),'click',e=>{e.stopPropagation();close();});
    on(document,'click',e=>{
      if(panel.style.display!=='block')return;
      const r=panel.getBoundingClientRect();
      const inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
      if(!inside) close();
    });
    const body=$('#botBody',panel), input=$('#botInput',panel), send=$('#botSend',panel);
    const msgs=[];
    const add=(t,me)=>{const d=document.createElement('div'); d.className=`msg ${me?'me':'ai'}`; d.textContent=t; body.appendChild(d); body.scrollTop=body.scrollHeight;};
    async function askAI(message,lang){
      for(const ep of ['/.netlify/functions/sw-chat']){
        try{
          const r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[...msgs,{role:'user',content:message}],lang})});
          if(r.ok){const d=await r.json(); if(d.reply) return d.reply;}
        }catch(_){}
      }
      return '(Backend not found. Check your function URL.)';
    }
    on(send,'click', async ()=>{
      const v=(input.value||'').trim(); if(!v) return; input.value=''; add(v,true); msgs.push({role:'user',content:v}); add('…',false); const dots=body.lastChild;
      try{ const code = ($('#langSelect')?.value)||'en'; const reply=await askAI(v,code); dots.remove(); add(reply,false); msgs.push({role:'assistant',content:reply}); }
      catch(_){ dots.remove(); add('Assistant is unavailable.',false); }
    });
    on(input,'keydown',e=>{ if(e.key==='Enter') $('#botSend').click(); });
  }

  /* -------- 필터 드로어 -------- */
  function ensureFilters(){
    let d=$('#filterDrawer'); if(d) return;
    d=document.createElement('div'); d.id='filterDrawer'; d.setAttribute('aria-hidden','true');
    d.innerHTML=`
      <div class="back"></div>
      <div class="panel">
        <div class="head">
          <strong id="fTitle">Filters</strong>
          <div style="display:flex;gap:8px;align-items:center">
            <button id="swClose" class="btn btn-ghost">✕</button>
          </div>
        </div>
        <div id="filterGrid"></div>
        <div class="foot">
          <button id="swReset" class="btn btn-ghost">Reset</button>
          <button id="swApply" class="btn btn-gold">Apply</button>
        </div>
      </div>`;
    document.body.appendChild(d);

    const GROUPS=[
      {t:'Price', kind:'price'},
      {t:'Stay type', checks:['Hotel','Motel','Hostel','Apartment','Villa','Ryokan','Guesthouse','B&B']},
      {t:'Review', radios:['4.5+','4.0+','Any']},
      {t:'Beds & Baths', inputs:[['number','beds',{min:1,value:1}],['number','baths',{min:1,value:1}]]},
      {t:'Pets', checks:['Allowed']},{t:'Check-in', checks:['Self check-in']},
      {t:'Amenities', checks:['Wi-Fi','Kitchen','Parking','Pool','Air conditioning','Gym','Workspace','Washer','Dryer','Breakfast']},
      {t:'Booking', checks:['Instant book','Request to book']},
      {t:'Verification', checks:['Verified listings only','Verified reviews']},
      {t:'Long-stay', checks:['Show long-stay deals']},
      {t:'Business', checks:['B2B-ready','Invoice available']},
      {t:'Location', checks:['Near airport','Near station','Near beach','City center']},
      {t:'Accessibility', checks:['Step-free access','Elevator','Wide doorway','Accessible bathroom']},
      {t:'Experiences', checks:['Nature','Camping','Traditional','Ski-in/out','Wine country']},
      {t:'View', checks:['Sea view','City view','Mountain view','Garden']},
      {t:'Safety', checks:['Carbon monoxide alarm','Smoke alarm','First aid kit']},
      {t:'Family', checks:['Crib','High chair','Stroller friendly']},
      {t:'Entertainment', checks:['TV','Netflix','Game console']},
      {t:'Outdoor', checks:['BBQ grill','Patio','Private garden']},
      {t:'Parking', checks:['On-site','Street','Paid garage']},
    ];
    const grid = $('#filterGrid',d);
    GROUPS.forEach((g,gi)=>{
      const box=document.createElement('div'); box.className='box';
      box.innerHTML=`<h4>${g.t}</h4>`; grid.appendChild(box);
      if(g.kind==='price'){
        // ==== [Filters: price label currency formatting] ====================
        box.insertAdjacentHTML('beforeend',`
          <div style="display:grid;gap:10px">
            <div style="display:flex;justify-content:space-between;font-size:13px">
              <span>Price per night</span>
              <span><span id="priceMinVal">100</span> ~ <span id="priceMaxVal">800</span></span>
            </div>
            <label style="font-size:12px;opacity:.8">Min</label>
            <input type="range" id="priceMin" min="0" max="1000" step="10" value="100">
            <label style="font-size:12px;opacity:.8">Max</label>
            <input type="range" id="priceMax" min="0" max="5000" step="50" value="800">
          </div>`);
        // ===================================================================
      }
      (g.inputs||[]).forEach(([type,id,attrs])=>{
        const wrap=document.createElement('div'); wrap.style.margin='6px 0';
        wrap.innerHTML=`<label style="font-size:12px">${id}</label><input class="input" type="${type}" id="${id}" style="width:100%">`;
        Object.entries(attrs||{}).forEach(([k,v])=>wrap.querySelector('input').setAttribute(k,v));
        box.appendChild(wrap);
      });
      (g.radios||[]).forEach((name,ri)=>{
        const id=`rg_${gi}_${ri}`; const lab=document.createElement('label'); lab.style.cssText='display:inline-flex;align-items:center;gap:6px;margin:6px 10px 0 0';
        lab.innerHTML=`<input type="radio" name="rg_${gi}" id="${id}" ${/Any/i.test(name)?'checked':''}> ${name}`; box.appendChild(lab);
      });
      (g.checks||[]).forEach((name,ci)=>{
        const id=`ck_${gi}_${ci}`; const lab=document.createElement('label'); lab.style.cssText='display:inline-flex;align-items:center;gap:6px;margin:6px 10px 0 0';
        lab.innerHTML=`<input type="checkbox" id="${id}"> ${name}`; box.appendChild(lab);
      });
    });

    const close=()=>{d.setAttribute('aria-hidden','true');};
    on($('.back',d),'click',close);
    on($('#swClose',d),'click',close);

    // 가격라벨 포맷터
    window.refreshFilterPriceLabels = function refreshFilterPriceLabels(){
      const minEl = $('#priceMin',d), maxEl = $('#priceMax',d);
      if(!minEl || !maxEl) return;
      const minUsd = parseFloat(minEl.value || '0');
      const maxUsd = parseFloat(maxEl.value || '0');
      $('#priceMinVal',d).textContent = nf.format(usdToDisplay(minUsd));
      $('#priceMaxVal',d).textContent = nf.format(usdToDisplay(maxUsd));
    };

    on($('#swReset',d),'click',()=>{
      $$('input[type=checkbox]',d).forEach(i=>i.checked=false);
      $$('input[type=radio]',d).forEach(i=>i.checked=/Any/i.test(i.nextSibling?.textContent||'Any'));
      $('#priceMin',d).value=100; $('#priceMax',d).value=800; // USD 기준
      refreshFilterPriceLabels();
      setBadge('');
    });

    on($('#swApply',d),'click',()=>{
      const n=$$('input[type=checkbox]:checked, input[type=radio]:checked',d).length;
      setBadge(n?n.toString():'');
      close();
      // 실제 필터링 로직이 카드에 data-* 붙어있다면 여기서 호출 가능
      if(typeof applyCardFilters === 'function') applyCardFilters();
    });

    on($('#priceMin',d),'input',()=>refreshFilterPriceLabels());
    on($('#priceMax',d),'input',()=>refreshFilterPriceLabels());

    function setBadge(text){
      const btn=$('#btnFilters'); if(!btn) return;
      btn.style.position='relative'; let b=btn.querySelector('.sw-badge');
      if(text){ if(!b){b=document.createElement('span'); b.className='sw-badge'; btn.appendChild(b);} b.textContent=text; } else { b?.remove(); }
    }

    const btn = $('#btnFilters');
    if(btn){ on(btn,'click',e=>{ e.stopPropagation(); d.setAttribute('aria-hidden','false'); refreshFilterPriceLabels(); }); }

    // 최초 1회 라벨 세팅
    refreshFilterPriceLabels();
  }

  // (선택) 카드 필터링 예시: 가격(USD), 평점, 거리, 무료취소
  window.applyCardFilters = function applyCardFilters(){
    const d = $('#filterDrawer');
    const minUsd = parseFloat($('#priceMin',d)?.value || '0');
    const maxUsd = parseFloat($('#priceMax',d)?.value || '999999');

    $$('.hotel-card').forEach(card=>{
      const priceUsd = parseFloat(card.getAttribute('data-price-usd') || '0');
      const ok = priceUsd >= minUsd && priceUsd <= maxUsd;
      card.classList.toggle('hide', !ok);
    });
  };

  /* -------- 지도 -------- */
  function initMapIfNeeded(){
    const mapEl = $('#map'); if(!mapEl) return;
    const map = L.map('map',{scrollWheelZoom:true}).setView([48.8566,2.3522],12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
    // [ADD] 팝업 열릴 때 번역키 적용
    if(map.on && typeof applyI18NPage === 'function'){
      map.on('popupopen', ()=> applyI18NPage());
    }
    window.__swMap = map;
  }

  // ==== [Language change wiring] ============================================
  function wireLanguageSelect(){
    const sel = $('#langSelect');
    if(!sel) return;
    sel.value = currentLang;
    on(sel, 'change', ()=>{
      const lang = sel.value;
      // 네가 쓰는 i18n 적용
      if(window.StayWorldI18n?.applyLang) StayWorldI18n.applyLang(lang);
      onLanguageChange(lang);
      // [ADD] 카드 라벨/가격 즉시 재적용
      afterListRendered(document);
    });
  }
  // ==========================================================================

  /* ===== [ADD] 카드 자동 현지화(템플릿 없어도 동작) ===================== */
  function localizeCards(root=document){
    // 버튼/라벨에 키 자동 부착 (중복부착 방지)
    root.querySelectorAll('.card .btn.book, .card a.book, .card .book, a.btn.gold.book').forEach(el=>{
      if(!el.hasAttribute('data-i18n')) el.setAttribute('data-i18n','buttons.book');
    });
    root.querySelectorAll('.card .tax, .card .per-night, .card .price-unit').forEach(el=>{
      if(!el.hasAttribute('data-i18n')) el.setAttribute('data-i18n','labels.perNight');
    });
    // 가격 업데이트
    refreshAllPrices();
    // 번역 적용
    if (typeof applyI18NPage === 'function') applyI18NPage();
  }
  function afterListRendered(root=document){ localizeCards(root); }
  /* ====================================================================== */

  // [ADD] 동적 리스트 자동 감지 (예: Ajax로 카드 갱신 시)
  function watchList(){
    const list = document.getElementById('list');
    if(!list) return;
    new MutationObserver(()=> afterListRendered(list))
      .observe(list, {childList:true, subtree:true});
  }

  /* -------- 페이지 초기화 -------- */
  function init(){
    renderHeader();
    renderFooter();
    bindAuthHeader();
    ensureChat();
    ensureFilters();
    initMapIfNeeded();

    // i18n 초기 적용
    if(window.StayWorldI18n?.applyLang){
      const saved = localStorage.getItem("sw_lang") || (navigator.language||"en").slice(0,2).toLowerCase();
      const final = ['en','ko','tr','fr','ja','de','es','it','zh','ru'].includes(saved) ? saved : 'en';
      StayWorldI18n.applyLang(final);
      onLanguageChange(final);   // 통화/가격/라벨 싱크
    } else {
      // [ADD] 기본 적용
      if(typeof applyI18NPage === 'function'){
        applyI18NPage(currentLang);
        onLanguageChange(currentLang);
      }
    }

    wireLanguageSelect();
    refreshAllPrices();          // 페이지 내 가격 텍스트 초기 표기
    afterListRendered(document); // [ADD] 페이지 최초 카드 현지화
    watchList();                 // [ADD] 동적 갱신 감시
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();

/* ================== [ADD] Favorites(찜) + MyPage ================== */
(function(){
  // Firebase/전역 브릿지와 연동 (네 환경 변수명 우선)
  const auth = (typeof firebaseAuth !== 'undefined') ? firebaseAuth : (window._sw?.auth || null);
  const db   = (typeof firebaseDB   !== 'undefined') ? firebaseDB   : (window._sw?.db   || null);
  const useFirestore = !!(auth && db && db.collection);

  // 저장소: Firestore(있으면) / LocalStorage(없으면)
  const FavStore = {
    key(uid){ return `sw:favs:${uid || 'guest'}`; },
    async getAll(uid){
      if(useFirestore && auth.currentUser){
        const snap = await db.collection('users').doc(uid).collection('favorites').get();
        return snap.docs.map(d=>d.id);
      }
      try{ return JSON.parse(localStorage.getItem(this.key(uid))||'[]'); }catch{ return []; }
    },
    async set(uid, ids){
      if(useFirestore && auth.currentUser){
        const col = db.collection('users').doc(uid).collection('favorites');
        const snap = await col.get();
        const batch = db.batch();
        snap.docs.forEach(d=>batch.delete(d.ref));
        ids.forEach(id=>batch.set(col.doc(id), {addedAt: Date.now()}));
        await batch.commit();
        return;
      }
      localStorage.setItem(this.key(uid), JSON.stringify(ids));
    }
  };

  // 상태 & 엘리먼트
  let favSet = new Set();
  const $btnMyPage = document.getElementById('btnMyPage');
  const $secMy     = document.getElementById('mypage');
  const $favList   = document.getElementById('favList');
  let favMap, starIcon;

  function showSection(id){
    if(!$secMy) return;
    if(id === 'mypage'){ $secMy.style.display=''; renderMyPage(); }
    else { $secMy.style.display='none'; }
  }
  $btnMyPage?.addEventListener('click', ()=> showSection('mypage'));

  async function initFavState(){
    const uid = auth?.currentUser?.uid || 'guest';
    const ids = await FavStore.getAll(uid);
    favSet = new Set(ids);
    syncFavIcons();
    if(localStorage.getItem('sw_logged_in') === 'true' || auth?.currentUser) showSection('mypage');
  }

  function refreshMyPageBtn(){
    const logged = (localStorage.getItem('sw_logged_in') === 'true') || !!auth?.currentUser;
    if($btnMyPage) $btnMyPage.style.display = logged ? '' : 'none';
  }

  if(auth && typeof auth.onAuthStateChanged === 'function'){
    auth.onAuthStateChanged(()=>{ refreshMyPageBtn(); initFavState(); });
  }

  document.addEventListener('DOMContentLoaded', ()=>{ refreshMyPageBtn(); initFavState(); });

  function bindFavButtons(root=document){
    root.querySelectorAll('.fav-btn').forEach(btn=>{
      if(btn._bound) return; btn._bound = true;
      btn.addEventListener('click', async (e)=>{
        const id = e.currentTarget.dataset.id;
        if(!id) return;
        if(favSet.has(id)) favSet.delete(id); else favSet.add(id);
        e.currentTarget.setAttribute('data-active', favSet.has(id));
        const uid = auth?.currentUser?.uid || 'guest';
        await FavStore.set(uid, [...favSet]);
        if($secMy && $secMy.style.display !== 'none') renderMyPage();
      });
    });
  }
  function syncFavIcons(root=document){
    root.querySelectorAll('.fav-btn').forEach(btn=>{
      const id = btn.dataset.id;
      btn.setAttribute('data-active', favSet.has(id));
    });
  }

  function ensureFavMap(){
    if(favMap) return favMap;
    const el = document.getElementById('favMap');
    if(!el || !window.L) return null;
    favMap = L.map('favMap').setView([41.0082,28.9784], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(favMap);
    starIcon = L.divIcon({className:'leaflet-div-icon star', iconSize:[34,34], iconAnchor:[17,17]});
    return favMap;
  }
  function renderMyPage(){
    if(!$secMy) return;
    const stays = window.stays || [
      {id:'par-001', name:'Paris Center',      city:'Paris',    price:180, lat:48.8566, lng:2.3522},
      {id:'ist-002', name:'Bosphorus View',    city:'Istanbul', price:120, lat:41.0082, lng:28.9784},
      {id:'sel-003', name:'Gangnam Skyline',   city:'Seoul',    price:130, lat:37.5665, lng:126.9780},
    ];
    const picked = stays.filter(s=>favSet.has(s.id));

    if($favList){
      if(!picked.length){
        $favList.innerHTML = `<div class="fav-empty" style="color:var(--muted)">No favorites yet. Click ★ on a stay.</div>`;
      }else{
        $favList.innerHTML = picked.map(s=>`
          <div class="fav-row">
            <div>
              <div class="fav-title">${s.name}</div>
              <div class="fav-meta">${s.city} · $${s.price}/night</div>
            </div>
            <button class="fav-btn" data-id="${s.id}" data-active="true" title="Unfavorite">★</button>
          </div>`).join('');
        bindFavButtons($favList);
      }
    }

    const map = ensureFavMap();
    if(map){
      const toRemove = [];
      map.eachLayer(l=>{ if(l instanceof L.Marker) toRemove.push(l); });
      toRemove.forEach(m=>map.removeLayer(m));
      const markers = [];
      picked.forEach(s=>{
        if(typeof s.lat !== 'number' || typeof s.lng !== 'number') return;
        const mk = L.marker([s.lat, s.lng], {icon: starIcon})
          .addTo(map).bindPopup(`<b>${s.name}</b><br>${s.city}`);
        markers.push(mk);
      });
      if(markers.length){
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.2));
      }
    }
  }

  window.SW_bindFavButtons = bindFavButtons;
  window.SW_syncFavIcons  = syncFavIcons;
})();
