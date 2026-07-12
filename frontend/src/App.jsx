import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import RegionPage from './pages/RegionPage'
import GuidePage from './pages/GuidePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/regions" element={<RegionPage />} />
      <Route path="/guides" element={<GuidePage />} />
    </Routes>
  )
}