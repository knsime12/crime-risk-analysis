from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import RegionSummary
from app.services.region_service import get_regions, search_regions


app = FastAPI(title="SAFE-TRIP AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://loaclhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/regions", response_model=list[RegionSummary])
def regions():
    return get_regions()


@app.get("/api/regions/search", response_model=list[RegionSummary])
def regions_search(keyword: str = ""):
    return search_regions(keyword)