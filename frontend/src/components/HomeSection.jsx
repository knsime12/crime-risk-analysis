export default function HomeSection({ onStartSearch, onViewMap, onViewGuide }) {
  return (
    <>
      <section className="hero-section">
        <p className="eyebrow">여행지 안전정보 플랫폼</p>
        <h1>
          안전한 여행의 시작,<br />
          <span>SafeTrip</span>
        </h1>
        <p className="hero-description">
          여행지를 검색하고 지역별 범죄 현황, 경찰 시설 정보와 예방 수칙을 한눈에 확인하세요.
        </p>

        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={onStartSearch}>
            지역 검색 시작
          </button>

          <button type="button" className="secondary-button" onClick={onStartSearch}>
            안전 리포트 보기
          </button>
        </div>
      </section>

      <section className="feature-grid" aria-label="주요 기능">
        <article className="feature-card">
          <div className="feature-icon">01</div>
          <h2>지역 안전 리포트</h2>
          <p>여행지의 범죄 현황과 안전 정보를 보기 쉽게 확인합니다.</p>
          <button type="button" onClick={onStartSearch}>
            자세히 보기 →
          </button>
        </article>

        <article className="feature-card">
          <div className="feature-icon">02</div>
          <h2>지도 한눈에 보기</h2>
          <p>경찰서와 지구대 위치를 지도 기반으로 확인합니다.</p>
          <button type="button" onClick={onViewMap}>
            자세히 보기 →
          </button>
        </article>

        <article className="feature-card">
          <div className="feature-icon">03</div>
          <h2>범죄 예방 가이드</h2>
          <p>상황별 예방 수칙과 안전 행동 정보를 제공합니다.</p>
          <button type="button" onClick={onViewGuide}>
            자세히 보기 →
          </button>
        </article>
      </section>
    </>
  )
}