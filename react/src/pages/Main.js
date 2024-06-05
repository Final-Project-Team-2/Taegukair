import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Main() {
  const navigate = useNavigate();
  
  const handleLinkClick = (e) => {
    const memberCode = localStorage.getItem('memberCode');
    if (!memberCode) {
      e.preventDefault(); 
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>예약하기</h1>
      <Link to="/reservation/new" className="header-button">Book a One-way Flight</Link> {/* 편도 예약 버튼 */}
      <Link to="/reservation/round-trip" className="header-button">Book a Round-trip Flight</Link> {/* 왕복 예약 버튼 */}
      <Link to="/main/user/board" className="header-button" onClick={handleLinkClick}>고객의 말씀 작성하기</Link> {/* 수정된 부분 */}
      <Link to="/main/user/boards" className="header-button">내가 작성한 고객의 말씀</Link> {/* 내가 작성한 고객의 말씀 버튼 추가 */}
    </div>
  );
}

export default Main;
