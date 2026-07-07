from app.database import SessionLocal
from app.models import RegionSafetyStat
from app.schemas import RegionSummary


def to_region_summary(region: RegionSafetyStat) -> RegionSummary:
    return RegionSummary(
        region_id=region.region_id,
        sido=region.sido,
        sigungu=region.sigungu,
        risk_score=region.risk_score,
        region_type=region.region_type,
        cctv_count=region.cctv_count,
        police_station_count=region.police_station_count,
        police_box_count=region.police_box_count,
    )


def get_regions() -> list[RegionSummary]:
    db = SessionLocal()

    try:
        regions = (
            db.query(RegionSafetyStat)
            .order_by(RegionSafetyStat.sido, RegionSafetyStat.sigungu)
            .all()
        )

        return [to_region_summary(region) for region in regions]
    
    finally:
        db.close()


def search_regions(keyword: str = "") -> list[RegionSummary]:
    keyword = keyword.strip()
    
    if not keyword:
        return get_regions()
    
    return [
        region
        for region in get_regions()
        if keyword in region.sido 
        or keyword in region.sigungu
        or keyword in f"{region.sido} {region.sigungu}"
    ]