import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header style={headerStyle}>
        <h1>Airport Management System</h1>
        <div style={navStyle}>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/signup" style={linkStyle}>Signup</Link>
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
  textDecoration: 'none'
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
