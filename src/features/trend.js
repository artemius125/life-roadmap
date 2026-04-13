let trendEnergy = false, trendStress = false;

const energyPts = [[0,.62],[.08,.65],[.15,.55],[.22,.6],[.3,.72],[.38,.58],[.45,.75],[.52,.68],[.6,.35],[.65,.55],[.7,.25],[.78,.5],[.85,.65],[.92,.72],[1,.78]];
const stressPts = [[0,.3],[.08,.32],[.15,.45],[.22,.38],[.3,.28],[.38,.42],[.45,.32],[.52,.65],[.6,.82],[.65,.72],[.7,.9],[.78,.55],[.85,.4],[.92,.32],[1,.25]];

function makePath(svg, pts, cls, W) {
  const dotY = 94;
  const coords = pts.map(([t, v]) => [t * W, dotY + (v - .5) * 160]);
  let d = `M${coords[0][0]},${coords[0][1]}`;
  for (let i = 1; i < coords.length; i++) {
    const p = coords[i-1], c = coords[i], cpx = (p[0] + c[0]) / 2;
    d += ` C${cpx},${p[1]} ${cpx},${c[1]} ${c[0]},${c[1]}`;
  }
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d); path.setAttribute('class', cls);
  svg.appendChild(path);
}

export function drawTrendLines() {
  const svg = document.getElementById('trendSvg'); svg.innerHTML = '';
  const trackEl = document.getElementById('tlTrack');
  const W = trackEl.scrollWidth, H = trackEl.offsetHeight || 300;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.style.width = W + 'px'; svg.style.height = H + 'px';
  if (trendEnergy) makePath(svg, energyPts, 'trend-energy ton', W);
  if (trendStress)  makePath(svg, stressPts, 'trend-stress ton', W);
}

export function toggleTrend(type, btn) {
  const legend = document.getElementById('trendLegend');
  if (type === 'energy') {
    trendEnergy = !trendEnergy; btn.classList.toggle('on', trendEnergy);
    document.getElementById('leg-energy').style.display = trendEnergy ? 'flex' : 'none';
  } else {
    trendStress = !trendStress; btn.classList.toggle('on', trendStress);
    document.getElementById('leg-stress').style.display = trendStress ? 'flex' : 'none';
  }
  legend.classList.toggle('vis', trendEnergy || trendStress);
  drawTrendLines();
}
