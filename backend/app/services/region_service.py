from functools import lru_cache

import pandas as pd

from app.schemas import RegionSummary
from app.utils import to_int
from app.config import REGION_DATA_PATH


@lru_cache
def load_regions() -> list[RegionSummary]:
    df = pd.read_csv(REGION_DATA_PATH, encoding="utf-8")
    regions = []
    
    for _, row in df.iterrows():
        sido = str(row["시도"])
        sigungu = str(row["시군구"])
        
        regions.append(
            RegionSummary(
                region_id=f"{sido}-{sigungu}",
                sido=sido,
                sigungu=sigungu,
                risk_score=float(row["risk_score"]),
                region_type=str(row["region_type"]),
                cctv_count=to_int(row["cctv_count"]),
                police_station_count=to_int(row["경찰서"]),
                police_box_count=to_int(row["파출소"])
            )
        )
        
    return regions


def get_regions() -> list[RegionSummary]:
    return load_regions()


def search_regions(keyword: str = "") -> list[RegionSummary]:
    keyword = keyword.strip()
    
    if not keyword:
        return get_regions()
    
    return [
        region
        for region in get_regions()
        if keyword in region.sido or keyword in region.sigungu
    ]