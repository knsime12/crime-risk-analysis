import { useNavigate } from 'react-router-dom'
import GuidePreview from '../components/GuidePreview'
import Header from '../components/Header'

export default function GuidePage() {
    const navigate = useNavigate()

    return (
        <main id="top" className="app">
            <Header
                onGoHome={() => navigate('/')}
                onGoRegionSearch={() => navigate('/regions')}
                onGoReport={() => navigate('/reports')}
                onGoMap={() => navigate('/map')}
                onGoGuide={() => navigate('/guides')}
            />

            <GuidePreview />
        </main>
    )
}