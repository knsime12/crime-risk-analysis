import { useNavigate } from 'react-router-dom'

import HomeSection from '../components/HomeSection'
import Header from '../components/Header'

export default function HomePage() {
  const navigate = useNavigate()

  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main id="top" className="app">
      <Header
        onGoHome={() => scrollToSection('top')}
        onGoRegionSearch={() => navigate('/regions')}
        onGoReport={() => navigate('/regions')}
        onGoMap={() => navigate('/regions')}
        onGoGuide={() => navigate('/guides')}
      />

      <HomeSection
        onStartSearch={() => navigate('/regions')}
        onViewMap={() => navigate('/regions')}
        onViewGuide={() => navigate('/guides')}
      />
    </main>
  )
}