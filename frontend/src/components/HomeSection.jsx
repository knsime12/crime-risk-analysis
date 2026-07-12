import travelImage from '../assets/travel.png'

export default function HomeSection({ onSearch, onKeywordSearch, onViewMap, onViewGuide }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-text">
          <p className="eyebrow">여행지 안전정보 플랫폼</p>
          <h1>
            안전한 여행의 시작,<br />
            <span>SafeTrip</span>
          </h1>
          <p className="hero-description">
            여행지를 검색하고 지역별 범죄 현황, 경찰 시설 정보와 예방 수칙을 한눈에 확인하세요.
          </p>

          <form
            className="home-search-form"
            onSubmit={(event) => {
              event.preventDefault()
              const keyword = event.currentTarget.keyword.value.trim()
              onSearch(keyword)
            }}
          >
            <input
              name="keyword"
              placeholder="어디로 여행 가시나요?"
              aria-label="여행지 검색"
            />
          </form>

          <div className="home-keywords">
            <span>인기 검색어</span>
            {['제주도', '부산 해운대', '강릉', '홍대입구', '경주'].map((keyword) => (
              <button
                type="button"
                key={keyword}
                onClick={() => onKeywordSearch(keyword)}
              >
                {keyword}
              </button>
            ))}
          </div>

          <div className="quick-info">
            <p>지역별 범죄 현황 분석</p>
            <p>지도 기반 지구대·경찰서 위치</p>
            <p>맞춤형 예방 수칙 제공</p>
          </div>
        </div>

        <div className="hero-visual">
            <img src={travelImage} alt="여행 일러스트" />
        </div>
      </section>

      <section className="feature-grid" aria-label="주요 기능">
        <article className="feature-card">
          <div className="feature-icon">01</div>
          <h2>지역 안전 리포트</h2>
          <p>여행지의 범죄 현황과 안전 정보를 보기 쉽게 확인합니다.</p>
          <button type="button" onClick={onSearch}>
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