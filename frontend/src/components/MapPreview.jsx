import KakaoMap from './KakaoMap'

export default function MapPreview({
    mapData,
    regions = [],
    selectedRegionId,
    isLoading,
    errorMessage,
    onSelectRegion,
}) {
    if (isLoading) {
        return (
            <section id="safety-map" className="map-preview empty">
                <p>지도 데이터를 불러오는 중입니다.</p>
            </section>
        )
    }

    if (errorMessage) {
        return (
            <section id="safety-map" className="map-preview empty">
                <p>{errorMessage}</p>
            </section>
        )
    }

    const selectedRegion = regions.find((region) => region.region_id === selectedRegionId)
    const selectedSido = selectedRegion?.sido ?? ''

    const sidoList = [...new Set(regions.map((region) => region.sido))]
    const sigunguList = selectedSido
        ? regions.filter((region) => region.sido === selectedSido)
        : []

    function handleSidoChange(event) {
        const sido = event.target.value
        const firstRegion = regions.find((region) => region.sido === sido)

        if (firstRegion) {
            onSelectRegion(firstRegion.region_id)
        }
    }

    function handleSigunguChange(event) {
        const regionId = event.target.value

        if (regionId) {
            onSelectRegion(regionId)
        }
    }

    const stations = mapData ? mapData.police_stations.slice(0, 5) : []
    const remainingStationCount = mapData ? mapData.police_stations.length - stations.length : 0
    const hasStations = mapData ? mapData.police_stations.length > 0 : false

    return (
        <>
            <section className="map-hero">
                <div className="section-heading">
                    <p className="eyebrow">SAFETY MAP</p>
                    <h2>{mapData ? `${mapData.region_label} 치안 시설` : '여행지 안전 지도'}</h2>
                    <p>경찰서 · 지구대 · 파출소 위치를 지도와 목록으로 확인합니다.</p>
                </div>
            </section>

            <section id="safety-map" className="map-layout">
                <aside className="map-sidebar">
                    <div className="map-sidebar-card">
                        <h3>지역 선택</h3>

                        <div className="map-select-group">
                            <select value={selectedSido} onChange={handleSidoChange}>
                                <option value="">시/도</option>
                                {sidoList.map((sido) => (
                                    <option key={sido} value={sido}>
                                        {sido}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedRegionId ?? ''}
                                onChange={handleSigunguChange}
                                disabled={!selectedSido}
                            >
                                <option value="">시/군/구</option>
                                {sigunguList.map((region) => (
                                    <option key={region.region_id} value={region.region_id}>
                                        {region.sigungu}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="map-sidebar-card">
                        <h3>지도 표시</h3>

                        <div className="map-legend">
                            <span><i className="legend-dot station"></i> 경찰서</span>
                            <span><i className="legend-dot box"></i> 지구대</span>
                            <span><i className="legend-dot post"></i> 파출소</span>
                        </div>
                    </div>

                    {mapData && (
                        <div className="map-sidebar-card">
                            <h3>현재 선택 지역</h3>
                            <strong>{mapData.region_label}</strong>
                            <p>{mapData.region_type}</p>

                            <dl className="map-region-summary">
                                <div>
                                    <dt>CCTV</dt>
                                    <dd>{mapData.cctv_count.toLocaleString()}대</dd>
                                </div>

                                <div>
                                    <dt>치안 시설</dt>
                                    <dd>{mapData.police_stations.length.toLocaleString()}곳</dd>
                                </div>
                            </dl>
                        </div>
                    )}
                </aside>

                <section className="map-canvas-panel">
                    {mapData ? (
                        <KakaoMap
                            regionLabel={mapData.region_label}
                            stations={mapData.police_stations}
                        />
                    ) : (
                        <div className="map-empty-panel">
                            왼쪽에서 지역을 선택하면 치안 시설 지도가 표시됩니다.
                        </div>
                    )}

                    {mapData && (
                        <div className="station-list">
                            {hasStations ? (
                                <>
                                    <p className="station-list-summary">
                                        대표 치안 시설 {stations.length}곳
                                        {remainingStationCount > 0 && ` · 외 ${remainingStationCount}곳`}
                                    </p>

                                    {stations.map((station) => (
                                        <article
                                            className="station-card"
                                            key={`${station.type}-${station.name}-${station.latitude}-${station.longitude}`}
                                        >
                                            <div>
                                                <h3>{station.name}</h3>
                                                <p>{station.type}</p>
                                            </div>

                                            <span title={`${station.latitude.toFixed(4)}, ${station.longitude.toFixed(4)}`}>
                                                지도 마커 표시
                                            </span>
                                        </article>
                                    ))}
                                </>
                            ) : (
                                <p className="status-message">
                                    표시할 치안 시설 좌표가 없습니다.
                                </p>
                            )}
                        </div>
                    )}
                </section>
            </section>
        </>
    )
}