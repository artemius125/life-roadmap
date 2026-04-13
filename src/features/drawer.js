import { drawerDB } from '../data/events.js';

const catLabels = { ach:'🏆 Достижение', ski:'⚡ Навык', los:'💔 Потеря', fai:'🌪 Поражение', tra:'🧠 Психотравма', rel:'❤️ Отношения', edu:'🎓 Образование', ins:'💡 Озарение' };
const catCols   = { ach:'#3ddc7a', ski:'#8b6fff', los:'#ff5e7a', fai:'#ff8f3c', tra:'#c084fc', rel:'#00c9b8', edu:'#f0c040', ins:'#67e8f9' };

export function openDrawer(el) {
  const id = el.id;
  const title  = el.querySelector('.ev-ti')?.textContent || '';
  const date   = el.querySelector('.ev-dt')?.textContent || '';
  const desc   = el.querySelector('.ev-bd')?.textContent || '';
  const impact = parseFloat(el.dataset.impact || 5);
  const impCol = impact >= 7 ? '#3ddc7a' : impact >= 5 ? '#f0c040' : '#ff5e7a';
  const catMatch = el.className.match(/c-(\w+)/);
  const catKey = catMatch ? catMatch[1] : 'ins';
  const db = drawerDB[id] || null;

  document.getElementById('dCat').textContent = db ? db.cat.label : (catLabels[catKey] || 'Событие');
  document.getElementById('dCat').style.cssText = `color:${db ? db.cat.col : catCols[catKey]};border-color:${db ? db.cat.col + '55' : catCols[catKey] + '55'}`;
  document.getElementById('dTitle').textContent = title;
  document.getElementById('dDate').textContent  = date;
  document.getElementById('dDesc').textContent  = db ? db.desc : desc;
  document.getElementById('dImpFill').style.cssText = `width:${impact/10*100}%;background:${impCol}`;
  document.getElementById('dImpNum').style.color = impCol;
  document.getElementById('dImpNum').textContent = impact + '/10';

  const dm = document.getElementById('dMetrics'); dm.innerHTML = '';
  const metrics = db ? db.metrics : [{k:'Вес события', v: impact + '/10'}];
  metrics.forEach(m => {
    const d2 = document.createElement('div'); d2.className = 'dm2';
    d2.innerHTML = `<div class="dm2-k">${m.k}</div><div class="dm2-v">${m.v}</div>`;
    dm.appendChild(d2);
  });

  document.getElementById('dAi').innerHTML = db ? db.ai : '<strong>AI-анализ</strong> будет доступен после добавления события в систему.';

  const dc = document.getElementById('dCauses'); dc.innerHTML = '';
  (db ? db.causes : []).forEach(c => {
    const d3 = document.createElement('div'); d3.className = 'd-ci';
    d3.innerHTML = `<span class="d-arrow">→</span><span class="d-ct">${c.replace(/^[←→]\s*/, '<strong>').replace(/\s\(/, ' (')}</span>`;
    dc.appendChild(d3);
  });

  document.getElementById('drawerOverlay').classList.add('open');
}

export function closeDrawer() {
  document.getElementById('drawerOverlay').classList.remove('open');
}
