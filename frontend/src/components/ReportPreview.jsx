export default function ReportPreview({ report, isLoading, errorMessage, onViewMap, onViewGuide }) {
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

    return (
        <section id="safety-report" className="report-preview">
            <div className="section-heading">
                <p className="eyebrow">SAFETY REPORT</p>
                <h2>
                    {report.sido} {report.sigungu} 안전 리포트
                </h2>
                <p>{report.region_type}</p>
            </div>

            <div className="report-grid">
                <article>
                    <span>위험도 점수</span>
                    <strong>{Math.round(report.risk_score)}점</strong>
                </article>

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
    )
}