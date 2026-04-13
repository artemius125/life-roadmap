export function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
}

export function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

export function toggleCat(el) {
  el.classList.toggle('sel');
}
