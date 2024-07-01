import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { decodeJwt } from '../utils/tokenUtils';
import '../App.css';

function Layout({ onLogout }) {
  const [reservationHover, setReservationHover] = useState(false);
  const [feedbackHover, setFeedbackHover] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberId, setMemberId] = useState("");
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberCode");
    sessionStorage.removeItem("LoggedMember");
    sessionStorage.removeItem("MemberId");
    navigate('/');
  };

  useEffect(() => {
    const loggedMember = sessionStorage.getItem('LoggedMember');
        if (loggedMember === "true") {
      setIsLoggedIn(true);
    }
    
    setMemberId(sessionStorage.getItem('MemberId'));
  }, []);

  const isLogin = window.localStorage.getItem('accessToken');
  let decoded = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }

  return (
    <div className="layout">
      <header style={headerStyle}>
        <Link to="/" style={logoStyle}>
          <h1>태극항공</h1>
        </Link>
        <div style={navStyle}>
          {isLoggedIn ? (
            <>
              <span style={welcomeStyle}>환영합니다, {memberId}님!</span>
              <Link to="/profile" style={linkStyle}>마이페이지</Link>
              {decoded === "ROLE_ADMIN" && <Link to="/main/admin" style={linkStyle}>홈페이지 관리</Link>}
              <button onClick={handleLogoutClick} style={linkStyle}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/signup/terms" style={linkStyle}>Signup</Link>
            </>
          )}
        </div>
      </header>
      <div className="main-container">
        <nav className="navbar">
          <h2>메뉴</h2>
          <div 
            className="nav-item" 
            onMouseEnter={() => setReservationHover(true)} 
            onMouseLeave={() => setReservationHover(false)}
          >
            예약하기
            {reservationHover && (
              <div className="dropdown">
                <NavLink to="/reservation/new" className="dropdown-item">편도 예약</NavLink>
                <NavLink to="/reservation/round-trip" className="dropdown-item">왕복 예약</NavLink>
              </div>
            )}
          </div>
          <NavLink to="/reservation-tickets" className="nav-item">예약조회</NavLink>
          <div 
            className="nav-item" 
            onMouseEnter={() => setFeedbackHover(true)} 
            onMouseLeave={() => setFeedbackHover(false)}
          >
            고객의 말씀
            {feedbackHover && (
              <div className="dropdown">
                <NavLink to="/main/user/board" className="dropdown-item">작성하기</NavLink>
                <NavLink to="/main/user/boards" className="dropdown-item">조회하기</NavLink>
              </div>
            )}
          </div>
          {decoded === "ROLE_ADMIN" && (
            <NavLink to="/main/admin" className="nav-item">홈페이지 관리</NavLink>
          )}
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
      <footer style={footerStyle}>
        <p>© 2024 Airport Management</p>
      </footer>
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#282c34',
  color: 'white'
};

const navStyle = {
  display: 'flex',
  gap: '10px'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  marginBottom: 0
};

const logoStyle = {
  color: 'white',
  textDecoration: 'none'
};

const welcomeStyle = {
  color: 'white',
  marginRight: '10px'
};

const footerStyle = {
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#282c34',
  color: 'white',
  position: 'fixed',
  bottom: '0',
  width: '100%'
};

export default Layout;
