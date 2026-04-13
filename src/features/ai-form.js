// ── AI Form — stars, interactions, analysis simulation ──

function initStars() {
  const c = document.getElementById('stars');
  if (!c) return;
  for (let i = 0; i < 100; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2 + 0.3;
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}vw;top:${Math.random()*100}vh;--d:${2+Math.random()*5}s;--dl:${Math.random()*5}s;--op:${.1+Math.random()*.45}`;
    c.appendChild(s);
  }
}

export function updateChars() {
  const v = document.getElementById('diaryInput').value.length;
  document.getElementById('charCount').textContent = v + ' символов';
}

export function selectModel(el) {
  document.querySelectorAll('.model-chip').forEach(x => x.classList.remove('sel'));
  el.classList.add('sel');
}

const prompts = {
  full: `Ты — психологический аналитик и помощник по ведению личной карты жизни.

Проанализируй следующий текст дневника и верни структурированный результат в JSON формате:

{
  "events": [
    {
      "title": "Краткое название события",
      "date": "примерная дата или период",
      "category": ["achievement"|"skill"|"loss"...],
      "emotional_weight": 1-10,
      "description": "2-3 предложения",
      "maslow_level": 1-5,
      "erikson_stage": "название стадии",
      "erikson_resolution": 0-100,
      "life_domains": { "career": delta, "health": delta, ... },
      "resilience_delta": -1 до +1,
      "narrative_insight": "психологическое наблюдение"
    }
  ],
  "period_summary": {
    "dominant_theme": "главная тема",
    "wellbeing_score": 1-10,
    "key_patterns": [],
    "recommendations": []
  }
}

Текст дневника:`,
  short: `Проанализируй текст дневника и верни JSON с событиями:
- title, date, category, emotional_weight (1-10), description
- maslow_level (1-5), erikson_stage, wellbeing_score (1-10)

Текст:`,
  json: `You are a life events analyzer. Parse the diary text and return ONLY valid JSON:

{ "events": [{"title":"","date":"","categories":[],"emotional_weight":1-10,"maslow":1-5,"erikson":"","wellbeing":1-10,"description":"","domains":{}}], "summary":{"theme":"","patterns":[],"recommendations":[]}}

Diary text:`,
};

export function showPrompt(tab, key) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('act'));
  tab.classList.add('act');
  document.getElementById('promptText').textContent = prompts[key];
}

export function copyPrompt() {
  const txt = document.getElementById('promptText').textContent;
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = 'Скопировано ✓';
    btn.style.color = 'var(--g)';
    setTimeout(() => { btn.textContent = 'Копировать'; btn.style.color = ''; }, 2000);
  });
}

export function runAnalysis() {
  const input = document.getElementById('diaryInput').value.trim();
  if (!input) { document.getElementById('diaryInput').focus(); return; }
  const btn = document.getElementById('analyzeBtn');
  btn.classList.add('loading');
  document.getElementById('btnIcon').textContent = '⟳';
  document.getElementById('btnText').textContent = 'Анализирую...';
  setTimeout(() => {
    btn.classList.remove('loading');
    document.getElementById('btnIcon').textContent = '✓';
    document.getElementById('btnText').textContent = 'Готово — посмотреть результат ↓';
    showResult();
    document.getElementById('jsonCard').style.display = 'block';
    document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth' });
  }, 1800);
}

function showResult() {
  document.getElementById('placeholder').style.display = 'none';
  document.getElementById('resultContent').style.display = 'block';
  renderMetrics();
  renderDomains();
}

export function resetResult() {
  document.getElementById('placeholder').style.display = 'block';
  document.getElementById('resultContent').style.display = 'none';
  document.getElementById('btnIcon').textContent = '✦';
  document.getElementById('btnText').textContent = 'Запустить анализ';
  document.getElementById('analyzeBtn').classList.remove('loading');
}

function renderMetrics() {
  const w = document.getElementById('metricsWrap');
  if (w.children.length) return;
  const metrics = [
    { n: 'Маслоу: уровень', v: 4, max: 5, col: '#3ddc7a', label: 'Уважение/признание' },
    { n: 'Эриксон: разрешённость', v: 62, max: 100, col: '#f0c040', label: 'Идентичность — частично' },
    { n: 'Эмоциональный вес', v: 7.5, max: 10, col: '#8b6fff', label: 'Высокий' },
    { n: 'Устойчивость Δ', v: 0.4, max: 1, col: '#3ddc7a', label: '+0.4 к индексу' },
  ];
  metrics.forEach(d => {
    const r = document.createElement('div');
    r.className = 'metric-row';
    r.innerHTML = `<div class="metric-name">${d.n}</div>
    <div class="metric-bar"><div class="metric-fill" style="width:${d.v/d.max*100}%;background:${d.col}"></div></div>
    <div class="metric-val" style="color:${d.col}">${d.label}</div>`;
    w.appendChild(r);
  });
}

function renderDomains() {
  const w = document.getElementById('domainsWrap');
  if (w.children.length) return;
  const domains = [
    { n: 'Образование', delta: +2.5, col: '#fcd34d' },
    { n: 'Карьера', delta: +1.2, col: '#3ddc7a' },
    { n: 'Саморазвитие', delta: +1.0, col: '#8b6fff' },
    { n: 'Семья', delta: 0, col: 'var(--dim)' },
    { n: 'Психол. здоровье', delta: -0.8, col: '#ff8fa3' },
  ];
  domains.forEach(d => {
    const positive = d.delta >= 0;
    const r = document.createElement('div');
    r.className = 'metric-row';
    r.innerHTML = `<div class="metric-name">${d.n}</div>
    <div style="flex:1;display:flex;align-items:center;gap:6px">
      <span style="font-size:11px;color:${positive ? '#3ddc7a' : '#ff8fa3'}">${positive ? '+' : ''}${d.delta}</span>
      <div style="flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,.07)">
        <div style="width:${Math.abs(d.delta)/3*100}%;height:100%;border-radius:2px;background:${positive ? d.col : '#ff5e7a'};margin-left:${positive ? '0' : 'auto'}"></div>
      </div>
    </div>`;
    w.appendChild(r);
  });
}

// ── Init ──
initStars();
document.getElementById('entryDate').value = new Date().toISOString().split('T')[0];
updateChars();
