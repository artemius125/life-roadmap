// ── AI Form entry point ──
import './styles/ai-form.css';

import {
  updateChars,
  selectModel,
  showPrompt,
  copyPrompt,
  runAnalysis,
  resetResult,
} from './features/ai-form.js';

// Expose to HTML onclick handlers
window.updateChars  = updateChars;
window.selectModel  = selectModel;
window.showPrompt   = showPrompt;
window.copyPrompt   = copyPrompt;
window.runAnalysis  = runAnalysis;
window.resetResult  = resetResult;
