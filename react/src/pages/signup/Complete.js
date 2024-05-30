import React from 'react';
import { Link } from 'react-router-dom';

function Complete() {
    return (
        <div>
        <h2>회원가입 완료</h2>
        <p>성공적으로 회원가입이 완료되었습니다. 이제 로그인할 수 있습니다.</p>
        <Link to="/login">
            <button>로그인</button>
        </Link>
        <Link to="/">
            <button>메인 페이지로 이동</button>
        </Link>
        </div>
    );
}

export default Complete;
