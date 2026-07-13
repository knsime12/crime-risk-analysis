# SAFE TRIP - 범죄 위험도 기반 여행 안전 웹서비스

기존 SAFE TRIP 팀프로젝트의 UI/UX를 참고하여 React + FastAPI 기반으로 재구현한 여행 안전 정보 웹서비스입니다.

지역별 범죄 위험도, 주요 범죄 유형, CCTV 및 경찰 시설 정보를 기반으로 여행지 안전 리포트와 지도 시각화, 예방 가이드를 제공합니다.

---

## 프로젝트 소개

범죄 발생 현황과 CCTV, 경찰 인프라 정보를 결합하여 지역별 위험도를 정량적으로 평가하였습니다.

또한 K-Means 군집화를 활용하여 지역 특성을 분류하고, 분석 결과를 백엔드에서 활용할 수 있도록 데이터를 생성 하였습니다.

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

## 기술 스택

### Backend

- Python 3.12
- FastAPI
- SQLAlchemy
- SQLite

### Frontend

- React
- Vite
- JavaScript
- React Router
- Kakao Map JavaScript API
- Lucide React

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

- 홈 화면
- 지역 검색
- 지역별 안전 리포트
- 카카오맵 기반 치안 시설 지도
- 범죄 유형별 예방 가이드

※ 현재 MVP에서는 회원가입/로그인, 신고 게시판 기능은 제외했습니다.

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
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── legacy_ui/
├── docs/
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

## 실행 방법

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

생성되는 DB 파일은 아래 경로에 저장됩니다.

```text
backend/data/safe_trip.db
```

※ 이 파일은 로컬 실행용이며 Git에 커밋하지 않습니다.

※ 모델 또는 seed 코드가 변경되었거나 지도 API `police_stations` 테이블 오류가 발생하면 seed를 다시 실행합니다.

```powershell
python backend/scripts/seed_region.py
```

### 4. FastAPI 서버 실행

repo 루트에서 실행합니다.

```powershell
uvicorn app.main:app --app-dir backend --reload
```

API 문서:

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
http://127.0.0.1:5173
```

※ REST API 키가 아니라 JavaScript 키를 사용합니다.

`.env`를 수정한 뒤에는 Vite 개발 서버를 다시 실행해야 합니다.

```powershell
cd frontend
npm run dev
```

---

## 향후 개선 사항

- OpenAI API 기반 지역별 안전 리포트 요약 생성
- 위험도 등급 계산 로직 백엔드 이전
- MySQL 또는 PostgreSQL 전환
- 지도 필터 기능 고도화
- 테스트 코드 추가
- 배포 환경 구성
