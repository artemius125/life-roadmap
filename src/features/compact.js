let compactOn = false;

export function toggleCompact(btn) {
  compactOn = !compactOn;
  btn.classList.toggle('on', compactOn);
  document.getElementById('tlTrack').classList.toggle('compact-mode', compactOn);
}
