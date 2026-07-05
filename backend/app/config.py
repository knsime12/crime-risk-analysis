from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
BACKEND_DIR = BASE_DIR / "backend"
DATA_DIR = BACKEND_DIR / "data"


LEGACY_RESOURCE_DIR = (
    BASE_DIR
    / "legacy_ui"
    / "travel-safe-platform-main"
    / "src"
    / "main"
    / "resources"
)

REGION_DATA_PATH = LEGACY_RESOURCE_DIR / "data.csv"
POLICE_DATA_PATH = LEGACY_RESOURCE_DIR / "police.csv"

DATABASE_URL = f"sqlite:///{DATA_DIR / 'safe_trip.db'}"