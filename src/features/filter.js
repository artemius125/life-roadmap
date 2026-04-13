export function fAll(btn) {
  document.querySelectorAll('.fb').forEach(x => x.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.ev').forEach(e => { e.style.opacity = '1'; e.style.transform = ''; });
}

export function fCat(btn, cat) {
  document.querySelectorAll('.fb').forEach(x => x.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.ev').forEach(e => {
    const ok = e.dataset.cat === cat;
    e.style.opacity = ok ? '1' : '0.15';
    e.style.transform = ok ? '' : 'scale(.97)';
  });
}
