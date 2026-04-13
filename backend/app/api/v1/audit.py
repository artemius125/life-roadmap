import uuid
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.models.audit import AuditLog
from app.schemas.audit import AuditLogOut

router = APIRouter(prefix="/audit", tags=["audit"])


@router.get("/{event_id}", response_model=list[AuditLogOut])
async def get_audit_log(
    event_id: uuid.UUID,
    limit: int = Query(50, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
):
    """История изменений события — записывается Postgres-триггером."""
    q = (
        select(AuditLog)
        .where(AuditLog.event_id == event_id)
        .order_by(AuditLog.changed_at.desc())
        .limit(limit)
    )
    result = await db.execute(q)
    return result.scalars().all()
