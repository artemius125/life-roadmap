import uuid
from datetime import date, datetime
from pydantic import BaseModel, ConfigDict


class SnapshotOut(BaseModel):
    id: uuid.UUID
    period_start: date
    period_end: date
    metrics_json: dict
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
