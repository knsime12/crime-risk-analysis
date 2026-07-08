import { useEffect, useState } from 'react'
import { getRegions, searchRegions } from '../api/client'

export default function RegionSearch({ onSelectRegion }) {
    const [keyword, setKeyword] = useState('')
    const [regions, setRegions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function loadInitialRegions() {
            try {
                setIsLoading(true)
                setErrorMessage('')

                const data = await getRegions()
                setRegions(data)
            } catch {
                setErrorMessage('지역 목록을 불러오지 못했습니다.')
            } finally {
                setIsLoading(false)
            }
        }

        loadInitialRegions()
    }, [])

    async function handleSearch(event) {
        event.preventDefault()

        try {
            setIsLoading(true)
            setErrorMessage('')

            const data = keyword.trim() 
                ? await searchRegions(keyword.trim()) 
                : await getRegions()

            setRegions(data)
        } catch {
            setErrorMessage('지역 검색에 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleKeywordClick(nextKeyword) {
        try {
            setKeyword(nextKeyword)
            setIsLoading(true)
            setErrorMessage('')

            const data = await searchRegions(nextKeyword)
            setRegions(data)
        } catch {
            setErrorMessage('지역 검색에 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <section id="region-search" className="region-search-section">
                <div className="section-heading">
                    <p className="eyebrow">REGION SEARCH</p>
                    <h2>어디로 떠나시나요?</h2>
                    <p>
                        여행지를 검색하면 범죄 현황, 경찰 시설, 예방 수칙이 담긴 안전 리포트를 확인할 수 있습니다.
                    </p>
                </div>

                <form className="region-search-form" onSubmit={handleSearch}>
                    <input
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder="예: 서울, 종로구, 제주"
                    />
                    <button type="submit">검색</button>
                </form>

                <div className="region-keywords">
                    <span>인기 검색어</span>
                    {['제주', '부산', '강릉', '서울', '경주'].map((item) => (
                        <button
                            type="button"
                            key={item}
                            onClick={() => handleKeywordClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {isLoading && <p className="status-message">지역 데이터를 불러오는 중입니다.</p>}
                {errorMessage && <p className="status-message error">{errorMessage}</p>}

            </section>

            {!isLoading && !errorMessage && regions.length === 0 && (
                <div className="region-result-panel">
                    <div className="empty-result">
                        <p>검색 결과가 없습니다.</p>
                        <span>시도 또는 시군구 이름을 다시 입력해 주세요.</span>
                    </div>
                </div>
            )}

            {!isLoading && !errorMessage && regions.length > 0 && (
                <div className="region-result-panel">
                    <div className="region-list">
                        {regions.map((region) => (
                            <button
                                type="button" 
                                className="region-card" 
                                key={region.region_id}
                                onClick={() => onSelectRegion(region.region_id)}    
                            >
                                <div>
                                    <h3>
                                        {region.sido} {region.sigungu}
                                    </h3>
                                    <p>{region.region_type}</p>
                                </div>
                                <strong>{Math.round(region.risk_score)}점</strong>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}