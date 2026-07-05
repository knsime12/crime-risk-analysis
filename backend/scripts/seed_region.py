import sys
from pathlib import Path

import pandas as pd


BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(BACKEND_DIR))


from app.config import DATA_DIR, REGION_DATA_PATH
from app.database import Base, SessionLocal, engine
from app.models import RegionSafetyStat
from app.utils import to_float, to_int


def seed_regions():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    Base.metadata.create_all(bind=engine)
    
    df = pd.read_csv(REGION_DATA_PATH, encoding="utf-8")
    
    db = SessionLocal()
    try:
        db.query(RegionSafetyStat).delete()
        
        for _, row in df.iterrows():
            sido = str(row["시도"])
            sigungu = str(row["시군구"])
            
            db.add(
                RegionSafetyStat(
                    region_id=f"{sido}-{sigungu}",
                    sido=sido,
                    sigungu=sigungu,
                    robbery=to_int(row["강도"]),
                    murder=to_int(row["살인"]),
                    sexual_assault=to_int(row["성범죄"]),
                    theft=to_int(row["절도"]),
                    violence=to_int(row["폭력"]),
                    major_crime_type=str(row["major_crime_type"]),
                    theft_ratio=to_float(row["절도_비율"]),
                    violence_ratio=to_float(row["폭력_비율"]),
                    sexual_assault_ratio=to_float(row["성범죄_비율"]),
                    robbery_ratio=to_float(row["강도_비율"]),
                    murder_ratio=to_float(row["살인_비율"]),
                    crime_count=to_int(row["crime_count"]),
                    risk_score=to_float(row["risk_score"]),
                    cluster=to_int(row["cluster"]),
                    region_type=str(row["region_type"]),
                    cctv_count=to_int(row["cctv_count"]),
                    police_station_count=to_int(row["경찰서"]),
                    police_box_count=to_int(row["파출소"]),
                )
            )
            
        db.commit()
    finally:
        db.close()
        
        
if __name__ == "__main__":
    seed_regions()
    print("Seeded region safety stats.")