import pandas as pd

def to_int(value) -> int:
    if pd.isna(value):
        return 0
    
    return int(float(value))


def to_float(value) -> float:
    if pd.isna(value):
        return 0.0
    
    return float(value)