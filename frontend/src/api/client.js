const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

async function request(path) {
    const response = await fetch(`${API_BASE_URL}${path}`)

    if (!response.ok) {
        throw new Error('API 요청 실패')
    }

    return response.json()
}

export function getRegions() {
    return request('/api/regions')
}

export function searchRegions(keyword) {
    const query = encodeURIComponent(keyword)

    return request(`/api/regions/search?keyword=${query}`)
}

export function getRegionReport(regionId) {
    return request(`/api/reports/${encodeURIComponent(regionId)}`)
}

export function getMapRegion(regionId) {
    return request(`/api/map/regions/${encodeURIComponent(regionId)}`)
}

export function getGuides() {
    return request(`/api/guides`)
}

export function getGuideDetail(guideType) {
    return request(`/api/guides/${encodeURIComponent(guideType)}`)
}