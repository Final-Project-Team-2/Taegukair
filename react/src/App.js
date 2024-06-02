import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import store from './Store';
import Main from './pages/Main';
import Layout from './layouts/Layout';
import AirportList from './pages/AirportList';
import AirportDetail from './pages/AirportDetail';
import AirportAdd from './pages/AirportAdd';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import AirplaneList from './pages/AirplaneList';
import AirplaneDetail from './pages/AirplaneDetail';
import AirplaneAdd from './pages/AirplaneAdd';
import AirplaneEdit from './pages/AirplaneEdit';
import Login from './pages/member/Login';
import Signup from './pages/signup/Signup';
import Terms from './pages/signup/Terms';
import Verify from './pages/signup/Verify';
import Complete from './pages/signup/Complete';
import Reservations from './pages/reservation/Reservations';
import ReservationDetail from './pages/reservation/ReservationDetail';
import FindPassword from './pages/member/FindPassword';
import FindID from './pages/member/FindId';
import Profile from './pages/mypage/Profile'; // Profile 컴포넌트 추가
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedMemberId = localStorage.getItem('memberId');
    if (token && savedMemberId) {
      setIsLoggedIn(true);
      setMemberId(savedMemberId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('memberId');
    setIsLoggedIn(false);
    setMemberId('');
  };

  return (
    <Provider store={store}>
      <Router>
        <RoutesWithAnimation 
          isLoggedIn={isLoggedIn}
          memberId={memberId}
          setIsLoggedIn={setIsLoggedIn}
          setMemberId={setMemberId}
          onLogout={handleLogout}
        />
      </Router>
    </Provider>
  );
}

function RoutesWithAnimation({ isLoggedIn, memberId, setIsLoggedIn, setMemberId, onLogout }) {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn} memberId={memberId} onLogout={onLogout} />}>
            <Route index element={<Main />} />
            <Route path="main/admin/airports" element={<AirportList />} />
            <Route path="main/admin/airports/:id" element={<AirportDetail />} />
            <Route path="main/admin/airports/:id/edit" element={<AirportAdd />} />
            <Route path="main/admin/airports/registAirPort" element={<AirportAdd />} />
            <Route path="main/admin/board" element={<BoardList />} />
            <Route path="main/admin/board/:id" element={<BoardDetail />} />
            <Route path="main/admin/airplanes" element={<AirplaneList />} />
            <Route path="main/admin/airplanes/:id" element={<AirplaneDetail />} />
            <Route path="main/admin/airplanes/add" element={<AirplaneAdd />} />
            <Route path="main/admin/airplanes/:id/edit" element={<AirplaneEdit />} />
            <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} setMemberId={setMemberId} />} />
            <Route path="findPassword" element={<FindPassword />} />
            <Route path="findId" element={<FindID />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup/terms" element={<Terms />} />
            <Route path="signup/verify" element={<Verify />} />
            <Route path="signup/complete" element={<Complete />} />
            <Route path="main/admin/reservations" element={<Reservations />} />
            <Route path="main/admin/reservations/detail" element={<ReservationDetail />} />
            <Route path="profile" element={<Profile />} /> {/* Profile 라우트 추가 */}
          </Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
