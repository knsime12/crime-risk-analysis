import { useNavigate } from 'react-router-dom'

import HomeSection from '../components/HomeSection'
import Header from '../components/Header'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <main id="top" className="app">
      <Header />

      <HomeSection
        onStartSearch={() => navigate('/regions')}
        onViewMap={() => navigate('/regions')}
        onViewGuide={() => navigate('/guides')}
      />
    </main>
  )
}