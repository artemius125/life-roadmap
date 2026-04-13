const data = [
  {name:'Родитель', pct:28, col:'#f0c040', desc:'Критика, правила, забота'},
  {name:'Взрослый', pct:51, col:'#3ddc7a', desc:'Анализ, факты, решения'},
  {name:'Ребёнок',  pct:21, col:'#8b6fff', desc:'Эмоции, импульсы, творчество'},
];

export function initEgo() {
  const w = document.getElementById('egoWrap');

  const bar = document.createElement('div'); bar.className = 'ego-bar';
  data.forEach(d => {
    const seg = document.createElement('div'); seg.className = 'ego-seg';
    seg.style.cssText = `flex:${d.pct};background:${d.col}`;
    seg.textContent = d.pct > 14 ? `${d.pct}%` : '';
    bar.appendChild(seg);
  });
  w.appendChild(bar);

  const leg = document.createElement('div'); leg.className = 'ego-leg';
  data.forEach(d => {
    const li = document.createElement('div'); li.className = 'ego-li';
    li.innerHTML = `<div class="ego-dot" style="background:${d.col}"></div>
    <div style="flex:1"><div class="ego-nm" style="color:var(--text);font-weight:600">${d.name}</div><div style="font-size:9px;color:var(--dim)">${d.desc}</div></div>
    <div class="ego-pct" style="color:${d.col}">${d.pct}%</div>`;
    leg.appendChild(li);
  });
  w.appendChild(leg);

  const note = document.createElement('div');
  note.style.cssText = 'margin-top:12px;font-size:10px;color:var(--dim);padding:8px 10px;background:rgba(61,220,122,.06);border-radius:8px;border:1px solid rgba(61,220,122,.18);line-height:1.5';
  note.innerHTML = 'Доминирует <strong style="color:#3ddc7a">Взрослый</strong> — рациональная, ответственная позиция с достаточной эмоциональной гибкостью.';
  w.appendChild(note);
}
