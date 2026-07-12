import RegionSearch from './components/RegionSearch'

import { useState } from 'react'
import { getRegionReport, getMapRegion } from './api/client'
import ReportPreview from './components/ReportPreview'
import MapPreview from './components/MapPreview'
import GuidePreview from './components/GuidePreview'
import HomeSection from './components/HomeSection'
import Header from './components/Header'

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

    setTimeout(() => {
      scrollToSection('safety-report')
    }, 0)
      
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
      <Header
        onGoHome={() => scrollToSection('top')}
        onGoRegionSearch={() => scrollToSection('region-search')}
        onGoReport={scrollToReportEntry}
        onGoMap={scrollToMapEntry}
        onGoGide={() => scrollToSection('safety-guide')}
      />

      <HomeSection
        onStartSearch={() => scrollToSection('region-search')}
        onViewMap={scrollToMapEntry}
        onViewGuide={() => scrollToSection('safety-guide')}
      />

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