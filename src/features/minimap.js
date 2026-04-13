const years = [
  {y:'1998',x:.02},{y:'2001',x:.09},{y:'2007',x:.2},{y:'2011',x:.33},
  {y:'2015',x:.46},{y:'2018',x:.6},{y:'2021',x:.74},{y:'2026',x:.9},
];
const dots = [
  {x:.02,col:'#3ddc7a'},{x:.09,col:'#f0c040'},{x:.09,col:'#3ddc7a'},{x:.09,col:'#ff5e7a'},
  {x:.2,col:'#3ddc7a'},{x:.2,col:'#ff5e7a'},{x:.2,col:'#67e8f9'},
  {x:.33,col:'#8b6fff'},{x:.33,col:'#ff8f3c'},{x:.33,col:'#00c9b8'},
  {x:.46,col:'#f0c040'},{x:.46,col:'#00c9b8'},
  {x:.6,col:'#ff8f3c'},{x:.6,col:'#ff5e7a'},{x:.6,col:'#3ddc7a'},
  {x:.74,col:'#ff5e7a'},{x:.74,col:'#67e8f9'},{x:.74,col:'#8b6fff'},
  {x:.9,col:'#8b6fff'},
];

export function initMinimap() {
  const track = document.getElementById('mmTrack');
  const tlScroll = document.querySelector('.tl-scroll');
  const vp = document.getElementById('mmVp');

  years.forEach(({y, x}) => {
    const lbl = document.createElement('div'); lbl.className = 'mm-yr';
    lbl.textContent = y; lbl.style.left = (x * 100) + '%';
    track.appendChild(lbl);
  });

  dots.forEach(({x, col}) => {
    const dot = document.createElement('div'); dot.className = 'mm-dot';
    dot.style.cssText = `left:${x*100}%;background:${col};bottom:${4+Math.random()*8}px`;
    dot.title = years.find(yr => Math.abs(yr.x - x) < .06)?.y || '';
    dot.addEventListener('click', e => {
      e.stopPropagation();
      const tlTrack = document.getElementById('tlTrack');
      tlScroll.scrollLeft = x * tlTrack.scrollWidth;
    });
    track.appendChild(dot);
  });

  function updateVp() {
    const tlTrack = document.getElementById('tlTrack');
    if (!tlTrack) return;
    const maxScroll = tlTrack.scrollWidth - tlScroll.clientWidth;
    const pct = maxScroll > 0 ? tlScroll.scrollLeft / maxScroll : 0;
    const vpW = Math.max(0.1, tlScroll.clientWidth / tlTrack.scrollWidth);
    vp.style.left  = (pct * (1 - vpW) * 100) + '%';
    vp.style.width = (vpW * 100) + '%';
  }

  tlScroll.addEventListener('scroll', updateVp, {passive: true});
  updateVp();
}

export function mmClick(e) {
  const rect = document.getElementById('mmTrack').getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  const tlScroll = document.querySelector('.tl-scroll');
  const tlTrack = document.getElementById('tlTrack');
  tlScroll.scrollLeft = pct * (tlTrack.scrollWidth - tlScroll.clientWidth);
}
