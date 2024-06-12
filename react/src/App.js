import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import store from './Store';
import Main from './pages/Main';
import Layout from './layouts/Layout';
import BoardForm from './pages/mypage/BoardForm';
import UserBoardList from './pages/user/UserBoardList';
import UserBoardDetail from './pages/user/UserBoardDetail'; 

import AirportList from './pages/admin/AirportList';
import AirportDetail from './pages/admin/AirportDetail';
import AirportAdd from './pages/admin/AirportAdd';
import FlightList from './pages/admin/FlightList';
import FlightDetail from './pages/admin/FlightDetail';
import FlightAdd from './pages/admin/FlightAdd';
import BoardList from './pages/admin/BoardList';
import BoardDetail from './pages/admin/BoardDetail';
import AirplaneList from './pages/admin/AirplaneList';
import AirplaneDetail from './pages/admin/AirplaneDetail';
import AirplaneAdd from './pages/admin/AirplaneAdd';
import AirplaneEdit from './pages/admin/AirplaneEdit';
import Admin from './pages/admin/Admin';
import Members from './pages/admin/Members';

import Login from './pages/member/Login';
import Signup from './pages/signup/Signup';
import Terms from './pages/signup/Terms';
import Verify from './pages/signup/Verify';
import Complete from './pages/signup/Complete';
import Reservations from './pages/reservation/Reservations';
import ReservationDetail from './pages/reservation/ReservationDetail';
import RegistReservation from './pages/reservation/RegistReservation';
import ChooseSeats from './pages/reservation/Seats';
import FindPassword from './pages/member/FindPassword';
import FindID from './pages/member/FindId';

import ReservationForm from './pages/reservation/ReservationForm';
import FlightResults from './pages/reservation/FlightResults';
import RoundTripReservationForm from './pages/reservation/RoundTripReservationForm';
import RoundTripFlightResults from './pages/reservation/RoundTripFlightResults';

import Profile from './pages/mypage/Profile';
import Family from './pages/mypage/Family';
import Pets from './pages/mypage/Pets';
import CouponRegister from './pages/mypage/CouponRegister';
import './App.css';
import ReservationTickets from './pages/mypage/ReservationTickets';
import DoneReservation from './pages/reservation/DoneReservation';

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
          memberId={memberId}
          setMemberId={setMemberId}
          onLogout={handleLogout}
        />
      </Router>
    </Provider>
  );
}

function RoutesWithAnimation({ memberId, setIsLoggedIn, setMemberId, onLogout }) {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Layout memberId={memberId} onLogout={onLogout} />}>
            <Route index element={<Main />} />
            <Route path="main/admin" element={<Admin />} />
            <Route path="/main/admin/members" element={<Members />} />
            <Route path="main/admin/airports" element={<AirportList />} />
            <Route path="main/admin/airports/:id" element={<AirportDetail />} />
            <Route path="main/admin/airports/:id/edit" element={<AirportAdd />} />
            <Route path="main/admin/airports/registAirPort" element={<AirportAdd />} />
            <Route path="main/admin/flights" element={<FlightList />} />
            <Route path="main/admin/flights/:id" element={<FlightDetail />} />
            <Route path="main/admin/flights/:id/edit" element={<FlightAdd />} />
            <Route path="main/admin/flights/addflight" element={<FlightAdd />} />
            <Route path="main/admin/board" element={<BoardList />} />
            <Route path="main/admin/board/:id" element={<BoardDetail />} />
            <Route path="main/admin/airplanes" element={<AirplaneList />} />
            <Route path="main/admin/airplanes/:id" element={<AirplaneDetail />} />
            <Route path="main/admin/airplanes/add" element={<AirplaneAdd />} />
            <Route path="main/admin/airplanes/:id/edit" element={<AirplaneEdit />} />
            <Route path="login" element={<Login setMemberId={setMemberId} />} />
            <Route path="findPassword" element={<FindPassword />} />
            <Route path="findId" element={<FindID />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup/terms" element={<Terms />} />
            <Route path="signup/verify" element={<Verify />} />
            <Route path="signup/complete" element={<Complete />} />
            <Route path="main/admin/reservations" element={<Reservations />} />
            <Route path="main/admin/reservations/detail" element={<ReservationDetail />} />
            <Route path="reservation/searchresults/registreservation" element={<RegistReservation />} />
            <Route path="reservation/searchresults/registreservation/chooseSeat" element={<ChooseSeats />} />
            <Route path="reservation/searchresults/registreservation/DoneReservation" element={<DoneReservation />} />
            <Route path="reservation/new" element={<ReservationForm />} />
            <Route path="reservation/searchresults" element={<FlightResults />} />
            <Route path="reservation/round-trip" element={<RoundTripReservationForm />} />
            <Route path="reservation/round-trip-results" element={<RoundTripFlightResults />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reservation-tickets" element={<ReservationTickets />} />
            <Route path="/coupon-register" element={<CouponRegister />} />
            <Route path="family" element={<Family />} />
            <Route path="pets" element={<Pets />} />
            <Route path="main/user/board" element={<BoardForm />} /> {/* 추가된 부분 */}
            <Route path="main/user/boards" element={<UserBoardList />} /> {/* 추가된 부분 */}
            <Route path="main/user/board/:boardId" element={<UserBoardDetail />} /> {/* 추가된 부분 */}
          </Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
