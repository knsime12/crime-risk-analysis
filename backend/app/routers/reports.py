from fastapi import APIRouter

from app.schemas import RegionReport
from app.services.report_service import get_report


router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.get("/{region_id}", response_model=RegionReport)
def report(region_id: str):
    return get_report(region_id)