import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { decodeJwt } from '../utils/tokenUtils';
import { NavLink } from 'react-router-dom';

function Layout({ isLoggedIn, memberId, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
    }

  return (
    <div>
      <header style={headerStyle}>
        
        <Link to="/" style={logoStyle}>
          <h1>태극항공</h1>
        </Link>
        <div style={navStyle}>
          {isLoggedIn ? (
            <>
              <span style={welcomeStyle}>환영합니다, {memberId}님!</span>
              <Link to="/profile" style={linkStyle}>마이페이지</Link>
              {decoded === "ROLE_ADMIN" && <li><NavLink to="/main/admin">홈페이지 관리</NavLink></li>}
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
      <main>
        <Outlet />
      </main>
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
  cursor: 'pointer'
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
