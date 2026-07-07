from fastapi import APIRouter

from app.schemas import MapRegionResponse
from app.services.map_service import get_map_region


router = APIRouter(prefix="/api/map", tags=["map"])


@router.get("/regions/{region_id}", response_model=MapRegionResponse)
def map_region(region_id: str):
    return get_map_region(region_id)