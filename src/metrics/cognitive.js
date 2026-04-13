const data = [
  {name:'Катастрофизация',            count:14, col:'#ff5e7a'},
  {name:'Сверхобобщение',             count:11, col:'#ff8f3c'},
  {name:'Долженствование',            count:10, col:'#f0c040'},
  {name:'Чтение мыслей',              count:8,  col:'#8b6fff'},
  {name:'Негативная фильтрация',      count:7,  col:'#c084fc'},
  {name:'Дихотомическое мышление',    count:5,  col:'#00c9b8'},
  {name:'Обесценивание позитива',     count:4,  col:'#67e8f9'},
];

export function initCognitive() {
  const w = document.getElementById('cogWrap');
  const mx = Math.max(...data.map(d => d.count));
  data.forEach(d => {
    const r = document.createElement('div'); r.className = 'cog-row';
    r.innerHTML = `<div class="cog-nm">${d.name}</div>
    <div class="cog-track"><div class="cog-fill" style="width:${d.count/mx*100}%;background:${d.col}77"></div></div>
    <div class="cog-cnt" style="color:${d.col}">${d.count}</div>`;
    w.appendChild(r);
  });
}
