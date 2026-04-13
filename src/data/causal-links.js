export const causalLinks = [
  { from:'ev-bully',    to:'ev-anxiety',    col:'#c084fc', label:'Психотравма → Тревога' },
  { from:'ev-anxiety',  to:'ev-meditation', col:'#8b6fff', label:'Терапия → Осознанность' },
  { from:'ev-dad',      to:'ev-solo',       col:'#ff5e7a', label:'Потеря → Движение' },
  { from:'ev-solo',     to:'ev-meditation', col:'#67e8f9', label:'Путешествие → Практика' },
  { from:'ev-startup',  to:'ev-anxiety',    col:'#ff8f3c', label:'Крах → Кризис' },
  { from:'ev-code',     to:'ev-dev',        col:'#3ddc7a', label:'Озарение → Навык' },
  { from:'ev-startup',  to:'ev-job',        col:'#3ddc7a', label:'Поражение → Рост' },
];
