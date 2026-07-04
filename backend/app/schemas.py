from pydantic import BaseModel

class RegionSummary(BaseModel):
    region_id: str
    sido: str
    sigungu: str
    risk_score: float
    cctv_count: int
    police_station_count: int
    police_box_count: int