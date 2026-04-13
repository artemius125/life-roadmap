import uuid
from datetime import date, datetime
from sqlalchemy import (
    UUID, String, Text, SmallInteger, Integer, Date,
    ARRAY, ForeignKey, func,
)
from sqlalchemy.dialects.postgresql import JSONB, TIMESTAMPTZ
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base


class Event(Base):
    __tablename__ = "events"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    parent_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("events.id", ondelete="SET NULL"), nullable=True
    )

    # Тип события: ach, ski, los, fai, tra, rel, edu, ins
    type: Mapped[str] = mapped_column(String(32), nullable=False)

    # Отображение
    icon: Mapped[str | None] = mapped_column(String(16))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    date_text: Mapped[str | None] = mapped_column(String(64))   # "Май 2022"
    date_from: Mapped[date | None] = mapped_column(Date)        # для сортировки и фильтрации
    date_to: Mapped[date | None] = mapped_column(Date)
    body: Mapped[str | None] = mapped_column(Text)
    impact: Mapped[int] = mapped_column(SmallInteger, default=0)
    tags: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)

    # Психологические метрики (JSONB): maslow_level, erikson_stage, locus, rf, sdt, ...
    metrics: Mapped[dict] = mapped_column(JSONB, default=dict)

    # Порядок отображения внутри периода
    pos: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMPTZ, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMPTZ, server_default=func.now()
    )

    # Дочерние события (sub-events)
    children: Mapped[list["Event"]] = relationship(
        "Event",
        backref="parent",
        foreign_keys=[parent_id],
        lazy="selectin",
    )
