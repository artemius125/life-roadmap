const descs = ['Отсутствует','Отказ','Дезорганизованное','Схематичное','Базовое','Среднее','Хорошее','Высокое','Отличное','Исключительное'];

function buildRf(wrap, val, max = 9) {
  const col = '#8b6fff';
  wrap.innerHTML = `
  <div class="rf-big" style="color:${col}">${val}<span style="font-size:14px;font-weight:400;color:var(--dim)">/${max}</span></div>
  <div style="font-size:11px;font-weight:700;color:${col};margin:4px 0 2px">${descs[val]} уровень</div>
  <div style="font-size:10px;color:var(--dim);line-height:1.5;margin-bottom:12px">Способность распознавать свои и чужие мотивы, намерения, эмоции.</div>
  <div class="rf-scale">
    ${Array.from({length:max}, (_, i) => `<div class="rf-pip" style="background:${i < val ? (i === val - 1 ? col : col + '66') : 'rgba(255,255,255,.06)'}"></div>`).join('')}
  </div>
  <div class="rf-labels"><span>0 · Нет</span><span>9 · Исключит.</span></div>`;
}

export function initRf() {
  buildRf(document.getElementById('rfWrap'), 6);
}

export function renderRf(val) {
  const wrap = document.getElementById('rfWrap');
  buildRf(wrap, val);
}
