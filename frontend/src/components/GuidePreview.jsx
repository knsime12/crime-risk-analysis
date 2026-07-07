import { useEffect, useState } from 'react'
import { getGuides } from '../api/client'

export default function GuidePreview() {
    const [guides, setGuides] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

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

    return (
        <section className="guide-preview">
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
                        <article className="guide-card" key={guide.type}>
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
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}