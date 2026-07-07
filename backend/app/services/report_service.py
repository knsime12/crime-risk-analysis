from fastapi import HTTPException

from app.schemas import (
    CrimeRatios,
    InfraSummary,
    RegionReport,
)
from app.database import SessionLocal
from app.models import RegionSafetyStat


def get_report(region_id: str) -> RegionReport:
    db = SessionLocal()

    try:
        region = (
            db.query(RegionSafetyStat)
            .filter(RegionSafetyStat.region_id == region_id)
            .first()
        )

        if region is None:
            raise HTTPException(status_code=404, detail="Region report not found")
        
        return RegionReport(
            region_id=region.region_id,
            sido=region.sido,
            sigungu=region.sigungu,
            risk_score=region.risk_score,
            region_type=region.region_type,
            major_crime_type=region.major_crime_type,
            crime_count=region.crime_count,
            crime_ratios=CrimeRatios(
                theft=region.theft_ratio,
                violence=region.violence_ratio,
                sexual_assault=region.sexual_assault_ratio,
                robbery=region.robbery_ratio,
                murder=region.murder_ratio,
            ),
            infra=InfraSummary(
                cctv_count=region.cctv_count,
                police_station_count=region.police_station_count,
                police_box_count=region.police_box_count,
            ),
        )
    
    finally:
        db.close()