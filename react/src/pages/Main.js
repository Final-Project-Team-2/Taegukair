// src/pages/Main.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import FAQ from '../FAQ';

function Main() {
  const navigate = useNavigate();

  const handleLinkClick = (e) => {
    const memberCode = localStorage.getItem('memberCode');
    if (!memberCode) {
      e.preventDefault();
      navigate('/login');
    }
  };

  const announcements = [
    { id: 1, title: '2024년 여름 할인 프로모션 안내', content: '2024년 여름을 맞아 특별 할인 프로모션을 진행합니다. 많은 참여 부탁드립니다.' },
    { id: 2, title: '새로운 항공편 추가 소식', content: '새로운 항공편이 추가되었습니다. 자세한 일정은 홈페이지를 참고하세요.' },
    { id: 3, title: '고객의 말씀 게시판 운영 안내', content: '고객의 말씀 게시판이 새롭게 운영됩니다. 많은 이용 바랍니다.' },
    { id: 4, title: '항공기 예매 안내', content: '태극항공은 타인의 예매는 지원하지 않습니다. 이용에 참고 바랍니다.' }
  ];

  return (
    <div className="main-container">
      <div className="content">
        <h1>환영합니다!</h1>
        <section className="announcement">
          <h2>공지사항</h2>
          <table className="announcement-table">
            <thead>
              <tr>
                <th>제목</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td>{announcement.title}</td>
                  <td>{announcement.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        
        <FAQ /> 
        <section className="about">
          <h2>회사 소개</h2>
          <p>저희 항공사는 최고의 서비스를 제공합니다. 고객 만족을 최우선으로 생각합니다.</p>
        </section>
        <section className="contact">
          <h2>연락처</h2>
          <p>이메일: taegukair@site.com</p>
          <p>전화: 031-1234-5678</p>
        </section>
      </div>
    </div>
  );
}

export default Main;
