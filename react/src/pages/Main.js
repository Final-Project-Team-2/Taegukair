import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';  // Add this line to import the CSS file

function Main() {
  return (
    <div>
      <h1>Welcome to Airport Management</h1>
      <Link to="/main/admin/airports" className="header-button">
        Manage Airports
      </Link>
      {/* 기존 기능 버튼들을 추가합니다. */}
    </div>
  );
}

export default Main;
