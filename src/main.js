// ── CSS — layout & zones ──
import './styles/base.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/timeline.css';
import './styles/metrics.css';
import './styles/modal.css';
import './styles/drawer.css';
import './styles/minimap.css';
import './styles/footer.css';

// ── CSS — metric widgets ──
import './styles/metrics/maslow.css';
import './styles/metrics/donut.css';
import './styles/metrics/radar.css';
import './styles/metrics/density.css';
import './styles/metrics/arc.css';
import './styles/metrics/balance.css';
import './styles/metrics/growth.css';
import './styles/metrics/defense.css';
import './styles/metrics/locus.css';
import './styles/metrics/rf.css';
import './styles/metrics/ego.css';
import './styles/metrics/window.css';
import './styles/metrics/exist.css';
import './styles/metrics/sdt.css';
import './styles/metrics/cognitive.css';

// ── Metrics ──
import { initMaslow }   from './metrics/maslow.js';
import { initErikson }  from './metrics/erikson.js';
import { initRadar }    from './metrics/radar.js';
import { initDonut }    from './metrics/donut.js';
import { initDensity }  from './metrics/density.js';
import { initArc }      from './metrics/arc.js';
import { initBalance }  from './metrics/balance.js';
import { initGrowth }   from './metrics/growth.js';
import { initDefense }  from './metrics/defense.js';
import { initLocus }    from './metrics/locus.js';
import { initRf }       from './metrics/rf.js';
import { initEgo }      from './metrics/ego.js';
import { initWindow }   from './metrics/window.js';
import { initExist }    from './metrics/exist.js';
import { initSdt }      from './metrics/sdt.js';
import { initCognitive }from './metrics/cognitive.js';

// ── Features ──
import { initStars }    from './features/stars.js';
import { fAll, fCat }   from './features/filter.js';
import { openModal, closeModal, toggleCat } from './features/modal.js';
import { openDrawer, closeDrawer }          from './features/drawer.js';
import { toggleImpact } from './features/impact.js';
import { toggleChroma } from './features/chroma.js';
import { toggleCompact }from './features/compact.js';
import { setZoom }      from './features/zoom.js';
import { toggleTrend }  from './features/trend.js';
import { toggleCausal } from './features/causal.js';
import { initMinimap, mmClick } from './features/minimap.js';
import { onPeriodChange }       from './features/period.js';
import { initTimeline }         from './features/timeline.js';

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initStars();
  initMaslow();
  initErikson();
  initRadar();
  initDonut();
  initDensity();
  initArc();
  initBalance();
  initGrowth();
  initDefense();
  initLocus();
  initRf();
  initEgo();
  initWindow();
  initExist();
  initSdt();
  initCognitive();
  initMinimap();
});

// ── Expose to HTML onclick handlers ──
window.fAll           = fAll;
window.fCat           = fCat;
window.openModal      = openModal;
window.closeModal     = closeModal;
window.toggleCat      = toggleCat;
window.openDrawer     = openDrawer;
window.closeDrawer    = closeDrawer;
window.toggleImpact   = toggleImpact;
window.toggleChroma   = toggleChroma;
window.toggleCompact  = toggleCompact;
window.setZoom        = setZoom;
window.toggleTrend    = toggleTrend;
window.toggleCausal   = toggleCausal;
window.onPeriodChange = onPeriodChange;
window.mmClick        = mmClick;
