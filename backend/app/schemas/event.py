import uuid
from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class EventBase(BaseModel):
    type: str = Field(..., pattern="^(ach|ski|los|fai|tra|rel|edu|ins)$")
    icon: Optional[str] = None
    title: str = Field(..., min_length=1, max_length=255)
    date_text: Optional[str] = Field(None, max_length=64)
    date_from: Optional[date] = None
    date_to: Optional[date] = None
    body: Optional[str] = None
    impact: int = Field(0, ge=-5, le=5)
    tags: list[str] = []
    metrics: dict = {}
    pos: int = 0
    parent_id: Optional[uuid.UUID] = None


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    type: Optional[str] = Field(None, pattern="^(ach|ski|los|fai|tra|rel|edu|ins)$")
    icon: Optional[str] = None
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    date_text: Optional[str] = Field(None, max_length=64)
    date_from: Optional[date] = None
    date_to: Optional[date] = None
    body: Optional[str] = None
    impact: Optional[int] = Field(None, ge=-5, le=5)
    tags: Optional[list[str]] = None
    metrics: Optional[dict] = None
    pos: Optional[int] = None
    parent_id: Optional[uuid.UUID] = None


class EventOut(EventBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    children: list["EventOut"] = []

    model_config = ConfigDict(from_attributes=True)


class EventChainNode(BaseModel):
    id: uuid.UUID
    parent_id: Optional[uuid.UUID]
    title: str
    type: str
    depth: int


class EventListParams(BaseModel):
    period: Optional[str] = Field(None, pattern="^(1m|3m|6m|1y|2y|5y|all)$")
    type: Optional[str] = Field(None, pattern="^(ach|ski|los|fai|tra|rel|edu|ins)$")
    impact_min: Optional[int] = Field(None, ge=-5, le=5)
    impact_max: Optional[int] = Field(None, ge=-5, le=5)
