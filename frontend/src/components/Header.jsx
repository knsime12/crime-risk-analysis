import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        <span className="logo-icon">✓</span>
        <span>SAFE TRIP</span>
      </NavLink>

      <nav className="nav-menu">
        <NavLink to="/" end>홈</NavLink>
        <NavLink to="/regions">지역 검색</NavLink>
        <NavLink to="/reports">안전 리포트</NavLink>
        <NavLink to="/map">지도</NavLink>
        <NavLink to="/guides">예방 가이드</NavLink>
      </nav>
    </header>
  )
}