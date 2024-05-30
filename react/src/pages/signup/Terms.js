import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Terms() {
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();

    const handleAccept = () => {
        if (accepted) {
        navigate('/signup/verify');
        } else {
        alert('약관에 동의해야 다음 단계로 진행할 수 있습니다.');
        }
    };

    return (
        <div>
        <h2>이용 약관</h2>
        <p>[약관 내용]</p>
        <label>
            <input
            type="checkbox"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
            />
            약관에 동의합니다
        </label>
        <button onClick={handleAccept}>다음</button>
        </div>
    );
}

export default Terms;
