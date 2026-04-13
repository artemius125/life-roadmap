export function initLocus() {
  const val = 7.2, pct = (val / 10) * 100, col = '#3ddc7a';
  const w = document.getElementById('locusWrap');
  w.innerHTML = `
  <div style="font-size:13px;color:var(--dim);margin-bottom:14px">Доминирует <strong style="color:${col}">интернальный</strong> локус — личная ответственность за события жизни.</div>
  <div class="locus-wrap">
    <div class="locus-track" style="margin-bottom:28px">
      <div class="locus-ptr" style="left:${pct}%">
        <div class="locus-val-big" style="color:${col}">${val}</div>
        <div class="locus-tick" style="background:${col}"></div>
      </div>
      <div class="locus-grad"></div>
    </div>
    <div class="locus-labels"><span>0 · Экстернальный</span><span>10 · Интернальный</span></div>
  </div>
  <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
    <div style="flex:1;min-width:90px;padding:8px 10px;border-radius:8px;background:rgba(255,94,122,.08);border:1px solid rgba(255,94,122,.2);font-size:9px;color:#ff8fa3;line-height:1.5"><strong style="display:block;margin-bottom:2px">Экстерн. (0–4)</strong>Судьба, везение, внешние силы</div>
    <div style="flex:1;min-width:90px;padding:8px 10px;border-radius:8px;background:rgba(61,220,122,.08);border:1px solid rgba(61,220,122,.2);font-size:9px;color:#3ddc7a;line-height:1.5"><strong style="display:block;margin-bottom:2px">Интерн. (6–10)</strong>Личные решения, усилия, навыки</div>
  </div>`;
}

export function renderLocus(val) {
  const pct = (val / 10) * 100;
  const col = val >= 6 ? '#3ddc7a' : val >= 4 ? '#f0c040' : '#ff5e7a';
  const ptr = document.querySelector('.locus-ptr');
  const big = document.querySelector('.locus-val-big');
  if (ptr) ptr.style.left = pct + '%';
  if (big) { big.textContent = val; big.style.color = col; }
}
