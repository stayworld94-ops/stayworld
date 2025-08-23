// assets/load-css.js
(function() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "styles/style.css?v=1";  // 공통 CSS
  document.head.appendChild(link);
})();
