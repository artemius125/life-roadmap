from fastapi import APIRouter
from .events import router as events_router
from .metrics import router as metrics_router
from .audit import router as audit_router
from .snapshots import router as snapshots_router

v1 = APIRouter(prefix="/api/v1")
v1.include_router(events_router)
v1.include_router(metrics_router)
v1.include_router(audit_router)
v1.include_router(snapshots_router)
