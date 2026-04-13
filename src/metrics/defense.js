const data = [
  {level:4, name:'Зрелые',       examples:'Альтруизм, юмор, сублимация, предвосхищение',        score:62, col:'#3ddc7a'},
  {level:3, name:'Невротические', examples:'Вытеснение, рационализация, реактивное образование', score:24, col:'#f0c040'},
  {level:2, name:'Незрелые',      examples:'Пассивная агрессия, идеализация, разыгрывание',      score:11, col:'#ff8f3c'},
  {level:1, name:'Психотические', examples:'Проекция, отрицание, искажение реальности',          score:3,  col:'#ff5e7a'},
];

export function initDefense() {
  const w = document.getElementById('defenseWrap');
  const mx = Math.max(...data.map(d => d.score));
  data.forEach(d => {
    const r = document.createElement('div'); r.className = 'def-row';
    r.innerHTML = `<div class="def-lvl" style="color:${d.col}">${d.level}</div>
    <div class="def-info">
      <div class="def-name" style="color:${d.col}">${d.name}</div>
      <div class="def-ex">${d.examples}</div>
      <div class="def-bar" style="width:${d.score/mx*100}%;background:${d.col}55"></div>
    </div>
    <div class="def-pct" style="color:${d.col}">${d.score}%</div>`;
    w.appendChild(r);
  });
}
