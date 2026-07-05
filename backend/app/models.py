from sqlalchemy import Column, Float, Integer, String

from app.database import Base


class RegionSafetyStat(Base):
    __tablename__ = "region_safety_stats"
    
    region_id = Column(String, primary_key=True, index=True)
    sido = Column(String, nullable=False, index=True)
    sigungu = Column(String, nullable=False, index=True)
    
    robbery = Column(Integer, nullable=False, default=0)
    murder = Column(Integer, nullable=False, default=0)
    sexual_assault = Column(Integer, nullable=False, default=0)
    theft = Column(Integer, nullable=False, default=0)
    violence = Column(Integer, nullable=False, default=0)
    
    major_crime_type = Column(String, nullable=False)
    
    theft_ratio = Column(Float, nullable=False, default=0)
    violence_ratio = Column(Float, nullable=False, default=0)
    sexual_assault_ratio = Column(Float, nullable=False, default=0)
    robbery_ratio = Column(Float, nullable=False, default=0)
    murder_ratio = Column(Float, nullable=False, default=0)
    
    crime_count = Column(Integer, nullable=False, default=0)
    risk_score = Column(Float, nullable=False)
    cluster = Column(Integer, nullable=False)
    region_type = Column(String, nullable=False)
    
    cctv_count = Column(Integer, nullable=False, default=0)
    police_station_count = Column(Integer, nullable=False, default=0)
    police_box_count = Column(Integer, nullable=False, default=0)