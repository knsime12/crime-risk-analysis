from pathlib import Path

import pandas as pd
from fastapi import HTTPException

from app.schemas import (
    CrimeRatios,
    InfraSummary,
    RegionReport,
)
from app.utils import to_int, to_float
from app.config import REGION_DATA_PATH


def get_report(region_id: str) -> RegionReport:
    df = pd.read_csv(REGION_DATA_PATH, encoding="utf-8")
    
    for _, row in df.iterrows():
        sido = str(row["시도"])
        sigungu = str(row["시군구"])
        current_region_id = f"{sido}-{sigungu}"
        
        if current_region_id != region_id:
            continue
        
        return RegionReport(
            region_id=current_region_id,
            sido=sido,
            sigungu=sigungu,
            risk_score=to_float(row["risk_score"]),
            region_type=str(row["region_type"]),
            major_crime_type=str(row["major_crime_type"]),
            crime_count=to_int(row["crime_count"]),
            crime_ratios=CrimeRatios(
                theft=to_float(row["절도_비율"]),
                violence=to_float(row["폭력_비율"]),
                sexual_assault=to_float(row["성범죄_비율"]),
                robbery=to_float(row["강도_비율"]),
                murder=to_float(row["살인_비율"]),
            ),
            infra=InfraSummary(
                cctv_count=to_int(row["cctv_count"]),
                police_station_count=to_int(row["경찰서"]),
                police_box_count=to_int(row["파출소"]),
            ),
        )
        
    raise HTTPException(status_code=404, detail="Region report not found")