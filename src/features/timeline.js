// ── Timeline renderer — builds DOM from src/data/timeline.js ──
import { timelineBlocks, epochBlocks, decadeBlocks } from '../data/timeline.js';
import { openDrawer } from './drawer.js';

// ── Helpers ──

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

function tagsHtml(tags) {
  return tags.map(t => `<span class="etag ${t.cls}">${t.text}</span>`).join('');
}

function kidsHtml(kids) {
  if (!kids.length) return '';
  const rows = kids.map(k =>
    `<div class="ev-kid">
      <span class="ek-ic">${k.icon}</span>
      <div><div class="ek-ti">${k.title}</div><div class="ek-sb">${k.sub}</div></div>
    </div>`
  ).join('');
  return `<div class="ev-kids">${rows}</div>`;
}

function buildCard(ev) {
  const card = el('div', `ev c-${ev.cat}`);
  card.dataset.cat = ev.cat;
  card.dataset.impact = ev.impact;
  if (ev.id) card.id = ev.id;
  if (ev.specialBorder) card.style.borderColor = ev.specialBorder;

  card.innerHTML = `
    <div class="ev-edit" title="Редактировать">✎</div>
    <div class="ev-h">
      <span class="ev-ic">${ev.icon}</span>
      <div>
        <div class="ev-ti">${ev.title}</div>
        <div class="ev-dt">${ev.date}</div>
      </div>
    </div>
    <div class="ev-bd">${ev.body}</div>
    <div class="ev-tg">${tagsHtml(ev.tags)}</div>
    ${kidsHtml(ev.kids)}
  `;

  card.addEventListener('click', (e) => {
    if (e.target.closest('.ev-edit')) return;
    openDrawer(card);
  });

  return card;
}

function buildBlock(block) {
  const classes = ['tl-block', `era-${block.era}`];
  if (block.now) classes.push('tl-now');
  const wrapper = el('div', classes.join(' '));

  // Head: label + stem + dot
  const head = el('div', 'tl-bhead');
  head.innerHTML = `
    <div class="tl-blabel">${block.label}</div>
    <div class="tl-bstem"></div>
    <div class="tl-bdot"></div>
  `;
  wrapper.appendChild(head);

  if (!block.now) wrapper.appendChild(el('div', 'tl-pos-zone'));

  const cards = el('div', 'tl-bcards');
  block.events.forEach(ev => cards.appendChild(buildCard(ev)));
  wrapper.appendChild(cards);

  if (!block.now) wrapper.appendChild(el('div', 'tl-neg-zone'));

  return wrapper;
}

function buildGroupBlock(group, type) {
  const cls = type === 'epoch' ? 'epoch-block' : 'decade-block';
  const wrapper = el('div', `tl-block ${cls}`);

  const head = el('div', 'tl-bhead');
  head.innerHTML = `
    <div class="tl-blabel">${group.label}</div>
    <div class="tl-bstem"></div>
    <div class="tl-bdot"></div>
  `;
  wrapper.appendChild(head);

  const cards = el('div', 'tl-bcards');
  const sum = el('div', 'epoch-sum');
  sum.innerHTML = `
    <div class="epoch-sum-h">${group.title}</div>
    <div class="epoch-sum-cnt">${group.count}</div>
    <div class="epoch-tags">${tagsHtml(group.tags)}</div>
  `;
  cards.appendChild(sum);
  wrapper.appendChild(cards);

  return wrapper;
}

// ── Public API ──

export function initTimeline() {
  const track = document.getElementById('tlTrack');
  if (!track) return;

  const frag = document.createDocumentFragment();

  timelineBlocks.forEach(block => frag.appendChild(buildBlock(block)));
  epochBlocks.forEach(group => frag.appendChild(buildGroupBlock(group, 'epoch')));
  decadeBlocks.forEach(group => frag.appendChild(buildGroupBlock(group, 'decade')));

  track.appendChild(frag);
}
