const data = [
  {name:'Достижения', v:12, col:'#3ddc7a'}, {name:'Навыки',    v:8, col:'#8b6fff'},
  {name:'Образование',v:7,  col:'#fcd34d'}, {name:'Отношения', v:6, col:'#5eead4'},
  {name:'Потери',     v:5,  col:'#ff8fa3'}, {name:'Травмы',    v:5, col:'#d8b4fe'},
  {name:'Поражения',  v:4,  col:'#ffa768'}, {name:'Озарения',  v:6, col:'#67e8f9'},
];

export function initDonut() {
  const svg = document.getElementById('donutSvg');
  const leg = document.getElementById('donutLegend');
  const tot = data.reduce((s, d) => s + d.v, 0);
  const cx = 50, cy = 50, R = 44, r = 26;
  let ang = 0;

  data.forEach(d => {
    const fr = d.v / tot, a0 = ang, a1 = ang + fr * 2 * Math.PI, lg = fr > .5 ? 1 : 0;
    const x0 = cx + R * Math.sin(a0), y0 = cy - R * Math.cos(a0);
    const x1 = cx + R * Math.sin(a1), y1 = cy - R * Math.cos(a1);
    const xi0 = cx + r * Math.sin(a0), yi0 = cy - r * Math.cos(a0);
    const xi1 = cx + r * Math.sin(a1), yi1 = cy - r * Math.cos(a1);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${xi0},${yi0}L${x0},${y0}A${R},${R} 0 ${lg},1 ${x1},${y1}L${xi1},${yi1}A${r},${r} 0 ${lg},0 ${xi0},${yi0}Z`);
    path.setAttribute('fill', d.col); path.setAttribute('opacity', '.82');
    path.addEventListener('mouseenter', () => path.setAttribute('opacity', '1'));
    path.addEventListener('mouseleave', () => path.setAttribute('opacity', '.82'));
    svg.appendChild(path); ang = a1;
    const it = document.createElement('div'); it.className = 'dl-i';
    it.innerHTML = `<div class="dl-dot" style="background:${d.col}"></div><div class="dl-n">${d.name}</div><div class="dl-v">${d.v}</div>`;
    leg.appendChild(it);
  });

  const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  t.setAttribute('x', cx); t.setAttribute('y', cy + 1);
  t.setAttribute('text-anchor', 'middle'); t.setAttribute('dominant-baseline', 'middle');
  t.setAttribute('fill', '#ddeae0'); t.setAttribute('font-size', '14'); t.setAttribute('font-weight', '800');
  t.textContent = tot; svg.appendChild(t);
}
