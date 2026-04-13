import { maslowNames, maslowCols } from '../data/periods.js';

const defaultData = [
  {n:5, name:'Самоактуализация', sub:'Реализация',              score:52, ev:6,  col:'#8b6fff'},
  {n:4, name:'Уважение',         sub:'Достижения, признание',   score:71, ev:12, col:'#3ddc7a'},
  {n:3, name:'Принадлежность',   sub:'Отношения, сообщество',   score:44, ev:9,  col:'#00c9b8'},
  {n:2, name:'Безопасность',     sub:'Стабильность, здоровье',  score:63, ev:8,  col:'#f0c040'},
  {n:1, name:'Физиологические',  sub:'Базовые потребности',     score:85, ev:5,  col:'#ff8f3c'},
];

function renderRows(wrap, rows) {
  wrap.innerHTML = '';
  rows.forEach(d => {
    const r = document.createElement('div');
    r.className = 'mrow';
    r.innerHTML = `<div style="font-size:10px;color:var(--dim);width:16px;text-align:center;flex-shrink:0;font-weight:700">${d.n}</div>
    <div class="m-track"><div class="mbar-fill" style="width:${d.score}%;background:${d.col}22;color:${d.col}">${d.name}</div></div>
    <div class="m-pct" style="color:${d.col}">${d.score}%</div>
    <div class="m-ev">${d.ev} соб.</div>`;
    wrap.appendChild(r);
  });
}

export function initMaslow() {
  renderRows(document.getElementById('maslowWrap'), defaultData);
}

export function renderMaslow(periodRows) {
  const wrap = document.getElementById('maslowWrap');
  const rows = periodRows.slice().reverse().map((m, ri) => {
    const i = 4 - ri;
    return { n: i + 1, name: maslowNames[i], col: maslowCols[i], score: m.score, ev: m.ev };
  });
  renderRows(wrap, rows);
}
