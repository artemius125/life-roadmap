// ── Timeline data — all blocks, events, epoch/decade groups ──
// Each block maps to one column on the horizontal timeline.

export const timelineBlocks = [
  {
    label: '1998',
    era: 'ancient',
    events: [
      {
        icon: '🌱', title: 'Рождение', date: '14 марта 1998 · Москва',
        body: 'Начало пути.',
        cat: 'ach', impact: 7,
        tags: [{ cls: 'ta', text: 'Старт' }],
        kids: [],
      },
    ],
  },
  {
    label: '2001–2006',
    era: 'ancient',
    events: [
      {
        icon: '🩹', title: 'Перелом ключицы', date: 'Лето 2002',
        body: 'Упал с велосипеда. Первая серьёзная боль.',
        cat: 'tra', impact: 3,
        tags: [{ cls: 'tt', text: 'Физтравма' }],
        kids: [],
      },
      {
        icon: '🎹', title: 'Музыкальная школа', date: 'Сен 2003',
        body: 'Фортепиано, 5 лет занятий.',
        cat: 'edu', impact: 8,
        tags: [{ cls: 'ts', text: 'Навык' }, { cls: 'te', text: 'Обучение' }],
        kids: [
          { icon: '🎵', title: 'Первый концерт', sub: 'Декабрь 2004' },
          { icon: '🏅', title: 'III место на конкурсе', sub: 'Март 2005' },
        ],
      },
      {
        icon: '🕯️', title: 'Смерть дедушки', date: 'Февраль 2006',
        body: 'Первая потеря близкого. Глубокий след.',
        cat: 'los', impact: 2,
        tags: [{ cls: 'tl', text: 'Потеря' }, { cls: 'tt', text: 'Психотравма' }],
        kids: [],
      },
    ],
  },
  {
    label: '2007–2010',
    era: 'distant',
    events: [
      {
        icon: '🏊', title: 'Разряд по плаванию', date: 'Апрель 2007',
        body: '3-й взрослый разряд. Первая спортивная победа.',
        cat: 'ach', impact: 8,
        tags: [{ cls: 'ta', text: 'Достижение' }, { cls: 'ts', text: 'Навык' }],
        kids: [],
      },
      {
        id: 'ev-bully',
        icon: '😰', title: 'Буллинг в школе', date: '2008–2009',
        body: 'Замкнулся, потерял доверие к ровесникам.',
        cat: 'tra', impact: 1,
        tags: [{ cls: 'tt', text: 'Психотравма' }],
        kids: [],
      },
      {
        id: 'ev-code',
        icon: '💻', title: 'Первый контакт с кодом', date: '2009',
        body: 'HTML в школьном кружке. Понял: это моё.',
        cat: 'ins', impact: 9,
        tags: [{ cls: 'ti', text: 'Озарение' }, { cls: 'ts', text: 'Навык' }],
        kids: [],
      },
    ],
  },
  {
    label: '2011–2014',
    era: 'old',
    events: [
      {
        id: 'ev-dev',
        icon: '⌨️', title: 'Самообучение программированию', date: '2011–2013',
        body: 'JS → Python. Ночи напролёт.',
        cat: 'ski', impact: 9,
        tags: [{ cls: 'ts', text: 'Навык' }],
        kids: [
          { icon: '🕹️', title: 'Первая игра на JS', sub: 'Змейка, 2012' },
          { icon: '🌐', title: 'Первый фриланс-сайт', sub: '₽3000, 2013' },
        ],
      },
      {
        icon: '📉', title: 'Провал на ЕГЭ', date: 'Июнь 2014',
        body: '67 вместо 85. Пересматривал планы.',
        cat: 'fai', impact: 3,
        tags: [{ cls: 'tf', text: 'Поражение' }],
        kids: [],
      },
      {
        icon: '👫', title: 'Первые отношения', date: 'Весна 2014',
        body: '6 месяцев. Впервые открылся другому.',
        cat: 'rel', impact: 7,
        tags: [{ cls: 'tr', text: 'Отношения' }],
        kids: [],
      },
    ],
  },
  {
    label: '2015–2018',
    era: 'mid',
    events: [
      {
        id: 'ev-uni',
        icon: '🎓', title: 'Университет — CS', date: 'Сен 2015',
        body: 'Бюджет. Первый в семье технарь.',
        cat: 'edu', impact: 9,
        tags: [{ cls: 'te', text: 'Образование' }, { cls: 'ta', text: 'Достижение' }],
        kids: [
          { icon: '🐍', title: 'Python / алгоритмы', sub: '1-й семестр' },
          { icon: '🥇', title: 'Повышенная стипендия', sub: '2-й семестр 2016' },
          { icon: '💡', title: 'Хочу в продуктовую разработку', sub: 'Озарение, 3-й курс' },
        ],
      },
      {
        icon: '❤️', title: 'Серьёзные отношения', date: 'Март 2016 — 2019',
        body: '3 года вместе. Много узнал о себе.',
        cat: 'rel', impact: 7,
        tags: [{ cls: 'tr', text: 'Отношения' }],
        kids: [
          { icon: '💔', title: 'Расставание', sub: 'Апрель 2019 — боль и рост' },
        ],
      },
    ],
  },
  {
    label: '2018–2020',
    era: 'mid',
    events: [
      {
        id: 'ev-startup',
        icon: '🚩', title: 'Провальный стартап', date: '2018–2019',
        body: 'Год + ₽200к. Команда распалась. Урок о людях.',
        cat: 'fai', impact: 2,
        tags: [{ cls: 'tf', text: 'Поражение' }, { cls: 'ti', text: 'Урок' }],
        kids: [],
      },
      {
        id: 'ev-anxiety',
        icon: '😮‍💨', title: 'Тревожное расстройство', date: 'Зима 2019',
        body: 'Панические атаки. Терапия 8 месяцев.',
        cat: 'tra', impact: 1,
        tags: [{ cls: 'tt', text: 'Психотравма' }],
        kids: [
          { icon: '🛋️', title: 'Психотерапия', sub: '8 мес., 2019–2020' },
          { icon: '📚', title: 'КПТ и ACT', sub: 'Инструменты саморегуляции' },
        ],
      },
      {
        id: 'ev-job',
        icon: '🚀', title: 'Первая работа в продукте', date: 'Янв 2020',
        body: 'Middle → Senior за год в финтехе.',
        cat: 'ach', impact: 8,
        tags: [{ cls: 'ta', text: 'Достижение' }, { cls: 'ts', text: 'Карьера' }],
        kids: [],
      },
    ],
  },
  {
    label: '2021–2024',
    era: 'recent',
    events: [
      {
        id: 'ev-dad',
        icon: '🕯️', title: 'Смерть папы', date: 'Ноябрь 2021',
        body: 'Самая тяжёлая потеря. Переоценка всего.',
        cat: 'los', impact: 1,
        tags: [{ cls: 'tl', text: 'Потеря' }, { cls: 'tt', text: 'Психотравма' }],
        kids: [],
      },
      {
        id: 'ev-solo',
        icon: '🌍', title: 'Соло-путешествие', date: 'Май 2022',
        body: 'Грузия, Армения, 40 дней. Выход из горя через движение.',
        cat: 'ins', impact: 8,
        tags: [{ cls: 'ti', text: 'Озарение' }, { cls: 'ta', text: 'Личная победа' }],
        kids: [],
      },
      {
        id: 'ev-meditation',
        icon: '🧘', title: 'Медитация и осознанность', date: '2022 — сейчас',
        body: 'Ежедневная практика. Управление тревогой.',
        cat: 'ski', impact: 8,
        tags: [{ cls: 'ts', text: 'Навык' }, { cls: 'ti', text: 'Рост' }],
        kids: [],
      },
    ],
  },
  {
    label: 'Сейчас · 2026',
    era: 'current',
    now: true,
    events: [
      {
        icon: '🗺️', title: 'Этот проект', date: 'Апрель 2026',
        body: 'Строю карту своей жизни. Осмысление пути.',
        cat: 'ins', impact: 9,
        tags: [{ cls: 'ti', text: 'Новый этап' }],
        kids: [],
        specialBorder: 'var(--v)',
      },
    ],
  },
];

export const epochBlocks = [
  {
    label: '1998–2010',
    title: 'Детство и школа',
    count: '14 событий · 2 перелома',
    tags: [{ cls: 'te', text: 'Образование' }, { cls: 'tt', text: 'Травмы' }, { cls: 'ts', text: 'Первые навыки' }],
  },
  {
    label: '2011–2017',
    title: 'Самоопределение',
    count: '11 событий · 1 прорыв',
    tags: [{ cls: 'ts', text: 'Навыки' }, { cls: 'tr', text: 'Отношения' }, { cls: 'tf', text: 'Поражения' }],
  },
  {
    label: '2018–2022',
    title: 'Кризисы и рост',
    count: '12 событий · 3 кризиса',
    tags: [{ cls: 'tt', text: 'Психотравма' }, { cls: 'ta', text: 'Карьера' }, { cls: 'ti', text: 'Озарения' }],
  },
  {
    label: '2023–2026',
    title: 'Интеграция',
    count: '10 событий · Сейчас',
    tags: [{ cls: 'ts', text: 'Осознанность' }, { cls: 'ta', text: 'Зрелость' }],
  },
];

export const decadeBlocks = [
  {
    label: '1998–2010',
    title: 'Детство',
    count: '25 событий',
    tags: [{ cls: 'te', text: 'Образование' }, { cls: 'tt', text: 'Травмы' }],
  },
  {
    label: '2011–2020',
    title: 'Молодость',
    count: '16 событий',
    tags: [{ cls: 'ts', text: 'Навыки' }, { cls: 'tf', text: 'Кризисы' }],
  },
  {
    label: '2021–2026',
    title: 'Зрелость',
    count: '6 событий',
    tags: [{ cls: 'ta', text: 'Рост' }, { cls: 'ti', text: 'Смысл' }],
  },
];
