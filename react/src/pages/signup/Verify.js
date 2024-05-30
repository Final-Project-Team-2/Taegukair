import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Verify() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleVerify = () => {
        if (code === '1234') { // 예시 인증 로직
        navigate('/signup');
        } else {
        setError('인증 코드가 올바르지 않습니다');
        }
    };

    return (
        <div>
        <h2>본인 인증</h2>
        <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증 코드를 입력하세요"
        />
        <button onClick={handleVerify}>인증</button>
        {error && <p>{error}</p>}
        </div>
    );
}

export default Verify;
