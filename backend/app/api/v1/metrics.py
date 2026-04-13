from collections import Counter
from datetime import date
from typing import Optional
from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.models.event import Event
from app.schemas.metrics import (
    MetricsAllOut, MaslowOut, MaslowLevel,
    RadarOut, DonutOut, DonutItem, DensityOut,
    EriksonOut, EriksonStage,
)

router = APIRouter(prefix="/metrics", tags=["metrics"])

# ── Словари ──────────────────────────────────────────────────────────────────

TYPE_LABELS = {
    "ach": "Достижение", "ski": "Навык", "los": "Потеря",
    "fai": "Поражение", "tra": "Психотравма", "rel": "Отношения",
    "edu": "Образование", "ins": "Озарение",
}
TYPE_COLORS = {
    "ach": "#3ddc7a", "ski": "#8b6fff", "los": "#ff5e7a",
    "fai": "#ff8f3c", "tra": "#c084fc", "rel": "#00c9b8",
    "edu": "#f0c040", "ins": "#67e8f9",
}
MASLOW_NAMES = ["Физиология", "Безопасность", "Принадлежность", "Уважение", "Самоактуализация"]
RADAR_AXES = ["Карьера", "Здоровье", "Отношения", "Саморазвитие", "Финансы", "Семья", "Смысл", "Творчество"]


def _period_start(period: str) -> Optional[date]:
    if period == "all":
        return None
    today = date.today()
    deltas = {
        "1m": relativedelta(months=1), "3m": relativedelta(months=3),
        "6m": relativedelta(months=6), "1y": relativedelta(years=1),
        "2y": relativedelta(years=2), "5y": relativedelta(years=5),
    }
    return today - deltas.get(period, relativedelta(years=100))


async def _fetch_events(db: AsyncSession, period: str) -> list[Event]:
    q = select(Event)
    start = _period_start(period)
    if start:
        q = q.where(Event.date_from >= start)
    result = await db.execute(q)
    return result.scalars().all()


def _compute_maslow(events: list[Event]) -> MaslowOut:
    counts: Counter[int] = Counter()
    scores: dict[int, list[float]] = {i: [] for i in range(1, 6)}
    for ev in events:
        level = ev.metrics.get("maslow_level")
        if isinstance(level, int) and 1 <= level <= 5:
            counts[level] += 1
            if isinstance(ev.metrics.get("maslow_score"), (int, float)):
                scores[level].append(ev.metrics["maslow_score"])
    levels = []
    for i in range(1, 6):
        sc = (sum(scores[i]) / len(scores[i])) if scores[i] else (counts[i] * 10.0)
        levels.append(MaslowLevel(level=i, name=MASLOW_NAMES[i - 1], score=round(sc, 1), events_count=counts[i]))
    return MaslowOut(levels=levels)


def _compute_radar(events: list[Event]) -> RadarOut:
    totals: dict[str, list[float]] = {ax: [] for ax in RADAR_AXES}
    for ev in events:
        domains: dict = ev.metrics.get("life_domains", {})
        for ax in RADAR_AXES:
            key = ax.lower()
            if key in domains and isinstance(domains[key], (int, float)):
                totals[ax].append(float(domains[key]))
    values = [round(sum(v) / len(v) if v else 5.0, 1) for v in totals.values()]
    return RadarOut(axes=RADAR_AXES, values=values)


def _compute_donut(events: list[Event]) -> DonutOut:
    counts: Counter[str] = Counter(ev.type for ev in events)
    items = [
        DonutItem(type=t, label=TYPE_LABELS.get(t, t), count=c, color=TYPE_COLORS.get(t, "#888"))
        for t, c in sorted(counts.items(), key=lambda x: -x[1])
    ]
    return DonutOut(items=items)


def _compute_density(events: list[Event]) -> DensityOut:
    years: Counter[int] = Counter()
    for ev in events:
        if ev.date_from:
            years[ev.date_from.year] += 1
    return DensityOut(years=dict(sorted(years.items())))


def _compute_erikson(events: list[Event]) -> EriksonOut:
    stage_resolutions: dict[str, list[float]] = {}
    for ev in events:
        stage = ev.metrics.get("erikson_stage")
        resolution = ev.metrics.get("erikson_resolution")
        if stage and isinstance(resolution, (int, float)):
            stage_resolutions.setdefault(stage, []).append(float(resolution))
    stages = [
        EriksonStage(stage=s, resolution=round(sum(v) / len(v), 1))
        for s, v in stage_resolutions.items()
    ]
    return EriksonOut(stages=stages)


def _compute_resilience(events: list[Event]) -> float:
    deltas = [ev.metrics.get("resilience_delta", 0) for ev in events
              if isinstance(ev.metrics.get("resilience_delta"), (int, float))]
    if not deltas:
        return 5.0
    base = 5.0
    return round(min(10.0, max(0.0, base + sum(deltas))), 2)


def _detect_pattern(events: list[Event]) -> str:
    counts: Counter[str] = Counter(ev.type for ev in events)
    if not counts:
        return "Нет данных"
    dominant = counts.most_common(1)[0][0]
    patterns = {
        "ach": "Достижение через преодоление",
        "ski": "Непрерывное развитие навыков",
        "los": "Трансформация через потерю",
        "fai": "Рост через поражение",
        "tra": "Исцеление психотравм",
        "rel": "Формирование связей",
        "edu": "Образовательный путь",
        "ins": "Инсайт и прорыв",
    }
    return patterns.get(dominant, "Смешанный паттерн")


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/all", response_model=MetricsAllOut)
async def metrics_all(
    period: str = Query("all", pattern="^(1m|3m|6m|1y|2y|5y|all)$"),
    db: AsyncSession = Depends(get_db),
):
    events = await _fetch_events(db, period)
    return MetricsAllOut(
        period=period,
        events_total=len(events),
        maslow=_compute_maslow(events),
        radar=_compute_radar(events),
        donut=_compute_donut(events),
        density=_compute_density(events),
        erikson=_compute_erikson(events),
        resilience=_compute_resilience(events),
        pattern=_detect_pattern(events),
    )


@router.get("/maslow", response_model=MaslowOut)
async def metrics_maslow(
    period: str = Query("all", pattern="^(1m|3m|6m|1y|2y|5y|all)$"),
    db: AsyncSession = Depends(get_db),
):
    events = await _fetch_events(db, period)
    return _compute_maslow(events)


@router.get("/wheel", response_model=RadarOut)
async def metrics_wheel(
    period: str = Query("all", pattern="^(1m|3m|6m|1y|2y|5y|all)$"),
    db: AsyncSession = Depends(get_db),
):
    events = await _fetch_events(db, period)
    return _compute_radar(events)


@router.get("/density", response_model=DensityOut)
async def metrics_density(db: AsyncSession = Depends(get_db)):
    events = await _fetch_events(db, "all")
    return _compute_density(events)
