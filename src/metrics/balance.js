const data = [
  {n:'Карьера',  p:80, col:'#3ddc7a'},
  {n:'Отношения',p:45, col:'#00c9b8'},
  {n:'Здоровье', p:60, col:'#f0c040'},
  {n:'Обучение', p:85, col:'#8b6fff'},
  {n:'Семья',    p:35, col:'#ff8fa3'},
];

export function initBalance() {
  const w = document.getElementById('balanceWrap');
  data.forEach(d => {
    const r = document.createElement('div'); r.className = 'bal-row';
    r.innerHTML = `<div class="bal-l">${d.n}</div>
    <div class="bal-track">
      <div class="bal-p" style="width:${d.p}%;background:${d.col}88"></div>
      <div class="bal-n" style="width:${100-d.p}%;background:#ff5e7a55"></div>
    </div>
    <div class="bal-num" style="color:${d.col}">${d.p}%</div>`;
    w.appendChild(r);
  });
}
