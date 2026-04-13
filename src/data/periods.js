export const maslowNames = ['Физиологические','Безопасность','Принадлежность','Уважение','Самоактуализация'];
export const maslowCols  = ['#ff8f3c','#f0c040','#00c9b8','#3ddc7a','#8b6fff'];
export const maslowSubs  = ['Базовые потребности','Стабильность, здоровье','Отношения, сообщество','Достижения, признание','Реализация'];

export const periodDatasets = {
  '1m':{
    pill:'1 мес. · 3 события',
    maslow:[{n:5,score:58,ev:1},{n:4,score:74,ev:1},{n:3,score:48,ev:1},{n:2,score:70,ev:0},{n:1,score:90,ev:0}],
    radar:[7.8,6.4,5.2,8.5,5.8,5.5,4.8,6.8],
    resilience:'7.9', pattern:'Проект как смыслообразующий якорь',
    sdt:[8.2,7.4,4.6], exist:3.1, rf:7,
  },
  '3m':{
    pill:'3 мес. · 8 событий',
    maslow:[{n:5,score:55,ev:2},{n:4,score:72,ev:3},{n:3,score:46,ev:2},{n:2,score:66,ev:1},{n:1,score:88,ev:0}],
    radar:[7.5,6.2,4.9,8.3,5.6,5.2,4.5,6.6],
    resilience:'7.6', pattern:'Активный рост через рефлексию',
    sdt:[8.0,7.2,4.5], exist:2.9, rf:6,
  },
  '6m':{
    pill:'6 мес. · 15 событий',
    maslow:[{n:5,score:54,ev:3},{n:4,score:71,ev:5},{n:3,score:45,ev:4},{n:2,score:65,ev:3},{n:1,score:87,ev:2}],
    radar:[7.3,6.1,4.8,8.1,5.5,5.0,4.3,6.4],
    resilience:'7.4', pattern:'Стабилизация после кризиса',
    sdt:[7.9,7.1,4.4], exist:2.8, rf:6,
  },
  '1y':{
    pill:'1 год · 22 события',
    maslow:[{n:5,score:53,ev:5},{n:4,score:71,ev:8},{n:3,score:44,ev:7},{n:2,score:64,ev:5},{n:1,score:86,ev:3}],
    radar:[7.2,6.1,4.8,8.1,5.5,5.0,4.2,6.3],
    resilience:'7.4', pattern:'Интеграция прошлого опыта',
    sdt:[7.8,7.1,4.4], exist:2.8, rf:6,
  },
  '2y':{
    pill:'2 года · 31 событие',
    maslow:[{n:5,score:52,ev:5},{n:4,score:71,ev:10},{n:3,score:44,ev:8},{n:2,score:63,ev:6},{n:1,score:85,ev:4}],
    radar:[7.2,6.1,4.8,8.1,5.5,5.0,4.2,6.3],
    resilience:'7.4', pattern:'Потеря → рост через преодоление',
    sdt:[7.8,7.1,4.4], exist:2.8, rf:6,
  },
  '5y':{
    pill:'5 лет · 39 событий',
    maslow:[{n:5,score:50,ev:5},{n:4,score:70,ev:11},{n:3,score:42,ev:9},{n:2,score:61,ev:7},{n:1,score:84,ev:5}],
    radar:[7.0,6.0,4.6,7.9,5.4,4.9,4.0,6.1],
    resilience:'7.2', pattern:'Кризис идентичности → профессия',
    sdt:[7.6,6.9,4.2], exist:2.5, rf:6,
  },
  'all':{
    pill:'28 лет · 47 событий',
    maslow:[{n:5,score:52,ev:6},{n:4,score:71,ev:12},{n:3,score:44,ev:9},{n:2,score:63,ev:8},{n:1,score:85,ev:5}],
    radar:[7.2,6.1,4.8,8.1,5.5,5.0,4.2,6.3],
    resilience:'7.4', pattern:'Потеря → рост через преодоление',
    sdt:[7.8,7.1,4.4], exist:2.8, rf:6,
  },
};
