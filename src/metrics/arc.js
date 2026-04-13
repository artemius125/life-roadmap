export function initArc() {
  const svg = document.getElementById('arcSvg');
  const W = 600, H = 110, pad = 16;
  const pts = [[0,6],[.04,6.5],[.08,7],[.13,5.5],[.17,6],[.23,7.2],[.28,5.8],[.35,7.5],
               [.42,6.8],[.48,3.5],[.52,5.5],[.57,2.5],[.65,5],[.72,6.5],[.9,7.2],[1,7.8]];
  const tx = t => pad + t * (W - 2 * pad);
  const ty = v => H - pad - (v / 10) * (H - 2 * pad);

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  g.setAttribute('id', 'ag'); g.setAttribute('x1','0'); g.setAttribute('y1','0');
  g.setAttribute('x2','0'); g.setAttribute('y2','1');
  g.innerHTML = `<stop offset="0%" stop-color="#8b6fff" stop-opacity=".28"/><stop offset="100%" stop-color="#8b6fff" stop-opacity="0"/>`;
  defs.appendChild(g); svg.appendChild(defs);

  const coords = pts.map(([t, v]) => [tx(t), ty(v)]);
  let d = `M${coords[0][0]},${coords[0][1]}`;
  for (let i = 1; i < coords.length; i++) {
    const p = coords[i-1], c = coords[i], cpx = (p[0] + c[0]) / 2;
    d += ` C${cpx},${p[1]} ${cpx},${c[1]} ${c[0]},${c[1]}`;
  }

  const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  area.setAttribute('d', d + ` L${coords[coords.length-1][0]},${H} L${coords[0][0]},${H} Z`);
  area.setAttribute('fill', 'url(#ag)'); svg.appendChild(area);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.setAttribute('d', d); line.setAttribute('fill', 'none');
  line.setAttribute('stroke', '#8b6fff'); line.setAttribute('stroke-width', '2'); svg.appendChild(line);

  const ml = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  ml.setAttribute('x1', pad); ml.setAttribute('y1', ty(5));
  ml.setAttribute('x2', W - pad); ml.setAttribute('y2', ty(5));
  ml.setAttribute('stroke', 'rgba(221,234,224,.1)'); ml.setAttribute('stroke-dasharray', '4 4');
  ml.setAttribute('stroke-width', '1'); svg.appendChild(ml);

  [[.48,3.5,'#ff5e7a','Тревога'],[.57,2.5,'#ff5e7a','Потеря папы'],[1,7.8,'#3ddc7a','Сейчас']].forEach(([t,v,col,label]) => {
    const x = tx(t), y = ty(v);
    const ci = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ci.setAttribute('cx', x); ci.setAttribute('cy', y); ci.setAttribute('r', '4');
    ci.setAttribute('fill', col); ci.setAttribute('stroke', '#070e0a'); ci.setAttribute('stroke-width', '2');
    svg.appendChild(ci);
    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', x); txt.setAttribute('y', y - 8); txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('fill', col); txt.setAttribute('font-size', '8'); txt.setAttribute('font-weight', '700');
    txt.textContent = label; svg.appendChild(txt);
  });
}
