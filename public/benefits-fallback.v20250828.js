// Fallback: membership 스크립트가 실패/캐시/차단되어도 레벨 혜택을 강제 주입
(function(){
  const MAP = {
    Bronze:   ['—'],
    Silver:   ['3% points back'],
    Gold:     ['5% points back','Priority support'],
    Platinum: ['7% points back','Priority support','Early check-in/late out'],
    Diamond:  ['10% points back','Priority support','Secret Deals+'],
    Elite:    ['15% points back','Priority support','Secret Deals+','Upgrades when available']
  };

  function ensureBasics(){
    const dw = document.getElementById('dwTop');
    if (dw && !dw.textContent) dw.textContent = 'No booking for 60 days → auto demotion by 1 level (notification sent).';
    const t = document.getElementById('mb_title');
    if (t && !t.textContent) t.textContent = 'Membership + Levels (Stacked Benefits)';
    const st = document.getElementById('mb_subtitle');
    if (st && !st.textContent) st.textContent = 'Membership gives instant perks; levels reward long-term activity. Use both for maximum value.';
  }

  function inject(){
    ensureBasics();
    document.querySelectorAll('.tier-card[data-tier]').forEach(card=>{
      const tier = card.getAttribute('data-tier');
      const box  = card.querySelector('.benefits');
      if(!box) return;
      if(box.children.length > 0) return; // membership.js가 이미 채웠으면 건너뜀
      const items = MAP[tier] || [];
      box.innerHTML = items.map(t=>`<div class="benefit"><i>•</i><div>${t}</div></div>`).join('');
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
