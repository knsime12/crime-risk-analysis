export default function Header({
  onGoHome,
  onGoRegionSearch,
  onGoReport,
  onGoMap,
  onGoGuide,
}) {
  return (
    <header className="navbar">
      <button type="button" className="logo" onClick={onGoHome}>
        <span className="logo-icon">✓</span>
        <span>SAFE TRIP</span>
      </button>

      <nav className="nav-menu">
        <button type="button" className="active" onClick={onGoHome}>홈</button>
        <button type="button" onClick={onGoRegionSearch}>지역 검색</button>
        <button type="button" onClick={onGoReport}>안전 리포트</button>
        <button type="button" onClick={onGoMap}>지도</button>
        <button type="button" onClick={onGoGuide}>예방 가이드</button>
      </nav>
    </header>
  )
}