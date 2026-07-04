from pathlib import Path

import pandas as pd
from fastapi import HTTPException

from app.schemas import (
    CrimeRatios,
    InfraSummary,
    RegionReport,
)


DATA_PATH = (
    Path(__file__).resolve().parents[3]
    / "legacy_ui"
    / "travel-safe-platform-main"
    / "src"
    / "main"
    / "resources"
    / "data.csv"
)


def get_report(region_id: str) -> RegionReport:
    df = pd.read_csv(DATA_PATH, encoding="utf-8")
    
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
            risk_score=float(row["risk_score"]),
            region_type=str(row["region_type"]),
            major_crime_type=str(row["major_crime_type"]),
            crime_count=int(row["crime_count"]),
            crime_ratios=CrimeRatios(
                theft=float(row["절도_비율"]),
                violence=float(row["폭력_비율"]),
                sexual_assault=float(row["성범죄_비율"]),
                robbery=float(row["강도_비율"]),
                murder=float(row["살인_비율"]),
            ),
            infra=InfraSummary(
                cctv_count=int(row["cctv_count"]),
                police_station_count=int(row["경찰서"]),
                police_box_count=int(row["파출소"]),
            ),
        )
        
    raise HTTPException(status_code=404, detail="Region report not found")