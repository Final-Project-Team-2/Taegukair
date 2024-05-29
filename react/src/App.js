import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Layout from './layouts/Layout';
import AirportList from './pages/AirportList';
import AirportDetail from './pages/AirportDetail';
import AirportAdd from './pages/AirportAdd';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
// 기존 기능 페이지를 추가로 import 합니다.
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="main/admin/airports" element={<AirportList />} />
          <Route path="main/admin/airports/:id" element={<AirportDetail />} />
          <Route path="main/admin/airports/:id/edit" element={<AirportAdd />} />
          <Route path="main/admin/airports/registAirPort" element={<AirportAdd />} />
          <Route path="main/admin/board" element={<BoardList />} />
          <Route path="main/admin/board/:id" element={<BoardDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
