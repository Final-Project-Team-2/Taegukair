import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout({ isLoggedIn, memberId, onLogout }) {
  return (
    <div>
      <header style={headerStyle}>
        <h1>Airport Management System</h1>
        <div style={navStyle}>
          {isLoggedIn ? (
            <>
              <span style={welcomeStyle}>환영합니다, {memberId}님!</span>
              <button onClick={onLogout} style={linkStyle}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/signup/terms" style={linkStyle}>Signup</Link> {/* 수정된 부분 */}
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
