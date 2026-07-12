import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getMapRegion } from '../api/client'
import Header from '../components/Header'
import MapPreview from '../components/MapPreview'

export default function MapPage() {
  const { regionId } = useParams()

  const [mapData, setMapData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadMapData() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const data = await getMapRegion(regionId)
        setMapData(data)
      } catch {
        setMapData(null)
        setErrorMessage('지도 데이터를 불러오지 못했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    if (regionId) {
      loadMapData()
    }
  }, [regionId])

  return (
    <main id="top" className="app">
      <Header />

      <MapPreview
        mapData={mapData}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  )
}