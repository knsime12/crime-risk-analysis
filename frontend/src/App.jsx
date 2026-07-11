import './App.css'
import RegionSearch from './components/RegionSearch'

import { useState } from 'react'
import { getRegionReport, getMapRegion } from './api/client'
import ReportPreview from './components/ReportPreview'
import MapPreview from './components/MapPreview'
import GuidePreview from './components/GuidePreview'

export default function App() {
  const [selectedReport, setSelectedReport] = useState(null)
  const [reportError, setReportError] = useState('')
  const [isReportLoading, setIsReportLoading] = useState(false)
  
  const [mapData, setMapData] = useState(null)
  const [mapError, setMapError] = useState('')
  const [isMapLoading, setIsMapLoading] = useState(false)

  async function handleSelectRegion(regionId) {
    setIsReportLoading(true)
    setIsMapLoading(true)
    setReportError('')
    setMapError('')
    setSelectedReport(null)
    setMapData(null)

    scrollToSection('safety-report')
    
    const [reportResult, mapResult] = await Promise.allSettled([
      getRegionReport(regionId),
      getMapRegion(regionId),
    ])

    if (reportResult.status === 'fulfilled') {
      setSelectedReport(reportResult.value)
    } else {
      setReportError('안전 리포트를 불러오지 못했습니다.')
    }

    if (mapResult.status === 'fulfilled') {
      setMapData(mapResult.value)
    } else {
      setMapError('지도 데이터를 불러오지 못했습니다.')
    }

    setIsReportLoading(false)
    setIsMapLoading(false)
  }
  
  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function scrollToReportEntry() {
    scrollToSection(selectedReport ? 'safety-report' : 'region-search')
  }

  function scrollToMapEntry() {
    scrollToSection(mapData ? 'safety-map' : 'region-search')
  }

  return (
    <main id="top" className="app">

      <header className="navbar">
        <button type="button" className="logo" onClick={() => scrollToSection('top')}>
          <span className="logo-icon">✓</span>
          <span>SAFE TRIP</span>
        </button>

        <nav className="nav-menu">
          <button type="button" className="active" onClick={() => scrollToSection('top')}>홈</button>
          <button type="button" onClick={() => scrollToSection('region-search')}>지역 검색</button>
          <button type="button" onClick={scrollToReportEntry}>안전 리포트</button>
          <button type="button" onClick={scrollToMapEntry}>지도</button>
          <button type="button" onClick={() => scrollToSection('safety-guide')}>예방 가이드</button>
        </nav>
      </header>

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

          <button 
            type="button" 
            className="primary-button"
            onClick={() => scrollToSection('region-search')}  
          >
            지역 검색 시작
          </button>

          <button 
            type="button" 
            className="secondary-button"
            onClick={() => scrollToSection('region-search')}  
          >
            안전 리포트 보기
          </button>

        </div>

      </section>

      <section className="feature-grid" aria-label="주요 기능">

        <article className="feature-card">
          <div className="feature-icon">01</div>
          <h2>지역 안전 리포트</h2>
          <p>여행지의 범죄 현황과 안전 정보를 보기 쉽게 확인합니다.</p>
          <button type="button" onClick={() => scrollToSection('region-search')}>
            자세히 보기 →
          </button>
        </article>

        <article className="feature-card">
          <div className="feature-icon">02</div>
          <h2>지도 한눈에 보기</h2>
          <p>경찰서와 지구대 위치를 지도 기반으로 확인합니다.</p>
          <button type="button" onClick={scrollToMapEntry}>
            자세히 보기 →
          </button>
        </article>

        <article className="feature-card">
          <div className="feature-icon">03</div>
          <h2>범죄 예방 가이드</h2>
          <p>상황별 예방 수칙과 안전 행동 정보를 제공합니다.</p>
          <button type="button" onClick={() => scrollToSection('safety-guide')}>
            자세히 보기 →
          </button>
        </article>

      </section>

      <RegionSearch onSelectRegion={handleSelectRegion} />

      <ReportPreview 
        report={selectedReport}
        isLoading={isReportLoading}
        errorMessage={reportError}
        onViewMap={() => scrollToSection('safety-map')}
        onViewGuide={() => scrollToSection('safety-guide')}
      />

      {(mapData || isMapLoading || mapError) && (
        <MapPreview
          mapData={mapData}
          isLoading={isMapLoading}
          errorMessage={mapError}
        />
      )}

      <GuidePreview />

    </main>
  )
}