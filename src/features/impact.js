import { openDrawer } from './drawer.js';

let impactOn = false;

export function toggleImpact(btn) {
  impactOn = !impactOn;
  btn.classList.toggle('on', impactOn);
  const track = document.getElementById('tlTrack');
  track.classList.toggle('impact-mode', impactOn);
  document.querySelectorAll('.tl-block').forEach(block => {
    const posZ = block.querySelector('.tl-pos-zone');
    const negZ = block.querySelector('.tl-neg-zone');
    if (!posZ || !negZ) return;
    posZ.innerHTML = ''; negZ.innerHTML = '';
    if (impactOn) {
      block.querySelectorAll('.tl-bcards .ev').forEach(ev => {
        const imp = parseFloat(ev.dataset.impact || 5);
        const clone = ev.cloneNode(true);
        clone.addEventListener('click', () => openDrawer(ev));
        (imp >= 5 ? posZ : negZ).appendChild(clone);
      });
    }
  });
}
