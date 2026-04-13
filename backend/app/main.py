from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.v1.router import v1

app = FastAPI(
    title="Life Roadmap API",
    description="Бэкенд для личной карты жизни с психологическими метриками",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1)


@app.get("/health", tags=["system"])
async def health():
    return {"status": "ok", "version": "1.0.0"}
