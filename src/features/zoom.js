export function setZoom(z) {
  const track = document.getElementById('tlTrack');
  track.classList.remove('zoom-50', 'zoom-25');
  if (z === 50) track.classList.add('zoom-50');
  if (z === 25) track.classList.add('zoom-25');
  ['z100', 'z50', 'z25'].forEach(id => document.getElementById(id).classList.remove('on'));
  document.getElementById(z === 100 ? 'z100' : z === 50 ? 'z50' : 'z25').classList.add('on');
}
