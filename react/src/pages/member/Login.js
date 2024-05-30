import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn, setMemberId }) {
    const [loginMethod, setLoginMethod] = useState('memberId'); // 기본값은 memberId
    const [memberId, setMemberIdInput] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [memberCode, setMemberCode] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const identifier = loginMethod === 'memberCode' ? memberCode : memberId;
            const loginData = { identifier, password: memberPassword };
            const response = await axios.post('http://localhost:8080/auth/login', loginData);

            const responseData = response.data;

            console.log('Parsed response data:', responseData);

            if (responseData.data.token.accessToken) {
                localStorage.setItem('token', responseData.data.token.accessToken);
                if (rememberMe) {
                    localStorage.setItem('memberId', responseData.data.memberId);
                } else {
                    localStorage.removeItem('memberId');
                }
                setIsLoggedIn(true);
                setMemberId(responseData.data.memberId); // 항상 memberId로 설정
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setError('Invalid credentials');
        }
    };

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div>
            <h2>Login</h2>
            <div>
                <button onClick={() => setLoginMethod('memberId')} disabled={loginMethod === 'memberId'}>
                    아이디 로그인
                </button>
                <button onClick={() => setLoginMethod('memberCode')} disabled={loginMethod === 'memberCode'}>
                    회원번호 로그인
                </button>
            </div>
            {loginMethod === 'memberId' ? (
                <div>
                    <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberIdInput(e.target.value)}
                        placeholder="Member ID"
                    />
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={memberCode}
                        onChange={(e) => setMemberCode(e.target.value)}
                        placeholder="Member Code"
                    />
                </div>
            )}
            <input
                type="password"
                value={memberPassword}
                onChange={(e) => setMemberPassword(e.target.value)}
                placeholder="Password"
            />
            <div>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label>Remember me</label>
            </div>
            <button onClick={handleLogin}>
                {loginMethod === 'memberId' ? 'Login with Member ID' : 'Login with Member Code'}
            </button>

            {error && <p>{error}</p>}

            <div>
                <button onClick={() => navigate('/signup/terms')}>회원가입</button>
                <button onClick={() => navigate('/find-id')}>아이디 찾기</button>
                <button onClick={() => navigate('/find-password')}>비밀번호 찾기</button>
                <button onClick={toggleModal}>Help</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h2>Help Information</h2>
                        <p>This is the help information for logging in.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
