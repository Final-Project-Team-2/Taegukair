import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      <h1>Welcome to Airport Management</h1>
      <Link to="/main/admin/airports">
        <button>Manage Airports</button>
      </Link>
      {/* 기존 기능 버튼들을 추가합니다. */}
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </div>
  );
}

export default Main;
