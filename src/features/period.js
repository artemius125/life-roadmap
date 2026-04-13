import { periodDatasets } from '../data/periods.js';
import { renderMaslow }  from '../metrics/maslow.js';
import { renderRadar }   from '../metrics/radar.js';
import { renderExist }   from '../metrics/exist.js';
import { renderSdt }     from '../metrics/sdt.js';
import { renderRf }      from '../metrics/rf.js';

export function onPeriodChange(p) {
  const d = periodDatasets[p];

  // pill
  document.getElementById('periodPill').textContent = d.pill;

  // maslow
  renderMaslow(d.maslow);

  // radar
  renderRadar(d.radar);

  // resilience big number
  const resEl = document.querySelector('.bnum.g');
  if (resEl) resEl.textContent = d.resilience;

  // pattern text (sibling of .bnum.v)
  const patEl = document.querySelector('[style*="var(--v)"][style*="font-size:18px"]');
  if (patEl) patEl.innerHTML = d.pattern.replace('→', '→<br>');

  // SDT
  renderSdt(d.sdt);

  // existential
  renderExist(d.exist);

  // RF
  renderRf(d.rf);
}
