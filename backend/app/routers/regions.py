from fastapi import APIRouter

from app.schemas import RegionSummary
from app.services.region_service import get_regions, search_regions


router = APIRouter(prefix="/api/regions", tags=["regions"])


@router.get("", response_model=list[RegionSummary])
def regions():
    return get_regions()


@router.get("/search", response_model=list[RegionSummary])
def regions_search(keyword: str = ""):
    return search_regions(keyword)