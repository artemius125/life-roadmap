function getLabel(val) {
  if (val >= 3) return 'Высокая наполненность смыслом';
  if (val >= 1) return 'Умеренная наполненность';
  if (val >= -1) return 'Нейтрально';
  if (val >= -3) return 'Дефицит смысла';
  return 'Экзистенциальная пустота';
}

function buildExist(wrap, val) {
  const pct = ((val + 5) / 10) * 100;
  const col = val > 1 ? '#3ddc7a' : val < -1 ? '#ff5e7a' : '#f0c040';
  const label = getLabel(val);
  wrap.innerHTML = `
  <div class="exist-val" style="color:${col}">${val > 0 ? '+' : ''}${val}</div>
  <div style="font-size:11px;font-weight:700;color:${col};margin-bottom:4px">${label}</div>
  <div style="font-size:10px;color:var(--dim);margin-bottom:16px;line-height:1.5">Действия в основном соответствуют внутренним ценностям и жизненным смыслам.</div>
  <div class="exist-track">
    <div class="exist-ptr" style="left:${pct}%"></div>
  </div>
  <div class="exist-labels"><span>−5 · Пустота</span><span>0</span><span>+5 · Смысл</span></div>
  <div style="margin-top:12px;font-size:9px;color:var(--dim);line-height:1.5">Вектор: смерть отца → переосмысление → поиск смысла через действие и путешествия.</div>`;
}

export function initExist() {
  buildExist(document.getElementById('existWrap'), 2.8);
}

export function renderExist(val) {
  buildExist(document.getElementById('existWrap'), val);
}
