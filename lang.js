
document.addEventListener('DOMContentLoaded', () => {
  const langMap = {
    "search-title": {
      en: "Where do you want to go?",
      ko: "어디로 떠나시겠어요?",
      fr: "Où voulez-vous aller ?",
      tr: "Nereye gitmek istersiniz?",
      ja: "どこに行きたいですか？",
      es: "¿A dónde quieres ir?",
      de: "Wohin möchten Sie gehen?",
      ru: "Куда вы хотите поехать?",
      it: "Dove vuoi andare?",
      zh: "你想去哪里？"
    },
    "search-button": {
      en: "Search",
      ko: "검색",
      fr: "Chercher",
      tr: "Ara",
      ja: "検索",
      es: "Buscar",
      de: "Suchen",
      ru: "Поиск",
      it: "Cerca",
      zh: "搜索"
    },
    "map-title": {
      en: "Map",
      ko: "지도",
      fr: "Carte",
      tr: "Harita",
      ja: "地図",
      es: "Mapa",
      de: "Karte",
      ru: "Карта",
      it: "Mappa",
      zh: "地图"
    },
    "recommendations-title": {
      en: "Recommended Places",
      ko: "추천 장소",
      fr: "Lieux recommandés",
      tr: "Önerilen Yerler",
      ja: "おすすめの場所",
      es: "Lugares recomendados",
      de: "Empfohlene Orte",
      ru: "Рекомендуемые места",
      it: "Luoghi consigliati",
      zh: "推荐地点"
    }
  };

  const selector = document.getElementById("language-selector");
  selector.addEventListener("change", (e) => {
    const lang = e.target.value;
    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.getAttribute("data-translate");
      if (langMap[key] && langMap[key][lang]) {
        el.textContent = langMap[key][lang];
      }
    });
  });
});
