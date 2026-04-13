const data = [
  {y:'98–00',v:1},{y:'01–03',v:2},{y:'04–06',v:4},{y:'07–09',v:3},
  {y:'10–12',v:3},{y:'13–15',v:5},{y:'16–17',v:4},{y:'18–19',v:6},
  {y:'20',v:3},  {y:'21–22',v:5},{y:'23–24',v:3},{y:'25–26',v:2},
];

export function initDensity() {
  const w = document.getElementById('densityBars');
  const mx = Math.max(...data.map(d => d.v));
  data.forEach((d, i) => {
    const pct = (d.v / mx) * 100;
    const col = `hsl(${140 + i * 10},58%,54%)`;
    const bc = document.createElement('div'); bc.className = 'bcol';
    bc.innerHTML = `<div class="bfill" data-v="${d.v} соб." style="height:${pct}%;background:${col}"></div><div class="byr">${d.y}</div>`;
    w.appendChild(bc);
  });
}
