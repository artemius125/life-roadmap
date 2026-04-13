const data = [
  {ic:'❤️', nm:'Близость',     sc:4.1, col:'#00c9b8', lb:'Критично'},
  {ic:'👥', nm:'Сообщество',   sc:3.8, col:'#ff8fa3', lb:'Критично'},
  {ic:'🧠', nm:'Самооценка',   sc:6.2, col:'#8b6fff', lb:'В работе'},
  {ic:'🌱', nm:'Самоактуал.', sc:5.5, col:'#3ddc7a', lb:'В работе'},
];

export function initGrowth() {
  const w = document.getElementById('growthGrid');
  data.forEach(d => {
    const g = document.createElement('div'); g.className = 'gz';
    g.innerHTML = `<div class="gz-ic">${d.ic}</div><div class="gz-nm">${d.nm}</div>
    <div class="gz-sc" style="color:${d.col}">${d.sc}</div>
    <div class="gz-lb">${d.lb}</div>
    <div class="gz-b"><div class="gz-bf" style="width:${d.sc/10*100}%;background:${d.col}"></div></div>`;
    w.appendChild(g);
  });
}
