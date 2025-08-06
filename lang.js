document.addEventListener("DOMContentLoaded", () => {
  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      document.querySelectorAll("[data-lang-text]").forEach(el => {
        el.innerText = translations[lang][el.dataset.langText] || el.innerText;
      });
    });
  });
});

const translations = {
  ko: {
    welcome: "StayWorld에 오신 것을 환영합니다!",
    desc: "전 세계 숙소 예약과 프리미엄 혜택을 누리세요."
  },
  en: {
    welcome: "Welcome to StayWorld!",
    desc: "Book global stays and enjoy premium benefits."
  },
  fr: {
    welcome: "Bienvenue chez StayWorld!",
    desc: "Réservez dans le monde entier et profitez des avantages premium."
  },
  ja: {
    welcome: "StayWorldへようこそ！",
    desc: "世界中の宿泊施設を予約し、特典を楽しもう。"
  },
  tr: {
    welcome: "StayWorld'e Hoşgeldiniz!",
    desc: "Dünyanın her yerinde konaklayın, ayrıcalıkların tadını çıkarın."
  }
};