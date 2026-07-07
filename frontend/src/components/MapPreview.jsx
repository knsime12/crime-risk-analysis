import KakaoMap from './KakaoMap'

export default function MapPreview({ mapData, isLoading, errorMessage }) {
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

    if (!mapData) {
        return null
    }

    const stations = mapData.police_stations.slice(0, 5)

    return (
        <section id="safety-map" className="map-preview">

            <div className="section-heading">

                <p className="eyebrow">SAFETY MAP</p>
                <h2>{mapData.region_label} 치안 시설</h2>
                <p>카카오맵 연동 전 경찰 시설 좌표 데이터를 먼저 확인합니다.</p>

            </div>

            <KakaoMap
                regionLabel={mapData.region_label}
                stations={mapData.police_stations}
            />

            <div className="map-summary">

                <article>

                    <span>경찰 시설</span>
                    <strong>{mapData.police_stations.length.toLocaleString()}곳</strong>

                </article>

                <article>

                    <span>CCTV</span>
                    <strong>{mapData.cctv_count.toLocaleString()}대</strong>

                </article>

            </div>

            <div className="station-list">
                {stations.map((station) => (
                    <article
                        className="station-card"
                        key={`${station.type}-${station.name}-${station.latitude}-${station.longitude}`}
                    >

                        <div>

                            <h3>{station.name}</h3>
                            <p>{station.type}</p>

                        </div>

                        <span>
                            {station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}
                        </span>

                    </article>
                ))}
            </div>

        </section>
    )
}