const data = [
  {stage:'Доверие vs недоверие',      age:'0–2',   years:'1998–2000', score:78, col:'#3ddc7a', badge:'resolved',   bl:'Закрыта'},
  {stage:'Автономия vs стыд',          age:'2–4',   years:'2000–2002', score:72, col:'#3ddc7a', badge:'resolved',   bl:'Закрыта'},
  {stage:'Инициатива vs вина',         age:'4–6',   years:'2002–2004', score:68, col:'#f0c040', badge:'partial',    bl:'Частично'},
  {stage:'Трудолюбие vs неполн.',      age:'6–12',  years:'2004–2010', score:81, col:'#3ddc7a', badge:'resolved',   bl:'Закрыта'},
  {stage:'Идентичность vs диффузия',   age:'12–19', years:'2010–2017', score:58, col:'#f0c040', badge:'partial',    bl:'Частично'},
  {stage:'Близость vs изоляция',       age:'20–40', years:'2018–2036', score:41, col:'#ff5e7a', badge:'unresolved', bl:'⚠ В работе'},
  {stage:'Генеративность',             age:'40–65', years:'2038–2063', score:15, col:'#8b6fff', badge:'future',     bl:'Будущее'},
];

export function initErikson() {
  const w = document.getElementById('eriksonWrap');
  data.forEach(d => {
    const r = document.createElement('div');
    r.className = 'mrow';
    r.innerHTML = `<div class="m-age">${d.age}<br><span style="font-size:8px;color:var(--dim)">${d.years}</span></div>
    <div class="m-track"><div class="mbar-fill" style="width:${d.score}%;background:${d.col}22;color:${d.col}">${d.stage}</div></div>
    <div class="m-badge ${d.badge}">${d.bl}</div>`;
    w.appendChild(r);
  });
}
