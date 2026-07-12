import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/regions" element={<HomePage />} />
      <Route path="/guides" element={<HomePage />} />
    </Routes>
  )
}