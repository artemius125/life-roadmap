import uuid
from datetime import date
from typing import Optional
from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate, EventOut, EventChainNode

router = APIRouter(prefix="/events", tags=["events"])


def _period_start(period: Optional[str]) -> Optional[date]:
    if not period or period == "all":
        return None
    today = date.today()
    deltas = {
        "1m": relativedelta(months=1),
        "3m": relativedelta(months=3),
        "6m": relativedelta(months=6),
        "1y": relativedelta(years=1),
        "2y": relativedelta(years=2),
        "5y": relativedelta(years=5),
    }
    return today - deltas[period]


@router.get("", response_model=list[EventOut])
async def list_events(
    period: Optional[str] = Query(None, pattern="^(1m|3m|6m|1y|2y|5y|all)$"),
    type: Optional[str] = Query(None, pattern="^(ach|ski|los|fai|tra|rel|edu|ins)$"),
    impact_min: Optional[int] = Query(None, ge=-5, le=5),
    impact_max: Optional[int] = Query(None, ge=-5, le=5),
    db: AsyncSession = Depends(get_db),
):
    q = select(Event).where(Event.parent_id.is_(None))  # только корневые события
    start = _period_start(period)
    if start:
        q = q.where(Event.date_from >= start)
    if type:
        q = q.where(Event.type == type)
    if impact_min is not None:
        q = q.where(Event.impact >= impact_min)
    if impact_max is not None:
        q = q.where(Event.impact <= impact_max)
    q = q.order_by(Event.date_from.asc().nullslast(), Event.pos.asc())
    result = await db.execute(q)
    return result.scalars().all()


@router.post("", response_model=EventOut, status_code=201)
async def create_event(
    payload: EventCreate,
    db: AsyncSession = Depends(get_db),
):
    if payload.parent_id:
        parent = await db.get(Event, payload.parent_id)
        if not parent:
            raise HTTPException(404, "parent event not found")

    event = Event(**payload.model_dump())
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


@router.get("/{event_id}", response_model=EventOut)
async def get_event(event_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    event = await db.get(Event, event_id)
    if not event:
        raise HTTPException(404, "event not found")
    return event


@router.put("/{event_id}", response_model=EventOut)
async def update_event(
    event_id: uuid.UUID,
    payload: EventUpdate,
    db: AsyncSession = Depends(get_db),
):
    event = await db.get(Event, event_id)
    if not event:
        raise HTTPException(404, "event not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(event, field, value)

    await db.commit()
    await db.refresh(event)
    return event


@router.delete("/{event_id}", status_code=204)
async def delete_event(event_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    event = await db.get(Event, event_id)
    if not event:
        raise HTTPException(404, "event not found")
    await db.delete(event)
    await db.commit()


@router.get("/{event_id}/chain", response_model=list[EventChainNode])
async def get_event_chain(event_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Все потомки события через Recursive CTE (Postgres-функция)."""
    result = await db.execute(
        text("SELECT id, parent_id, title, type, depth FROM get_event_chain(:root_id)"),
        {"root_id": str(event_id)},
    )
    rows = result.fetchall()
    if not rows:
        raise HTTPException(404, "event not found")
    return [
        EventChainNode(id=r.id, parent_id=r.parent_id, title=r.title, type=r.type, depth=r.depth)
        for r in rows
    ]
