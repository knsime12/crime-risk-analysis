import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import RegionSearch from '../components/RegionSearch'

export default function RegionPage() {
  const navigate = useNavigate()

  function handleSelectRegion(regionId) {
    navigate(`/reports/${regionId}`)
  }

  return (
    <main id="top" className="app">
      <Header />

      <RegionSearch onSelectRegion={handleSelectRegion} />
    </main>
  )
}