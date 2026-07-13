import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import RegionPage from './pages/RegionPage'
import ReportPage from './pages/ReportPage'
import MapPage from './pages/MapPage'
import GuidePage from './pages/GuidePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/regions" element={<RegionPage />} />
      <Route path="/reports" element={<Navigate to="/regions" replace />} />
      <Route path="/reports/:regionId" element={<ReportPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/map/:regionId" element={<MapPage />} />
      <Route path="/guides" element={<GuidePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}