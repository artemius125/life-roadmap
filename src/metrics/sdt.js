const defaultData = [
  {ic:'🧭', name:'Автономность',         sub:'Самоопределение, свобода выбора',     val:7.8, col:'#3ddc7a'},
  {ic:'💪', name:'Компетентность',        sub:'Мастерство, рост, эффективность',     val:7.1, col:'#8b6fff'},
  {ic:'🤝', name:'Социальная связанность', sub:'Принадлежность, близость, доверие', val:4.4, col:'#00c9b8'},
];

function renderRows(wrap, rows) {
  // clear existing rows but keep the note if present
  wrap.querySelectorAll('.sdt-row').forEach(r => r.remove());
  const note = wrap.querySelector('div:not(.sdt-row)');
  rows.forEach(d => {
    const r = document.createElement('div'); r.className = 'sdt-row';
    r.innerHTML = `<div class="sdt-ic">${d.ic}</div>
    <div class="sdt-info">
      <div class="sdt-nm">${d.name} <span style="font-size:9px;color:var(--dim);font-weight:400">&nbsp;${d.sub}</span></div>
      <div class="sdt-track"><div class="sdt-fill" style="width:${d.val/10*100}%;background:${d.col}"></div></div>
    </div>
    <div class="sdt-val" style="color:${d.col}">${d.val}</div>`;
    if (note) wrap.insertBefore(r, note);
    else wrap.appendChild(r);
  });
}

export function initSdt() {
  const w = document.getElementById('sdtWrap');
  defaultData.forEach(d => {
    const r = document.createElement('div'); r.className = 'sdt-row';
    r.innerHTML = `<div class="sdt-ic">${d.ic}</div>
    <div class="sdt-info">
      <div class="sdt-nm">${d.name} <span style="font-size:9px;color:var(--dim);font-weight:400">&nbsp;${d.sub}</span></div>
      <div class="sdt-track"><div class="sdt-fill" style="width:${d.val/10*100}%;background:${d.col}"></div></div>
    </div>
    <div class="sdt-val" style="color:${d.col}">${d.val}</div>`;
    w.appendChild(r);
  });
  const note = document.createElement('div');
  note.style.cssText = 'margin-top:4px;font-size:10px;padding:9px 12px;background:rgba(0,201,184,.06);border-radius:8px;border:1px solid rgba(0,201,184,.22);line-height:1.5';
  note.innerHTML = '⚠️ <strong style="color:#00c9b8">Дефицит связанности</strong> ограничивает качество мотивации. Высокая автономность без сообщества создаёт риск изоляции.';
  w.appendChild(note);
}

export function renderSdt(vals) {
  const sdtFills = document.querySelectorAll('.sdt-fill');
  const sdtVals = document.querySelectorAll('.sdt-val');
  if (sdtFills.length >= 3) {
    [0, 1, 2].forEach(i => {
      sdtFills[i].style.width = (vals[i] / 10 * 100) + '%';
      sdtVals[i].textContent = vals[i];
    });
  }
}
