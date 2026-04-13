export function initStars() {
  const c = document.getElementById('stars');
  for (let i = 0; i < 130; i++) {
    const s = document.createElement('div'); s.className = 'star';
    const sz = Math.random() * 2 + .4;
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}vw;top:${Math.random()*100}vh;--d:${2+Math.random()*5}s;--dl:${Math.random()*5}s;--op:${.12+Math.random()*.5}`;
    c.appendChild(s);
  }
}
