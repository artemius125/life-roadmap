from datetime import date
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.models.snapshot import Snapshot
from app.schemas.snapshot import SnapshotOut
from app.api.v1.metrics import (
    _fetch_events, _compute_maslow, _compute_radar,
    _compute_donut, _compute_density, _compute_resilience, _detect_pattern,
)

router = APIRouter(prefix="/snapshots", tags=["snapshots"])


@router.get("", response_model=list[SnapshotOut])
async def list_snapshots(db: AsyncSession = Depends(get_db)):
    q = select(Snapshot).order_by(Snapshot.period_start.desc())
    result = await db.execute(q)
    return result.scalars().all()


@router.post("", response_model=SnapshotOut, status_code=201)
async def create_snapshot(db: AsyncSession = Depends(get_db)):
    """Создать снапшот текущего состояния (вызывается вручную или по расписанию)."""
    today = date.today()
    period_start = today.replace(day=1)

    events = await _fetch_events(db, "all")
    maslow = _compute_maslow(events)
    radar = _compute_radar(events)
    donut = _compute_donut(events)
    density = _compute_density(events)

    metrics_json = {
        "events_total": len(events),
        "resilience": _compute_resilience(events),
        "pattern": _detect_pattern(events),
        "maslow": maslow.model_dump(),
        "radar": radar.model_dump(),
        "donut": donut.model_dump(),
        "density": density.model_dump(),
    }

    snap = Snapshot(
        period_start=period_start,
        period_end=today,
        metrics_json=metrics_json,
    )
    db.add(snap)
    await db.commit()
    await db.refresh(snap)
    return snap
