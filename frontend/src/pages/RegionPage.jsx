import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import RegionSearch from '../components/RegionSearch'

export default function RegionPage() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const initialKeyword = searchParams.get('keyword') ?? ''

  function handleSelectRegion(regionId) {
    navigate(`/reports/${regionId}`)
  }

  return (
    <main id="top" className="app">
      <Header />

      <RegionSearch 
        initialKeyword={initialKeyword}
        onSelectRegion={handleSelectRegion} 
      />
    </main>
  )
}