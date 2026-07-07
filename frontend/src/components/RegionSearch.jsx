import { useEffect, useState } from 'react'
import { getRegions, searchRegions} from '../api/client'

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

    return (
        <section id="region-search" className="region-search-section">

            <div className="section-heading">

                <p className="eyebrow">REGION SEARCH</p>

                <h2>지역 안전 정보를 검색하세요</h2>

                <p>시도 또는 시군구 이름으로 지역별 위험도 정보를 확인할 수 있습니다.</p>

            </div>

            <form className="region-search-form" onSubmit={handleSearch}>

                <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="예: 서울, 종로구, 제주"
                />

                <button type="submit">검색</button>

            </form>

            {isLoading && <p className="status-message">지역 데이터를 불러오는 중입니다.</p>}
            {errorMessage && <p className="status-message error">{errorMessage}</p>}

            {!isLoading && !errorMessage && (
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

            )}

        </section>
    )
}