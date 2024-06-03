import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';  // Add this line to import the CSS file

function Main() {
  return (
    <div>
      <h1>공항 관리</h1>
      <Link to="/main/admin/airports" className="header-button">
        Manage Airports
      </Link> <br/>
      <h1>고객의 말씀 관리</h1>
      <Link to="/main/admin/board" className="header-button">
        Manage Boards
      </Link>
      <h1>항공기 관리</h1>
      <Link to="/main/admin/airplanes" className="header-button">Manage Airplanes</Link> {/* 추가된 버튼 */}
      <h1>예약 관리</h1>
      <Link to="/main/admin/reservations" className="header-button">Manage Reservations</Link> {/* 추가된 버튼 */}
      <h1>예약 테스트용</h1>
      <Link to="main/reservations/regist" className="header-button">new Reservations</Link> {/* 추가된 버튼 */}
    </div>
  );
}

export default Main;
