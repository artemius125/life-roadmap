from pydantic import BaseModel


class MaslowLevel(BaseModel):
    level: int
    name: str
    score: float       # среднее значение по событиям в этом уровне
    events_count: int


class MaslowOut(BaseModel):
    levels: list[MaslowLevel]


class RadarOut(BaseModel):
    axes: list[str]
    values: list[float]


class DonutItem(BaseModel):
    type: str
    label: str
    count: int
    color: str


class DonutOut(BaseModel):
    items: list[DonutItem]


class DensityOut(BaseModel):
    years: dict[int, int]    # {год: количество событий}


class EriksonStage(BaseModel):
    stage: str
    resolution: float        # 0–100


class EriksonOut(BaseModel):
    stages: list[EriksonStage]


class MetricsAllOut(BaseModel):
    period: str
    events_total: int
    maslow: MaslowOut
    radar: RadarOut
    donut: DonutOut
    density: DensityOut
    erikson: EriksonOut
    resilience: float        # 0–10
    pattern: str             # главный паттерн периода
