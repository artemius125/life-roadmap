import { causalLinks } from '../data/causal-links.js';

let causalOn = false;

export function drawCausalLines() {
  const svg = document.getElementById('causalSvg');
  const trackEl = document.getElementById('tlTrack');
  const W = trackEl.scrollWidth, H = trackEl.offsetHeight || 600;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.style.width = W + 'px'; svg.style.height = H + 'px';
  svg.innerHTML = ''; svg.classList.add('causal-on');
  const trackRect = trackEl.getBoundingClientRect();

  causalLinks.forEach(link => {
    const fromEl = document.getElementById(link.from);
    const toEl   = document.getElementById(link.to);
    if (!fromEl || !toEl) return;
    const fr  = fromEl.getBoundingClientRect();
    const tr2 = toEl.getBoundingClientRect();
    const x1 = fr.left  + fr.width  / 2 - trackRect.left;
    const y1 = fr.top   + fr.height / 2 - trackRect.top;
    const x2 = tr2.left + tr2.width  / 2 - trackRect.left;
    const y2 = tr2.top  + tr2.height / 2 - trackRect.top;
    const cpx = (x1 + x2) / 2, cpy = Math.min(y1, y2) - 50;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${x1},${y1} Q${cpx},${cpy} ${x2},${y2}`);
    path.setAttribute('class', 'causal-path'); path.setAttribute('stroke', link.col);
    svg.appendChild(path);

    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 30;
    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', mx); txt.setAttribute('y', my);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('class', 'causal-lbl'); txt.setAttribute('fill', link.col);
    txt.textContent = link.label; svg.appendChild(txt);

    [x1, x2].forEach((cx, i) => {
      const cy = i === 0 ? y1 : y2;
      const ci = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ci.setAttribute('cx', cx); ci.setAttribute('cy', cy); ci.setAttribute('r', '4');
      ci.setAttribute('fill', link.col); ci.setAttribute('class', 'causal-dot');
      svg.appendChild(ci);
    });
  });
}

export function toggleCausal(btn) {
  causalOn = !causalOn;
  btn.classList.toggle('v-on', causalOn);
  if (causalOn) drawCausalLines();
  else {
    document.getElementById('causalSvg').innerHTML = '';
    document.getElementById('causalSvg').classList.remove('causal-on');
  }
}
