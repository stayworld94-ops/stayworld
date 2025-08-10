// 10-language dictionary (keys kept short & reused throughout)
const I18N = {
  en: {
    nav_home: "Home", nav_search: "Search", nav_deals: "Deals",
    nav_membership: "Membership", nav_host: "Host", nav_support: "Support",
    login: "Log in", signup: "Sign up",
    hero_title: "Luxury stays. Global reach.",
    hero_sub: "Book verified stays worldwide with elite rewards and secure payments.",
    payment_all: "Cards & bank transfer",
    payment_crypto: "Crypto accepted (BTC, ETH, USDT)",
    filters: "Filters", search_btn: "Search",
    quick_title: "Popular:", weather_title: "Weather",
    weather_check: "Check",
    featured: "Featured stays for you",
    level_hint: "Earn points to level up for bigger rewards.",
    membership_title: "StayWorld+ Membership",
    membership_sub: "Level-based rewards. Keep status with activity—60 days of inactivity triggers a downgrade by 1 level.",
    ticket_free: "Free night ticket", ticket_discount: "Discount ticket",
    ticket_early: "Early check-in ticket", ticket_secret: "Secret deal ticket",
    cta_title: "Exclusive benefits by level",
    cta_sub: "Higher levels include all benefits of lower levels.",
    cta_join: "Join StayWorld+",
    host_title: "Host with confidence",
    host_sub: "ID verification required. Listings go live automatically after submission.",
    host_register: "Register your property",
    host_verify: "Start verification",
    support_title: "We’re here to help",
    ai_chat: "AI Concierge", ai_chat_sub: "Chat in your language—24/7.",
    open_bot: "Open bot",
    faq: "FAQ", faq_sub: "Common questions & answers",
    view_faq: "View FAQs",
    alerts: "Smart Alerts", alerts_sub: "Get notified for deals & level updates",
    alert_ai: "AI picks", alert_dest: "Top destinations", alert_level: "Level-up",
    filters_title: "Filter your stay",
    f_price: "Price per night", f_type: "Stay type", f_rating: "Review score",
    f_beds: "Beds", f_baths: "Baths", f_pets: "Pets", opt_allowed: "Allowed",
    f_checkin: "Check-in", opt_self: "Self check-in",
    f_amen: "Amenities", amen_kitchen: "Kitchen", amen_parking: "Parking",
    amen_pool: "Pool", amen_ac: "Air conditioning", amen_gym: "Gym",
    amen_workspace: "Workspace", amen_washer: "Washer", amen_dryer: "Dryer",
    f_booking: "Booking type", book_instant: "Instant book", book_request: "Request to book",
    f_verified: "Verification", opt_verified: "Verified listings only",
    f_longstay: "Long-stay discounts", opt_longstay: "Show long-stay deals",
    f_currency: "Currency", f_location: "Location", near_airport: "Near airport", near_station: "Near station",
    f_accessibility: "Accessibility", acc_stepfree: "Step-free access", acc_elevator: "Elevator",
    f_business: "Business", b2b_ready: "B2B-ready",
    f_experiences: "Experiences", exp_nature: "Nature", exp_camping: "Camping", exp_traditional: "Traditional",
    f_security: "Trust & safety", sec_verified: "Verified badge", sec_reviewed: "Verified reviews",
    f_more: "More filters",
    reset: "Reset", apply: "Apply"
  },
  ko: {
    nav_home: "홈", nav_search: "검색", nav_deals: "딜",
    nav_membership: "멤버십", nav_host: "호스트", nav_support: "고객센터",
    login: "로그인", signup: "회원가입",
    hero_title: "럭셔리 스테이, 글로벌 리치",
    hero_sub: "검증된 숙소를 전 세계에서 예약하세요. 엘리트 리워드와 안전한 결제 제공.",
    payment_all: "일반결제(카드/계좌)",
    payment_crypto: "암호화폐 결제 가능 (BTC, ETH, USDT)",
    filters: "필터", search_btn: "검색",
    quick_title: "인기:", weather_title: "날씨",
    weather_check: "확인",
    featured: "추천 숙소",
    level_hint: "포인트를 적립해 레벨을 올리고 더 큰 혜택을 받으세요.",
    membership_title: "StayWorld+ 멤버십",
    membership_sub: "레벨별 보상. 60일 미예약 시 1단계 자동 강등.",
    ticket_free: "무료 숙박 티켓", ticket_discount: "할인 티켓",
    ticket_early: "조기 체크인 티켓", ticket_secret: "시크릿 딜 티켓",
    cta_title: "레벨별 독점 혜택",
    cta_sub: "상위 레벨은 하위 레벨의 모든 혜택을 포함합니다.",
    cta_join: "멤버십 가입",
    host_title: "안심 호스팅",
    host_sub: "신분증 인증 필수. 등록 후 자동 활성화.",
    host_register: "숙소 등록", host_verify: "인증 시작",
    support_title: "도움이 필요하신가요?",
    ai_chat: "AI 컨시어지", ai_chat_sub: "원하는 언어로 24/7 상담.",
    open_bot: "봇 열기",
    faq: "FAQ", faq_sub: "자주 묻는 질문",
    view_faq: "FAQ 보기",
    alerts: "스마트 알림", alerts_sub: "딜·레벨 변경 알림",
    alert_ai: "AI 추천", alert_dest: "추천 여행지", alert_level: "레벨업",
    filters_title: "필터",
    f_price: "1박 가격", f_type: "숙소 유형", f_rating: "리뷰 점수",
    f_beds: "침대 수", f_baths: "욕실 수", f_pets: "반려동물", opt_allowed: "허용",
    f_checkin: "체크인", opt_self: "셀프 체크인",
    f_amen: "편의시설", amen_kitchen: "주방", amen_parking: "주차",
    amen_pool: "수영장", amen_ac: "에어컨", amen_gym: "헬스장",
    amen_workspace: "업무공간", amen_washer: "세탁기", amen_dryer: "건조기",
    f_booking: "예약 유형", book_instant: "즉시 예약", book_request: "승인 예약",
    f_verified: "검증", opt_verified: "검증 숙소만",
    f_longstay: "장기 숙박 할인", opt_longstay: "장기 혜택 보기",
    f_currency: "통화", f_location: "위치", near_airport: "공항 인근", near_station: "역 인근",
    f_accessibility: "접근성", acc_stepfree: "무단차", acc_elevator: "엘리베이터",
    f_business: "비즈니스", b2b_ready: "B2B 대응",
    f_experiences: "체험형", exp_nature: "자연", exp_camping: "캠핑", exp_traditional: "전통",
    f_security: "신뢰·안전", sec_verified: "인증 배지", sec_reviewed: "검증 리뷰",
    f_more: "추가 필터",
    reset: "초기화", apply: "적용"
  },
  fr: { /* trimmed for brevity in this file; will fallback to en if key missing */ },
  tr: {}, ja: {}, de: {}, es: {}, ru: {}, it: {}, zh: {}
};

const LEVELS = [
  {name:"BRONZE", threshold:0,    benefits:["Basic access"]},
  {name:"SILVER", threshold:500000, benefits:["3% points on first booking"]},
  {name:"GOLD", threshold:2000000, benefits:["5% points","Priority support"]},
  {name:"PLATINUM", threshold:4000000, benefits:["7% points","Seasonal discounts"]},
  {name:"DIAMOND", threshold:7500000, benefits:["10% points","Exclusive coupons","Priority CS"]},
  {name:"ELITE", threshold:15000000, benefits:["15% points","Private deals","Priority emergency"]}
];

// simple i18n apply
function applyI18N(lang){
  const dict = {...I18N['en'], ...(I18N[lang]||{})};
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[key]) el.textContent = dict[key];
  });
}

window.I18N = I18N;
window.LEVELS = LEVELS;