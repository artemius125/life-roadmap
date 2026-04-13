import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class AuditLogOut(BaseModel):
    id: int
    event_id: uuid.UUID
    operation: str
    old_data: Optional[dict] = None
    new_data: Optional[dict] = None
    changed_at: datetime

    model_config = ConfigDict(from_attributes=True)
