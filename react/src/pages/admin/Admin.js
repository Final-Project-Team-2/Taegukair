import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="admin-container">
      <h1>공항 관리</h1>
      <Link to="/main/admin/airports" className="header-button">
        Manage Airports
      </Link>
      <br/>
      <h1>고객의 말씀 관리</h1>
      <Link to="/main/admin/board" className="header-button">
        Manage Boards
      </Link>
      <br/>
      <h1>항공기 관리</h1>
      <Link to="/main/admin/airplanes" className="header-button">
        Manage Airplanes
      </Link>
      <br/>
      <h1>예약 관리</h1>
      <Link to="/main/admin/reservations" className="header-button">
        Manage Reservations
      </Link>
      <br/>
      <h1>회원 관리</h1>
      <Link to="/main/admin/members" className="header-button">
        Manage Members
      </Link>
    </div>
  );
}

export default Admin;
