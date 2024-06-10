import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const [reservationHover, setReservationHover] = useState(false);
  const [feedbackHover, setFeedbackHover] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (e) => {
    const memberCode = localStorage.getItem('memberCode');
    if (!memberCode) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      <h2>메인 메뉴</h2>
      <div 
        className="nav-item" 
        onMouseEnter={() => setReservationHover(true)} 
        onMouseLeave={() => setReservationHover(false)}
      >
        예약하기
        {reservationHover && (
          <div className="dropdown">
            <Link to="/reservation/new" className="dropdown-item">편도 예약</Link>
            <Link to="/reservation/round-trip" className="dropdown-item">왕복 예약</Link>
          </div>
        )}
      </div>
      <Link to="/reservation-tickets" className="nav-item">예약조회</Link>
      <div 
        className="nav-item" 
        onMouseEnter={() => setFeedbackHover(true)} 
        onMouseLeave={() => setFeedbackHover(false)}
      >
        고객의 말씀
        {feedbackHover && (
          <div className="dropdown">
            <Link to="/main/user/board" className="dropdown-item" onClick={handleLinkClick}>작성하기</Link>
            <Link to="/main/user/boards" className="dropdown-item">조회하기</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
