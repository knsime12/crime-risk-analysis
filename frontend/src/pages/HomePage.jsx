import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getRegionReport, getMapRegion } from '../api/client'
import RegionSearch from '../components/RegionSearch'
import ReportPreview from '../components/ReportPreview'
import MapPreview from '../components/MapPreview'
import HomeSection from '../components/HomeSection'
import Header from '../components/Header'

export default function HomePage() {
  const [selectedReport, setSelectedReport] = useState(null)
  const [reportError, setReportError] = useState('')
  const [isReportLoading, setIsReportLoading] = useState(false)
  
  const [mapData, setMapData] = useState(null)
  const [mapError, setMapError] = useState('')
  const [isMapLoading, setIsMapLoading] = useState(false)

  const [regionNotice, setRegionNotice] = useState('')

  const navigate = useNavigate()

  async function handleSelectRegion(regionId) {
    setIsReportLoading(true)
    setIsMapLoading(true)
    setReportError('')
    setMapError('')
    setSelectedReport(null)
    setMapData(null)
    setRegionNotice('')

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
    if (selectedReport) {
      scrollToSection('safety-report')
      return
    }

    setRegionNotice('안전 리포트를 보려면 먼저 지역을 선택해 주세요.')
    scrollToSection('region-search')
  }

  function scrollToMapEntry() {
    if (mapData) {
      scrollToSection('safety-map')
      return
    }

    setRegionNotice('지도를 보려면 먼저 지역을 선택해 주세요.')
    scrollToSection('region-search')
  }

  return (
    <main id="top" className="app">
      <Header
        onGoHome={() => scrollToSection('top')}
        onGoRegionSearch={() => {
          setRegionNotice('')
          scrollToSection('region-search')
        }}
        onGoReport={scrollToReportEntry}
        onGoMap={scrollToMapEntry}
        onGoGuide={() => navigate('/guides')}
      />

      <HomeSection
        onStartSearch={() => {
          setRegionNotice('')
          scrollToSection('region-search')
        }}
        onViewMap={scrollToMapEntry}
        onViewGuide={() => navigate('/guides')}
      />

      <RegionSearch 
        onSelectRegion={handleSelectRegion} 
        noticeMessage={regionNotice}
      />

      <ReportPreview 
        report={selectedReport}
        isLoading={isReportLoading}
        errorMessage={reportError}
        onViewMap={() => scrollToSection('safety-map')}
        onViewGuide={() => navigate('/guides')}
      />

      {(mapData || isMapLoading || mapError) && (
        <MapPreview
          mapData={mapData}
          isLoading={isMapLoading}
          errorMessage={mapError}
        />
      )}

    </main>
  )
}