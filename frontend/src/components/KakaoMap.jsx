import { useEffect, useRef, useState } from 'react'

let kakaoSdkPromise = null

function loadKakaoSdk(appKey) {
    if (window.kakao?.maps) {
        return Promise.resolve(window.kakao)
    }

    if (kakaoSdkPromise) {
        return kakaoSdkPromise
    }

    kakaoSdkPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script')

        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`
        script.async = true

        script.onload = () => {
            window.kakao.maps.load(() => resolve(window.kakao))
        }

        script.onerror = () => {
            reject(new Error('카카오맵 SDK 로드 실패'))
        }

        document.head.appendChild(script)
    })

    return kakaoSdkPromise
}

export default function KakaoMap({ regionLabel, stations }) {
    const mapRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState('')

    const kakaoMapkey = import.meta.env.VITE_KAKAO_MAP_JAVASCRIPT_KEY

    useEffect(() => {
        async function renderMap() {
            if (!kakaoMapkey) {
                setErrorMessage('카카오맵 API 키가 설정되지 않았습니다.')
                return
            }

            if (!mapRef.current || stations.length == 0) {
                return
            }

            try {
                setErrorMessage('')

                const kakao = await loadKakaoSdk(kakaoMapkey)
                const firstStation = stations[0]

                const center = new kakao.maps.LatLng(
                    firstStation.latitude,
                    firstStation.longitude,
                )

                const map = new kakao.maps.Map(mapRef.current, {
                    center,
                    level: 5,
                })

                const bounds = new kakao.maps.LatLngBounds()

                stations.forEach((station) => {
                    const position = new kakao.maps.LatLng(
                        station.latitude,
                        station.longitude,
                    )

                    bounds.extend(position)

                    new kakao.maps.Market({
                        map,
                        position,
                        title: `${station.name} ${station.type}`,
                    })
                })

                map.setBounds(bounds)
            } catch {
                setErrorMessage('카카오맵을 불러오지 못했습니다.')
            }
        }

        renderMap()
    }, [kakaoMapkey, stations])

    if (errorMessage) {
        return (
            <div className="kakao-map-placeholder">
                <p>{errorMessage}</p>
                <span>{regionLabel} 경찰 시설 좌표 데이터는 아래 목록에서 확인할 수 있습니다.</span>
            </div>
        )
    }

    return <div className="kakao-map" ref={mapRef} />
}