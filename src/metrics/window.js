const zones = [
  {name:'Гипервозбуждение',   pct:18, col:'#ff5e7a', desc:'Тревога, паника, гнев'},
  {name:'Окно толерантности', pct:58, col:'#3ddc7a', desc:'Оптимальное возбуждение'},
  {name:'Гиповозбуждение',    pct:24, col:'#8b6fff', desc:'Апатия, диссоциация, оцепенение'},
];

export function initWindow() {
  const w = document.getElementById('windowWrap');
  const zonesHtml = zones.map(z => `
  <div class="wt-zone" style="background:${z.col}12;border:1px solid ${z.col}30">
    <div>
      <div class="wt-zone-nm" style="color:${z.col}">${z.name}</div>
      <div class="wt-zone-sub" style="color:${z.col}99">${z.desc}</div>
    </div>
    <div class="wt-zone-pct" style="color:${z.col}">${z.pct}%</div>
  </div>`).join('');
  w.innerHTML = `<div class="wt-zones">${zonesHtml}</div>
  <div style="display:flex;align-items:baseline;gap:8px">
    <span style="font-size:38px;font-weight:900;color:#3ddc7a;letter-spacing:-2px">58%</span>
    <span style="font-size:10px;color:var(--dim);line-height:1.4">времени<br>в окне толерантности</span>
  </div>`;
}
