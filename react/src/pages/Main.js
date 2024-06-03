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
      <Link to="/main/admin/airplanes" className="header-button">Manage Airplanes</Link>
      <h1>예약 관리</h1>
      <Link to="/main/admin/reservations" className="header-button">Manage Reservations</Link>
      <h1>신규 예약</h1>
      <Link to="/main/registReservation" className="header-button">New Reservation</Link>
      <h1>예약하기</h1>
      <Link to="/reservation/new" className="header-button">Book a One-way Flight</Link> {/* 편도 예약 버튼 */}
      <Link to="/reservation/round-trip" className="header-button">Book a Round-trip Flight</Link> {/* 왕복 예약 버튼 */}
    </div>
  );
}

export default Main;
