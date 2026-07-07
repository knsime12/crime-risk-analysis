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

  return (
    <main className="app">

      <section className="hero-section">

        <p className="eyebrow">SAFE TRIP AI</p>
        <h1>지역별 범죄 위험도를 한눈에 확인하세요</h1>
        <p className="hero-description">
          범죄 통계와 치안 인프라 데이터를 기반으로 지역 안전 리포트와 지도 시각화를 제공합니다.
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
            onClick={() => scrollToSection('safety-report')}  
          >
            안전 리포트 보기
          </button>

        </div>

      </section>

      <section className="feature-grid" aria-label="주요 기능">

        <article className="feature-card">

          <span>01</span>
          <h2>지역 검색</h2>
          <p>시도와 시군구를 기준으로 지역별 안전 정보를 검색합니다.</p>

        </article>

        <article className="feature-card">

          <span>02</span>
          <h2>안전 리포트</h2>
          <p>위험도 점수, 주요 범죄 유형, CCTV와 경찰 시설 정보를 제공합니다.</p>

        </article>

        <article className="feature-card">

          <span>03</span>
          <h2>지도 시각화</h2>
          <p>카카오맵 기반으로 경찰 시설 위치와 지역 정보를 표시합니다.</p>

        </article>

      </section>

      <RegionSearch onSelectRegion={handleSelectRegion} />

      <ReportPreview 
        report={selectedReport}
        isLoading={isReportLoading}
        errorMessage={reportError}
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