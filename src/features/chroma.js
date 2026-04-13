let chromaOn = false;

export function toggleChroma(btn) {
  chromaOn = !chromaOn;
  btn.classList.toggle('on', chromaOn);
  document.querySelector('.tl-track').classList.toggle('chroma-on', chromaOn);
}
