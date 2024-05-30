import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from './pages/Main';
import Layout from './layouts/Layout';
import AirportList from './pages/AirportList';
import AirportDetail from './pages/AirportDetail';
import AirportAdd from './pages/AirportAdd';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import Login from './pages/member/Login';
import Signup from './pages/signup/Signup';
import Terms from './pages/signup/Terms';
import Verify from './pages/signup/Verify';
import Complete from './pages/signup/Complete';
import Reservations from './pages/reservation/Reservations';
import ReservationDetail from './pages/reservation/ReservationDetail';
import './App.css'; // Add this line to import the CSS file

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} memberId={memberId} onLogout={handleLogout} />}>
          <Route index element={<Main />} />
          <Route path="main/admin/airports" element={<AirportList />} />
          <Route path="main/admin/airports/:id" element={<AirportDetail />} />
          <Route path="main/admin/airports/:id/edit" element={<AirportAdd />} />
          <Route path="main/admin/airports/registAirPort" element={<AirportAdd />} />
          <Route path="main/admin/board" element={<BoardList />} />
          <Route path="main/admin/board/:id" element={<BoardDetail />} />
          <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} setMemberId={setMemberId} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signup/terms" element={<Terms />} />
          <Route path="signup/verify" element={<Verify />} />
          <Route path="signup/complete" element={<Complete />} />
          <Route path="main/admin/reservations" element={< Reservations />} />
          <Route path="main/admin/reservation/detail" element={< ReservationDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
