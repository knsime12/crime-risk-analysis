from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    health,
    maps,
    regions,
    reports,
    guides,
)


app = FastAPI(title="SAFE-TRIP AI API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health.router)
app.include_router(regions.router)
app.include_router(reports.router)
app.include_router(maps.router)
app.include_router(guides.router)