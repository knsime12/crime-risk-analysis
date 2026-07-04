from pydantic import BaseModel

class RegionSummary(BaseModel):
    region_id: str
    sido: str
    sigungu: str
    risk_score: float
    region_type: str
    cctv_count: int
    police_station_count: int
    police_box_count: int
    
    
class CrimeRatios(BaseModel):
    theft: float
    violence: float
    sexual_assault: float
    robbery: float
    murder: float
    
    
class InfraSummary(BaseModel):
    cctv_count: int
    police_station_count: int
    police_box_count: int
    
    
class RegionReport(BaseModel):
    region_id: str
    sido: str
    sigungu: str
    risk_score: float
    region_type: str
    major_crime_type: str
    crime_count: int
    crime_ratios: CrimeRatios
    infra: InfraSummary