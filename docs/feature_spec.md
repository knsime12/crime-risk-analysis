# SAFE TRIP AI - 기능 명세서

## 1. 서비스 개요

SAFE TRIP AI는 지역별 범죄 통계와 치안 인프라 데이터를 기반으로
지역 안전 리포트와 지도 시각화를 제공하는 웹 서비스입니다.

기존 팀 프로젝트에서 생성했던 범죄 위험도 분석 데이터를
Python/FastAPI 백엔드와 React 프론트엔드로 재구현합니다.

본 프로젝트의 핵심 목표는 범죄 위험도 분석 결과를 API로 제공하고,
React 화면과 카카오맵 시각화를 통해 사용자가 지역별 안전 정보를 쉽게 확인할 수 있도록 하는 것입니다.

## 2. MVP 핵심 목표

- 범죄/치안 인프라 데이터를 기반으로 지역별 안전 정보를 제공한다.
- 기존 분석 결과 CSV를 FastAPI에서 조회 가능한 API로 제공한다.
- React 화면에서 지역 검색, 안전 리포트, 지도 시각화를 제공한다.
- 카카오맵 API를 활용해 경찰 시설 위치를 지도에 표시한다.
- 초기 버전은 CSV 기반으로 구현하고, DB 연동은 추후 확장으로 분리한다.

## 3. 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Python, FastAPI |
| Data Analysis | Pandas, NumPy, scikit-learn |
| Map | Kakao Map JavaScript API |
| Data Storage | 초기 MVP는 CSV 기반 |
| Test | pytest, FastAPI TestClient |

## 4. MVP 사용자 흐름

1. 사용자는 홈 화면에 접속한다.
2. 지역 검색 화면에서 키워드 또는 시도/시군구 선택으로 지역을 찾는다.
3. 선택한 지역의 안전 리포트 화면으로 이동한다.
4. 안전 리포트에서 위험도 점수, 주요 범죄 유형, CCTV/경찰 시설 정보를 확인한다.
5. 지도 화면에서 카카오맵 기반 경찰 시설 위치를 확인한다.
6. 주요 범죄 유형에 따른 예방 가이드를 확인한다.

## 5. 화면 명세

| 화면 | 경로 | 설명 |
|---|---|---|
| 홈 | `/` | 서비스 소개와 주요 진입 버튼 |
| 지역 검색 | `/region` | 지역 키워드 검색, 시도/시군구 선택 |
| 안전 리포트 | `/report/:regionId` | 위험도 점수, 범죄 TOP3, 인프라 정보 |
| 지도 | `/map/:regionId` | 카카오맵 기반 경찰 시설/지역 정보 표시 |
| 예방 가이드 | `/guide` | 범죄 유형별 예방 수칙 |

## 6. API 명세

| Method | URL | 설명 |
|---|---|---|
| GET | `/health` | 서버 상태 확인 |
| GET | `/api/regions` | 전체 지역 목록 조회 |
| GET | `/api/regions/search?keyword=` | 지역 검색 |
| GET | `/api/reports/{region_id}` | 지역 안전 리포트 조회 |
| GET | `/api/map/regions/{region_id}` | 지도 화면용 지역/경찰 시설 데이터 조회 |
| GET | `/api/guides` | 범죄 예방 가이드 목록 조회 |

## 7. 주요 데이터

### 지역 데이터

- `region_id`
- `sido`
- `sigungu`
- `risk_score`
- `region_type`
- `cctv_count`
- `police_station_count`
- `police_box_count`

### 범죄 통계 데이터

- `robbery`
- `murder`
- `sexual_assault`
- `theft`
- `violence`
- `major_crime_type`
- `crime_ratio`

### 지도 데이터

- `region_id`
- `region_label`
- `police_stations`
- `latitude`
- `longitude`
- `station_name`
- `station_type`

`police_stations` 예시:

```json
[
  {
    "name": "서울종로경찰서",
    "type": "경찰서",
    "latitude": 37.575,
    "longitude": 126.984,
    "address": "서울 종로구"
  }
]
```

## 8. 데이터 생성 흐름
1. crime_raw_data.csv를 로드한다.
2. 범죄 유형별 발생 건수를 합산해 crime_count를 계산한다.
3. CCTV, 경찰서, 파출소 데이터를 기반으로 infra_count를 계산한다.
4. 범죄 점수와 치안 인프라 점수를 정규화해 risk_score를 계산한다.
5. 범죄 유형별 비율과 주요 범죄 유형 TOP3를 계산한다.
6. K-Means를 사용해 지역을 군집화하고 region_type을 부여한다.
7. 백엔드 API에서 사용할 수 있는 CSV 또는 메모리 데이터로 제공한다.

## 9. 카카오맵 연동

지도 화면에서는 Kakao Map JavaScript API를 사용합니다.

- 카카오맵 API 키는 나중에 직접 발급받아 설정합니다.
- 카카오맵 API 키는 환경변수로 관리합니다.
- 실제 API 키는 Git에 커밋하지 않습니다.
- 프론트엔드는 FastAPI에서 제공하는 경찰 시설 좌표 데이터를 받아 마커로 표시합니다.
- 지역 좌표가 부족한 경우 카카오맵 Geocoder를 사용해 지역명을 기준으로 중심 좌표를 탐색합니다.

환경변수 예시:

```env
VITE_KAKAO_MAP_JAVASCRIPT_KEY=your_kakao_map_key
VITE_API_BASE_URL=http://localhost:8000
```

※ `카카오맵 API 키는 나중에 직접 발급`

## 10. MVP 제외 범위
초기 MVP에서는 아래 기능을 제외합니다.
- 회원가입/로그인
- 신고 게시판 CRUD
- 게시글 지도 마커
- 관리자 기능
- DB 기반 저장
- 실시간 신고 위치 등록

## 11. 추후 확장 기능
- 사용자 회원가입/로그인
- 신고 게시판 CRUD
- 신고 게시글 지도 마커 표시
- MySQL 또는 PostgreSQL 연동
- Docker Compose 구성
- 위험도 예측 모델 고도화
- 지역별 위험도 변화 시각화
- 관리자용 데이터 업로드 기능

## 12. 테스트 기준
### 백엔드 테스트
- /health 응답 확인
- 지역 목록 API 응답 구조 확인
- 지역 검색 API 검색 결과 확인
- 리포트 API 응답 필드 확인
- 지도 API 경찰 시설 좌표 응답 확인

### 프론트엔드 스모크 테스트
- 홈 화면 렌더링
- 지역 검색 화면 렌더링
- 지역 선택 후 리포트 화면 이동
- 지도 화면에서 카카오맵 영역 표시
- API 실패 시 사용자 안내 표시