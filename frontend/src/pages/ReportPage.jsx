import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getRegionReport } from '../api/client'
import Header from '../components/Header'
import ReportPreview from '../components/ReportPreview'

export default function ReportPage() {
  const { regionId } = useParams()
  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadReport() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const data = await getRegionReport(regionId)
        setReport(data)
      } catch {
        setReport(null)
        setErrorMessage('안전 리포트를 불러오지 못했습니다.')
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
        isLoading={isLoading}
        errorMessage={errorMessage}
        onViewMap={() => navigate(`/map/${regionId}`)}
        onViewGuide={() => navigate('/guides')}
      />
    </main>
  )
}