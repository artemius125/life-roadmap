"""
Заполнение базы данных начальными событиями из src/data/timeline.js

Запуск (из директории backend/):
    python -m scripts.seed
"""
import asyncio
from datetime import date
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.config import settings
from app.models.event import Event
from app.models.base import Base

# ── Данные событий (дублируют src/data/timeline.js + src/data/events.js) ──────

EVENTS = [
    # 1998 ─────────────────────────────────────────────────────────────────────
    dict(
        type="ach", icon="🌱", title="Рождение",
        date_text="14 марта 1998 · Москва", date_from=date(1998, 3, 14),
        body="Начало пути.", impact=4, tags=["ta"],
        metrics={}, pos=0,
    ),
    # 2001–2006 ────────────────────────────────────────────────────────────────
    dict(
        type="tra", icon="🩹", title="Перелом ключицы",
        date_text="Лето 2002", date_from=date(2002, 7, 1),
        body="Упал с велосипеда. Первая серьёзная боль.",
        impact=-2, tags=["tt"],
        metrics={"maslow_level": 1, "resilience_delta": -0.1}, pos=0,
    ),
    dict(
        type="edu", icon="🎹", title="Музыкальная школа",
        date_text="Сен 2003", date_from=date(2003, 9, 1), date_to=date(2008, 5, 31),
        body="Фортепиано, 5 лет занятий.",
        impact=3, tags=["ts", "te"],
        metrics={
            "maslow_level": 4,
            "erikson_stage": "competence",
            "erikson_resolution": 70,
            "resilience_delta": 0.2,
            "life_domains": {"self_dev": 3, "education": 4},
        },
        pos=1,
    ),
    dict(
        type="los", icon="🕯️", title="Смерть дедушки",
        date_text="Февраль 2006", date_from=date(2006, 2, 1),
        body="Первая потеря близкого. Глубокий след.",
        impact=-3, tags=["tl", "tt"],
        metrics={
            "maslow_level": 3,
            "erikson_stage": "intimacy",
            "erikson_resolution": 40,
            "resilience_delta": -0.3,
            "life_domains": {"family": -3},
        },
        pos=2,
    ),
    # 2007–2010 ────────────────────────────────────────────────────────────────
    dict(
        type="ach", icon="🏊", title="Разряд по плаванию",
        date_text="Апрель 2007", date_from=date(2007, 4, 1),
        body="3-й взрослый разряд. Первая спортивная победа.",
        impact=4, tags=["ta", "ts"],
        metrics={
            "maslow_level": 4,
            "erikson_stage": "competence",
            "erikson_resolution": 75,
            "resilience_delta": 0.2,
            "life_domains": {"health": 3, "self_dev": 2},
        },
        pos=0,
    ),
    dict(
        type="tra", icon="😰", title="Буллинг в школе",
        date_text="2008–2009", date_from=date(2008, 9, 1), date_to=date(2009, 6, 1),
        body="Замкнулся, потерял доверие к ровесникам.",
        impact=-4, tags=["tt"],
        metrics={
            "maslow_level": 3,
            "erikson_stage": "competence",
            "erikson_resolution": 35,
            "resilience_delta": -0.5,
            "life_domains": {"relations": -4, "health": -1},
            "defense_level": 1,
            "locus": 3.0,
            "window": "hypo",
        },
        pos=1,
    ),
    dict(
        type="ins", icon="💻", title="Первый контакт с кодом",
        date_text="2009", date_from=date(2009, 1, 1),
        body="HTML в школьном кружке. Понял: это моё.",
        impact=5, tags=["ti", "ts"],
        metrics={
            "maslow_level": 5,
            "maslow_score": 85,
            "erikson_stage": "competence",
            "erikson_resolution": 80,
            "resilience_delta": 0.3,
            "life_domains": {"career": 4, "self_dev": 4},
        },
        pos=2,
    ),
    # 2011–2014 ────────────────────────────────────────────────────────────────
    dict(
        type="ski", icon="⌨️", title="Самообучение программированию",
        date_text="2011–2013", date_from=date(2011, 1, 1), date_to=date(2013, 12, 31),
        body="JS → Python. Ночи напролёт.",
        impact=5, tags=["ts"],
        metrics={
            "maslow_level": 4,
            "maslow_score": 80,
            "erikson_stage": "competence",
            "erikson_resolution": 85,
            "resilience_delta": 0.4,
            "life_domains": {"career": 5, "self_dev": 5},
            "defense_level": 4,
            "locus": 8.5,
            "sdt": {"autonomy": 9, "competence": 8, "relatedness": 4},
        },
        pos=0,
    ),
    dict(
        type="fai", icon="📉", title="Провал на ЕГЭ",
        date_text="Июнь 2014", date_from=date(2014, 6, 1),
        body="67 вместо 85. Пересматривал планы.",
        impact=-2, tags=["tf"],
        metrics={
            "maslow_level": 4,
            "erikson_stage": "identity",
            "erikson_resolution": 45,
            "resilience_delta": -0.2,
            "life_domains": {"career": -2, "education": -2},
            "cognitive_distortions": ["catastrophising", "all_or_nothing"],
        },
        pos=1,
    ),
    dict(
        type="rel", icon="👫", title="Первые отношения",
        date_text="Весна 2014", date_from=date(2014, 4, 1),
        body="6 месяцев. Впервые открылся другому.",
        impact=3, tags=["tr"],
        metrics={
            "maslow_level": 3,
            "erikson_stage": "intimacy",
            "erikson_resolution": 55,
            "resilience_delta": 0.1,
            "life_domains": {"relations": 3},
        },
        pos=2,
    ),
    # 2015–2018 ────────────────────────────────────────────────────────────────
    dict(
        type="edu", icon="🎓", title="Университет — CS",
        date_text="Сен 2015", date_from=date(2015, 9, 1), date_to=date(2019, 6, 30),
        body="Бюджет. Первый в семье технарь.",
        impact=5, tags=["te", "ta"],
        metrics={
            "maslow_level": 4,
            "maslow_score": 81,
            "erikson_stage": "identity",
            "erikson_resolution": 72,
            "resilience_delta": 0.4,
            "life_domains": {"career": 5, "education": 5, "self_dev": 4},
            "locus": 7.8,
        },
        pos=0,
    ),
    dict(
        type="rel", icon="❤️", title="Серьёзные отношения",
        date_text="Март 2016 — 2019", date_from=date(2016, 3, 1), date_to=date(2019, 4, 1),
        body="3 года вместе. Много узнал о себе.",
        impact=3, tags=["tr"],
        metrics={
            "maslow_level": 3,
            "erikson_stage": "intimacy",
            "erikson_resolution": 60,
            "resilience_delta": 0.2,
            "life_domains": {"relations": 4},
        },
        pos=1,
    ),
    # 2018–2020 ────────────────────────────────────────────────────────────────
    dict(
        type="fai", icon="🚩", title="Провальный стартап",
        date_text="2018–2019", date_from=date(2018, 6, 1), date_to=date(2019, 6, 1),
        body="Год + ₽200к. Команда распалась. Урок о людях.",
        impact=-3, tags=["tf", "ti"],
        metrics={
            "maslow_level": 4,
            "erikson_stage": "generativity",
            "erikson_resolution": 35,
            "resilience_delta": -0.4,
            "life_domains": {"career": -3, "finance": -4},
            "defense_level": 2,
            "locus": 4.0,
            "cognitive_distortions": ["catastrophising"],
        },
        pos=0,
    ),
    dict(
        type="tra", icon="😮‍💨", title="Тревожное расстройство",
        date_text="Зима 2019", date_from=date(2019, 12, 1),
        body="Панические атаки. Терапия 8 месяцев.",
        impact=-4, tags=["tt"],
        metrics={
            "maslow_level": 2,
            "erikson_stage": "intimacy",
            "erikson_resolution": 30,
            "resilience_delta": -0.6,
            "life_domains": {"health": -4, "relations": -2},
            "defense_level": 1,
            "locus": 3.5,
            "window": "hyper",
            "cognitive_distortions": ["catastrophising", "mind_reading", "fortune_telling"],
            "sdt": {"autonomy": 3, "competence": 4, "relatedness": 3},
        },
        pos=1,
    ),
    dict(
        type="ach", icon="🚀", title="Первая работа в продукте",
        date_text="Янв 2020", date_from=date(2020, 1, 15),
        body="Middle → Senior за год в финтехе.",
        impact=4, tags=["ta", "ts"],
        metrics={
            "maslow_level": 4,
            "maslow_score": 75,
            "erikson_stage": "generativity",
            "erikson_resolution": 65,
            "resilience_delta": 0.5,
            "life_domains": {"career": 5, "finance": 3, "self_dev": 3},
            "locus": 7.5,
        },
        pos=2,
    ),
    # 2021–2024 ────────────────────────────────────────────────────────────────
    dict(
        type="los", icon="🕯️", title="Смерть папы",
        date_text="Ноябрь 2021", date_from=date(2021, 11, 1),
        body="Самая тяжёлая потеря. Переоценка всего.",
        impact=-5, tags=["tl", "tt"],
        metrics={
            "maslow_level": 1,
            "erikson_stage": "generativity",
            "erikson_resolution": 25,
            "resilience_delta": -0.8,
            "life_domains": {"family": -5, "health": -2},
            "exist": -2.0,
            "window": "hypo",
            "locus": 3.0,
        },
        pos=0,
    ),
    dict(
        type="ins", icon="🌍", title="Соло-путешествие",
        date_text="Май 2022", date_from=date(2022, 5, 1),
        body="Грузия, Армения, 40 дней. Выход из горя через движение.",
        impact=4, tags=["ti", "ta"],
        metrics={
            "maslow_level": 3,
            "erikson_stage": "generativity",
            "erikson_resolution": 50,
            "resilience_delta": 0.4,
            "life_domains": {"self_dev": 4, "relations": 2},
            "exist": 1.5,
            "defense_level": 4,
            "sdt": {"autonomy": 8, "competence": 5, "relatedness": 4},
        },
        pos=1,
    ),
    dict(
        type="ski", icon="🧘", title="Медитация и осознанность",
        date_text="2022 — сейчас", date_from=date(2022, 6, 1),
        body="Ежедневная практика. Управление тревогой.",
        impact=4, tags=["ts", "ti"],
        metrics={
            "maslow_level": 4,
            "maslow_score": 72,
            "erikson_stage": "generativity",
            "erikson_resolution": 70,
            "resilience_delta": 0.5,
            "life_domains": {"health": 3, "self_dev": 4},
            "exist": 2.8,
            "rf": 6,
            "window": "optimal",
            "locus": 7.2,
            "sdt": {"autonomy": 7, "competence": 7, "relatedness": 5},
        },
        pos=2,
    ),
    # Сейчас ───────────────────────────────────────────────────────────────────
    dict(
        type="ins", icon="🗺️", title="Life Roadmap — этот проект",
        date_text="Апрель 2026", date_from=date(2026, 4, 1),
        body="Строю карту своей жизни. Осмысление пути.",
        impact=5, tags=["ti"],
        metrics={
            "maslow_level": 5,
            "maslow_score": 88,
            "erikson_stage": "generativity",
            "erikson_resolution": 78,
            "resilience_delta": 0.4,
            "life_domains": {"self_dev": 5, "career": 3},
            "exist": 3.5,
        },
        pos=0,
    ),
]

# Дочерние события (sub-events) — ссылаются на родителя по title
CHILDREN = [
    dict(parent_title="Музыкальная школа", type="ach", icon="🎵",
         title="Первый концерт", date_text="Декабрь 2004",
         date_from=date(2004, 12, 1), body=None, impact=3, tags=["ta"], metrics={}, pos=0),
    dict(parent_title="Музыкальная школа", type="ach", icon="🏅",
         title="III место на конкурсе", date_text="Март 2005",
         date_from=date(2005, 3, 1), body=None, impact=3, tags=["ta"], metrics={}, pos=1),
    dict(parent_title="Самообучение программированию", type="ach", icon="🕹️",
         title="Первая игра на JS", date_text="Змейка, 2012",
         date_from=date(2012, 1, 1), body=None, impact=3, tags=["ts"], metrics={}, pos=0),
    dict(parent_title="Самообучение программированию", type="ach", icon="🌐",
         title="Первый фриланс-сайт", date_text="₽3000, 2013",
         date_from=date(2013, 1, 1), body=None, impact=3, tags=["ta"], metrics={}, pos=1),
    dict(parent_title="Университет — CS", type="ach", icon="🐍",
         title="Python / алгоритмы", date_text="1-й семестр",
         date_from=date(2015, 9, 1), body=None, impact=2, tags=["ts"], metrics={}, pos=0),
    dict(parent_title="Университет — CS", type="ach", icon="🥇",
         title="Повышенная стипендия", date_text="2-й семестр 2016",
         date_from=date(2016, 2, 1), body=None, impact=3, tags=["ta"], metrics={}, pos=1),
    dict(parent_title="Университет — CS", type="ins", icon="💡",
         title="Хочу в продуктовую разработку", date_text="Озарение, 3-й курс",
         date_from=date(2017, 9, 1), body=None, impact=4, tags=["ti"], metrics={}, pos=2),
    dict(parent_title="Серьёзные отношения", type="los", icon="💔",
         title="Расставание", date_text="Апрель 2019 — боль и рост",
         date_from=date(2019, 4, 1), body=None, impact=-3, tags=["tl"], metrics={}, pos=0),
    dict(parent_title="Тревожное расстройство", type="ach", icon="🛋️",
         title="Психотерапия", date_text="8 мес., 2019–2020",
         date_from=date(2019, 12, 1), date_to=date(2020, 8, 1),
         body=None, impact=3, tags=["ta"], metrics={}, pos=0),
    dict(parent_title="Тревожное расстройство", type="ski", icon="📚",
         title="КПТ и ACT", date_text="Инструменты саморегуляции",
         date_from=date(2020, 1, 1), body=None, impact=4, tags=["ts"], metrics={}, pos=1),
]


async def seed():
    engine = create_async_engine(settings.database_url, echo=True)
    session_maker = async_sessionmaker(engine, expire_on_commit=False)

    async with session_maker() as session:
        # Проверяем, что таблица пустая
        from sqlalchemy import select, func
        count = (await session.execute(select(func.count()).select_from(Event))).scalar()
        if count and count > 0:
            print(f"База уже содержит {count} событий. Пропускаю seed.")
            return

        # Вставляем корневые события
        title_to_id: dict[str, Event] = {}
        for data in EVENTS:
            ev = Event(**data)
            session.add(ev)
            await session.flush()
            title_to_id[ev.title] = ev

        # Вставляем дочерние события
        for data in CHILDREN:
            parent_title = data.pop("parent_title")
            parent = title_to_id.get(parent_title)
            if parent:
                child = Event(parent_id=parent.id, **data)
                session.add(child)

        await session.commit()
        print(f"Seed complete: {len(EVENTS)} events + {len(CHILDREN)} sub-events")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
