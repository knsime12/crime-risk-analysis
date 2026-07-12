import { NavLink } from 'react-router-dom'

import safeLogo from '../assets/safe.png'

export default function Header() {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        <img className="logo-image" src={safeLogo} alt="SAFE TRIP" />
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