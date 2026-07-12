import { MapPinned } from 'lucide-react'

import KakaoMap from './KakaoMap'

export default function ReportPreview({ 
    report, 
    mapData,
    mapErrorMessage,
    isLoading, 
    errorMessage, 
    onSearchOtherRegion,
    onViewMap, 
    onViewGuide,
}) {
    if (isLoading) {
        return (
            <section id="safety-report" className="report-preview empty">
                <p>안전 리포트를 불러오는 중입니다.</p>
            </section>
        )
    }

    if (errorMessage) {
        return (
            <section id="safety-report" className="report-preview empty">
                <p>{errorMessage}</p>
            </section>
        )
    }

    if (!report) {
        return (
            <section id="safety-report" className="report-preview empty">
                <p>지역을 선택하면 안전 리포트가 표시됩니다.</p>
            </section>
        )
    }

    const majorCrimeTypes = report.major_crime_type
        .split(',')
        .map((crime) => crime.trim())
        .filter(Boolean)

    const crimeRatioItems = [
        { label: '절도', value: report.crime_ratios.theft },
        { label: '폭력', value: report.crime_ratios.violence },
        { label: '성범죄', value: report.crime_ratios.sexual_assault },
        { label: '강도', value: report.crime_ratios.robbery },
        { label: '살인', value: report.crime_ratios.murder },
    ]

    const riskScore = Math.round(report.risk_score)
    const riskScorePercent = Math.min(Math.max(riskScore, 0), 100)
    
    const safetyGrade = getSafetyGrade(riskScore)

    return (
        <>
            <section className="report-hero">
                <div className="section-heading">
                    <p className="eyebrow">SAFETY REPORT</p>
                    <h2>
                        {report.sido} {report.sigungu} 안전 리포트
                    </h2>
                    <p>
                        {report.sido} {report.sigungu}의 범죄 현황, CCTV 위치, 치안시설 데이터를 기반으로 여행지 안전 정보를 제공합니다.
                    </p>
                </div>

                <button type="button" onClick={onSearchOtherRegion}>
                    다른 지역 검색
                </button>
            </section>

            <section id="safety-report" className="report-preview">
                <div className="report-main-grid">
                    <article
                        className="score-summary-card"
                        style={{ '--score-percent': `${riskScorePercent}%` }}
                    >
                        <div className="score-card-top">
                            <div className="score-circle">
                                <strong>{riskScore}</strong>
                                <span>점</span>
                            </div>

                            <div className="score-summary-text">
                                <strong>{safetyGrade.title}</strong>
                                <em className={`safety-badge ${safetyGrade.badgeClassName}`}>
                                    {safetyGrade.badge}
                                </em>
                            </div> 
                        </div>

                        <div className="region-type-box">
                            <div className="region-type-heading">
                                <span>지역 유형</span>
                                <em>{report.region_type}</em>
                            </div>
                        </div>
                    </article>

                    <article className="report-map-card">
                        <div className="report-card-heading">
                            <div>
                                <h3>치안 시설 지도</h3>
                                <p>{report.sido} {report.sigungu} · 경찰서/지구대/파출소 위치</p>
                            </div>
                            <MapPinned size={22} strokeWidth={2.3} />
                        </div>

                        {mapData ? (
                            <KakaoMap
                                regionLabel={mapData.region_label}
                                stations={mapData.police_stations}
                            />
                        ) : (
                            <div className="report-map-empty">
                                {mapErrorMessage || '지도 데이터를 준비 중입니다.'}
                            </div>
                        )}
                    </article>
                </div>
                <div className="report-grid">
                    <article>
                        <span>총 범죄 건수</span>
                        <strong>{report.crime_count.toLocaleString()}건</strong>
                    </article>

                    <article>
                        <span>CCTV</span>
                        <strong>{report.infra.cctv_count.toLocaleString()}대</strong>
                    </article>

                    <article>
                        <span>경찰서</span>
                        <strong>{report.infra.police_station_count.toLocaleString()}곳</strong>
                    </article>

                    <article>
                        <span>지구대 · 파출소</span>
                        <strong>{report.infra.police_box_count.toLocaleString()}곳</strong>
                    </article>
                </div>

                <div className="crime-ratio-list">
                    <h3>주요 범죄 유형</h3>
                    
                    <div className="crime-pill-list">
                        {majorCrimeTypes.map((crime) => (
                            <span key={crime}>{crime}</span>
                        ))}
                    </div>

                    <div className="crime-ratio-bars">
                        {crimeRatioItems.map((item) => (
                            <div className="crime-ratio-item" key={item.label}>
                                <div>
                                    <span>{item.label}</span>
                                    <strong>{item.value.toFixed(1)}%</strong>
                                </div>

                                <div className="crime-ratio-track">
                                    <i style={{ width: `${Math.min(item.value, 100)}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="report-actions">
                    <button type="button" onClick={onViewMap}>
                        지도에서 보기
                    </button>

                    <button type="button" className="secondary-action" onClick={onViewGuide}>
                        예방 가이드 보기
                    </button>
                </div>
            </section>
        </>
    )
}

function getSafetyGrade(score) {
    if (score >= 80) {
        return {
            title: '매우 위험 단계',
            badge: '위험도 매우 높음',
            badgeClassName: 'danger',
        }
    }

    if (score >= 60) {
        return {
            title: '위험 단계',
            badge: '위험도 높음',
            badgeClassName: 'warning',
        }
    }

    if (score >= 40) {
        return {
            title: '관심 단계',
            badge: '위험도 보통',
            badgeClassName: 'normal',
        }
    }

    if (score >= 20) {
        return {
            title: '안전 단계',
            badge: '위험도 낮음',
            badgeClassName: 'safe',
        }
    }

    return {
        title: '안전 단계',
        badge: '위험도 매우 낮음',
        badgeClassName: 'safe',
    }
}