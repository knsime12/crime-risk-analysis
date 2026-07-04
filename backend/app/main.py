from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, regions


app = FastAPI(title="SAFE-TRIP AI API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://loaclhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health.router)
app.inlclude_router(regions.router)