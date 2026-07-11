# SafeTrip - 범죄 위험도 분석 플랫폼

Crime risk analysis and regional safety analysis platform

전국 범죄 발생 데이터와 치안 인프라 데이터를 활용하여 지역별 위험도를 분석하고 군집화하는 데이터 기반 범죄 위험도 분석 플랫폼 입니다.

---

## 프로젝트 소개

범죄 발생 현황과 CCTV, 경찰 인프라 정보를 결합하여 지역별 위험도를 정량적으로 평가하였습니다.

또한 K-Means 군집화를 활용하여 지역 특성을 분류하고, 분석 결과를 백엔드에서 활용할 수 있도록 데이터를 생성 하였습니다.

---

## 프로젝트 기간

2026.05.18 ~ 2026.05.22

## 프로젝트 인원

5명

## 담당 역할

- 범죄 데이터 전처리
- 위험도 점수 산출 로직 설계
- 범죄 유형 분석
- K-Means 군집화
- 실루엣 점수 평가
- 백엔드 전달용 데이터 생성

---

## 데이터셋

### 범죄 발생 데이터

- 절도
- 폭력
- 성범죄
- 강도
- 살인

### 치안 인프라 데이터

- CCTV 수
- 경찰서 수
- 파출소 및 지구대 수

---

## 사용 기술

### Language

- Python

### Data Processing

- Pandas
- NumPy

### Machine Learning

- K-Means Clustering
- StandardScaler
- MinMaxScaler

---

## 분석 프로세스

```text
데이터 전처리
      ↓
위험도 점수 산출
      ↓
범죄 유형 분석
      ↓
K-Means 군집화
      ↓
군집 결과 검증
      ↓
결과 데이터 생성
      ↓
백엔드 전달
```

---

## 주요 기능

### 1. 지역별 위험도 분석

범죄 발생 건수와 치안 인프라 정보를 기반으로 지역별 위험도를 계산합니다.

### 위험도 산출 요소

- 범죄 발생 건수
- CCTV 수
- 인프라 수

### 2. 범죄 유형 분석

범죄 유형별 비율을 계산하여 지역별 주요 범죄 유형을 도출합니다.

### 분석 대상

- 절도
- 폭력
- 성범죄
- 강도
- 살인

### 3. 지역 군집화

K-Means 알고리즘을 활용하여 지역을 3개 군집으로 분류하였습니다.

### 군집 유형

- 범죄 집중 관리 지역
- 생활 안전 지역
- 치안 인프라 보완 필요 지역

### 4. 분석 결과 생성

다음 정보를 포함한 결과 데이터를 생성하여 백엔드에서 활용할 수 있도록 제공 하였습니다.

- 위험도 점수
- 위험 등급
- 주요 범죄 유형
- 군집 결과

---

## 위험도 산출 방식

```Python
risk_score = (
  crime_score * 0.95 
  - CCTV_score * 0.03
  - infra_score * 0.02
)
```
범죄 발생 비중을 가장 높게 반영하고 CCTV 및 치안 인프라 정보를 보조 지표로 활용하여 위험도를 산출하였습니다.

---

## 모델 성능

|Metric|Score|
|------|-----|
|Silhouette Score|0.48|

---

## 프로젝트 결과

- 지역별 범죄 위험도 분석 모델 구현
- 범죄 유형 비율 분석 기능 구현
- K-Means 기반 지역 군집화 수행
- 실루엣 점수 0.48 달성
- 백엔드 전달용 데이터 생성

---

## 프로젝트 구조
```text
crime-risk-analysis/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── routers/
│   │   └── services/
│   └── scripts/
│       └── seed_region.py
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── .env.example
│   └── package.json
├── legacy_ui/
│   └── travel-safe-platform-main/
├── docs/
│   └── feature_spec.md
├── crime_analysis.py
├── crime_raw_data.csv
├── requirements.txt
└── README.md
```

※ `backend/data/safe_trip.db`는 SQLite seed 실행 시 생성되는 로컬 DB 파일이며 Git에 커밋하지 않습니다.

---

## 기대 효과

- 지역별 범죄 위험도 파악
- 데이터 기반 치안 현황 분석
- 주요 범죄 유형 분석
- 군집화를 통한 지역 특성 분류

---

## 웹서비스 실행 방법

### 1. Python 가상환경 생성

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 2. 라이브러리 설치

```powershell
python -m pip install -r requirements.txt
```

### 3. SQLite 데이터 생성

```powershell
python backend/scripts/seed_region.py
```

생성되는 DB 파일:

```text
backend/data/safe_trip.db
```

※ 이 파일은 Git에 커밋하지 않습니다.

※ 모델 또는 seed 코드가 변경되었거나 지도 API `police_stations` 테이블 오류가 발생하면 seed를 다시 실행합니다.

```powershell
python backend/scripts/seed_region.py
```

### 4. FastAPI 서버 실행

repo 루트에서 실행합니다.

```powershell
uvicorn app.main:app --app-dir backend --reload
```

확인 URL:

```text
http://127.0.0.1:8000/docs
```


### 5. 프론트엔드 실행

```powershell
cd frontend
npm install
npm run dev
```

프론트엔드 기본 주소

```text
http://localhost:5173
```

### 6. 프론트엔드 검사

```powershell
cd frontend
npm run lint
npm run build
```

### 환경변수

프론트엔드 환경변수 예시는 `frontend/.env.example`을 참고합니다.

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_KAKAO_MAP_JAVASCRIPT_KEY=
```

※ 카카오맵 JavaScript 키는 직접 발급받아 frontend/.env에 설정하고, 실제 키는 Git에 커밋하지 않습니다.

※ 카카오맵을 사용하려면 카카오 개발자 콘솔의 Web 플랫폼 사이트 도메인에 아래 로컬 개발 주소를 등록합니다.

```text
http://localhost:5173
http://127.0.0.1.5173
```

※ REST API 키가 아니라 JavaScript 키를 사용합니다.

`.env`를 수정한 뒤에는 Vite 개발 서버를 다시 실행해야 합니다.

```powershell
cd frontend
npm run dev
```

---

## 향후 개선 사항

- 실시간 범죄 데이터 연동
- 범죄 발생 예측 모델 개발
- 연도별 범죄 추세 분석 기능 추가
- 사용자 맞춤형 안전 리포트 제공
- 서비스 기능 고도화
