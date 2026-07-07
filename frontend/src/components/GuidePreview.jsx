import { useEffect, useState } from 'react'
import { getGuides, getGuideDetail } from '../api/client'

export default function GuidePreview() {
    const [guides, setGuides] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const [selectedGuide, setSelectedGuide] = useState(null)
    const [selectedGuideType, setSelectedGuideType] = useState('')
    const [isDetailLoading, setIsDetailLoading] = useState(false)
    const [detailErrorMessage, setDetailErrorMessage] = useState('')

    useEffect(() => {
        async function loadGuides() {
            try {
                setIsLoading(true)
                setErrorMessage('')

                const data = await getGuides()
                setGuides(data)
            } catch {
                setErrorMessage('예방 가이드를 불러오지 못했습니다.')
            } finally {
                setIsLoading(false)
            }
        }

        loadGuides()
    }, [])

    async function handleSelectGuide(guideType) {
        try {
            setSelectedGuideType(guideType)
            setIsDetailLoading(true)
            setDetailErrorMessage('')

            const data = await getGuideDetail(guideType)
            setSelectedGuide(data)
        } catch {
            setSelectedGuide(null)
            setDetailErrorMessage('예방 가이드 상세 정보를 불러오지 못했습니다.')
        } finally {
            setIsDetailLoading(false)
        }
    }

    return (
        <section id="safety-guide" className="guide-preview">
            <div className="section-heading">
                <p className="eyebrow">SAFETY GUIDE</p>
                <h2>범죄 유형별 예방 가이드</h2>
                <p>주요 범죄 유형에 따라 여행 중 주의할 안전 수칙을 확인합니다.</p>
            </div>

            {isLoading && <p className="status-message">예방 가이드를 불러오는 중입니다.</p>}
            {errorMessage && <p className="status-message error">{errorMessage}</p>}

            {!isLoading && !errorMessage && (
                <div className="guide-grid">
                    {guides.map((guide) => (
                        <button 
                            type="button"
                            className={`guide-card ${selectedGuideType === guide.type ? 'selected' : ''}`}
                            key={guide.type}
                            onClick={() => handleSelectGuide(guide.type)}
                        >
                            <span>{guide.type}</span>
                            <h3>{guide.title}</h3>
                            <p>{guide.description}</p>

                            <ul>
                                {guide.items.slice(0, 2).map((item) => (
                                    <li key={`${guide.type}-${item.title}`}>
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </button>
                    ))}
                </div>
            )}

            {isDetailLoading && (
                <p className="status-message">예방 가이드 상세 정보를 불러오는 중입니다.</p>
            )}

            {detailErrorMessage && (
                <p className="status-message error">{detailErrorMessage}</p>
            )}

            {selectedGuide && !isDetailLoading && (
                <article className="guide-detail">
                    <span>{selectedGuide.type}</span>
                    <h3>{selectedGuide.title}</h3>
                    <p>{selectedGuide.description}</p>

                    <ul>
                        {selectedGuide.items.map((item) => (
                            <li key={`${selectedGuide.type}-${item.title}`}>
                                <strong>{item.title}</strong>
                                <p>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </article>
            )}
        </section>
    )
}