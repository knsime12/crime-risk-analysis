from fastapi import HTTPException

from app.database import SessionLocal
from app.models import PoliceStation, RegionSafetyStat
from app.schemas import MapRegionResponse, PoliceStationSummary


def get_map_region(region_id: str) -> MapRegionResponse:
    db = SessionLocal()

    try:
        region = (
            db.query(RegionSafetyStat)
            .filter(RegionSafetyStat.region_id == region_id)
            .first()
        )

        if region is None:
            raise HTTPException(status_code=404, detail="Region map data not found")
        
        stations = (
            db.query(PoliceStation)
            .filter(PoliceStation.region_id == region_id)
            .order_by(PoliceStation.station_type, PoliceStation.name)
            .all()
        )

        return MapRegionResponse(
            region_id=region.region_id,
            region_label=f"{region.sido} {region.sigungu}",
            sido=region.sido,
            sigungu=region.sigungu,
            region_type=region.region_type,
            risk_score=region.risk_score,
            cctv_count=region.cctv_count,
            police_station_count=region.police_station_count,
            police_box_count=region.police_box_count,
            police_stations=[
                PoliceStationSummary(
                    name=station.name,
                    type=station.station_type,
                    longitude=station.longitude,
                    latitude=station.latitude,
                )
                for station in stations
            ],
        )
    
    finally:
        db.close()