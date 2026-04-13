const radarNames = ['Карьера','Здоровье','Отношения','Саморазвитие','Финансы','Досуг','Семья','Духовность'];
const radarCols  = ['#3ddc7a','#00c9b8','#ff8fa3','#8b6fff','#fcd34d','#67e8f9','#ffa768','#d8b4fe'];

const defaultValues = [7.2, 6.1, 4.8, 8.1, 5.5, 5.0, 4.2, 6.3];

function buildRadar(svg, lbl, values) {
  svg.innerHTML = '';
  lbl.innerHTML = '';
  const n = values.length, cx = 90, cy = 90, R = 72;

  [.25, .5, .75, 1].forEach(f => {
    const pts = Array.from({length:n}, (_, i) => {
      const a = i / n * 2 * Math.PI - Math.PI / 2;
      return `${cx + R * f * Math.cos(a)},${cy + R * f * Math.sin(a)}`;
    }).join(' ');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    p.setAttribute('points', pts);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'rgba(61,220,122,.12)');
    p.setAttribute('stroke-width', '1');
    svg.appendChild(p);
  });

  for (let i = 0; i < n; i++) {
    const a = i / n * 2 * Math.PI - Math.PI / 2;
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', cx); l.setAttribute('y1', cy);
    l.setAttribute('x2', cx + R * Math.cos(a)); l.setAttribute('y2', cy + R * Math.sin(a));
    l.setAttribute('stroke', 'rgba(61,220,122,.12)'); l.setAttribute('stroke-width', '1');
    svg.appendChild(l);
  }

  const pts = values.map((v, i) => {
    const a = i / n * 2 * Math.PI - Math.PI / 2, r2 = R * (v / 10);
    return `${cx + r2 * Math.cos(a)},${cy + r2 * Math.sin(a)}`;
  }).join(' ');
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', pts);
  poly.setAttribute('fill', 'rgba(139,111,255,.18)');
  poly.setAttribute('stroke', '#8b6fff');
  poly.setAttribute('stroke-width', '1.5');
  svg.appendChild(poly);

  values.forEach((v, i) => {
    const a = i / n * 2 * Math.PI - Math.PI / 2, r2 = R * (v / 10), col = radarCols[i];
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', cx + r2 * Math.cos(a)); c.setAttribute('cy', cy + r2 * Math.sin(a));
    c.setAttribute('r', '3'); c.setAttribute('fill', col);
    svg.appendChild(c);
    const it = document.createElement('div');
    it.className = 'rl';
    it.innerHTML = `<div class="rl-d" style="background:${col}"></div><span style="flex:1;color:var(--dim);font-size:10px">${radarNames[i]}</span><span style="font-weight:700;color:${col};font-size:11px">${v}</span>`;
    lbl.appendChild(it);
  });
}

export function initRadar() {
  buildRadar(
    document.getElementById('radarSvg'),
    document.getElementById('radarLabels'),
    defaultValues
  );
}

export function renderRadar(values) {
  buildRadar(
    document.getElementById('radarSvg'),
    document.getElementById('radarLabels'),
    values
  );
}
