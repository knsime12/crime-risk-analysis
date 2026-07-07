from fastapi import APIRouter

from app.schemas import SafetyGuide
from app.services.guide_service import get_guide, get_guides


router = APIRouter(prefix="/api/guides", tags=["guides"])


@router.get("", response_model=list[SafetyGuide])
def guides():
    return get_guides()


@router.get("/{guide_type}", response_model=SafetyGuide)
def guide(guide_type: str):
    return get_guide(guide_type)