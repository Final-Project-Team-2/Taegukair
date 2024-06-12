import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Verify.css'

function Verify() {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();

    const sendCode = async () => {
        try {
            const formattedPhone = phone.startsWith('+') ? phone : `+82${phone.slice(1)}`;
            const response = await axios.post(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/send-code`, {
                phoneNumber: formattedPhone
            });
            setMessage('인증번호가 전송되었습니다.');
            setError('');
        } catch (error) {
            setError('인증번호 전송에 실패했습니다.');
            setMessage('');
        }
    };

    const verifyCode = async () => {
        try {
            const formattedPhone = phone.startsWith('+') ? phone : `+82${phone.slice(1)}`;
            const response = await axios.post(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/verify-code`, {
                phoneNumber: formattedPhone,
                code
            });
            if (response.data === 'Verification successful') {
                setVerified(true);
                setMessage('인증에 성공했습니다.');
                setError('');
            } else {
                setVerified(false);
                setError('인증번호가 올바르지 않습니다.');
                setMessage('');
            }
        } catch (error) {
            setVerified(false);
            setError('인증번호가 올바르지 않습니다.');
            setMessage('');
        }
    };

    const handleNextPage = () => {
        if (verified) {
            navigate('/signup');
        } else {
            setError('인증이 완료되지 않았습니다.');
        }
    };

    return (
        <div className='verify-box'>
            <div className="verify-container">
                <h2>본인 인증</h2>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="전화번호를 입력하세요"
                />
                <button onClick={sendCode}>인증번호 받기</button>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="인증번호를 입력하세요"
                />
                <button onClick={verifyCode}>인증</button>
                <button className="nextbutton" onClick={handleNextPage}>다음 페이지로</button>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default Verify;
