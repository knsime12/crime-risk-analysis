import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getMapRegion, getRegionReport } from '../api/client'
import Header from '../components/Header'
import ReportPreview from '../components/ReportPreview'

export default function ReportPage() {
  const { regionId } = useParams()
  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [mapData, setMapData] = useState(null)
  const [mapErrorMessage, setMapErrorMessage] = useState('')

  useEffect(() => {
    async function loadReport() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        setMapErrorMessage('')
        setReport(null)
        setMapData(null)

        const [reportResult, mapResult] = await Promise.allSettled([
          getRegionReport(regionId),
          getMapRegion(regionId),
        ])

        if (reportResult.status === 'fulfilled') {
          setReport(reportResult.value)
        } else {
          setErrorMessage('안전 리포트를 불러오지 못했습니다.')
        }

        if (mapResult.status === 'fulfilled') {
          setMapData(mapResult.value)
        } else {
          setMapErrorMessage('지도 데이터를 불러오지 못했습니다.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (regionId) {
      loadReport()
    }
  }, [regionId])

  return (
    <main id="top" className="app">
      <Header />

      <ReportPreview
        report={report}
        mapData={mapData}
        mapErrorMessage={mapErrorMessage}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onSearchOtherRegion={() => navigate('/regions')}
        onViewMap={() => navigate(`/map/${regionId}`)}
        onViewGuide={() => navigate('/guides')}
      />
    </main>
  )
}