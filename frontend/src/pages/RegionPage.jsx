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

  function handleKeywordChange(nextKeyword) {
    const trimmedKeyword = nextKeyword.trim()

    if (trimmedKeyword) {
      navigate(`/regions?keyword=${encodeURIComponent(trimmedKeyword)}`)
      return
    }

    navigate('/regions')
  }

  return (
    <main id="top" className="app">
      <Header />

      <RegionSearch
        initialKeyword={initialKeyword}
        onKeywordChange={handleKeywordChange}
        onSelectRegion={handleSelectRegion}
      />
    </main>
  )
}