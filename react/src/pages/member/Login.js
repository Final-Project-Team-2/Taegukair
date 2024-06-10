import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login({ setIsLoggedIn, setMemberId }) {
    const [loginMethod, setLoginMethod] = useState('memberId');
    const [memberId, setMemberIdInput] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [memberCode, setMemberCode] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const identifier = loginMethod === 'memberCode' ? memberCode : memberId;
            const loginData = { identifier, password: memberPassword };
            const response = await axios.post('http://localhost:8080/auth/login', loginData);

            const responseData = response.data;

            console.log('Parsed response data:', responseData);

            if (responseData.data && responseData.data.token && responseData.data.token.accessToken) {
                localStorage.setItem('accessToken', responseData.data.token.accessToken);
                localStorage.setItem('memberCode', responseData.data.memberCode); // memberCode 저장
                console.log('Access Token saved:', responseData.data.token.accessToken);
                if (rememberMe) {
                    localStorage.setItem('memberId', responseData.data.memberId);
                } else {
                    localStorage.removeItem('memberId');
                }
                setIsLoggedIn(true);
                setMemberId(responseData.data.memberId);

                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setError('Invalid credentials');
        }
    };

    const toggleHelpModal = () => setShowHelpModal(!showHelpModal);

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="login-method-buttons">
                <button 
                    className={loginMethod === 'memberId' ? 'active' : ''}
                    onClick={() => setLoginMethod('memberId')} 
                    disabled={loginMethod === 'memberId'}
                >
                    아이디 로그인
                </button>
                <button 
                    className={loginMethod === 'memberCode' ? 'active' : ''}
                    onClick={() => setLoginMethod('memberCode')} 
                    disabled={loginMethod === 'memberCode'}
                >
                    회원번호 로그인
                </button>
            </div>
            <br/>
            {loginMethod === 'memberId' ? (
                <div>
                    <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberIdInput(e.target.value)}
                        placeholder="ID"
                    />
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={memberCode}
                        onChange={(e) => setMemberCode(e.target.value)}
                        placeholder="Code"
                    />
                </div>
            )}
            <input
                type="password"
                value={memberPassword}
                onChange={(e) => setMemberPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>
                {loginMethod === 'memberId' ? '아이디로 로그인' : '회원 번호로 로그인'}
            </button>

            {error && <p className="error-message">{error}</p>}
            <br/>

            <div className="additional-actions">
                <button onClick={() => navigate('/signup/terms')}>회원가입</button>
                <button onClick={() => navigate('/findID')}>아이디 찾기</button>
                <button onClick={() => navigate('/findPassword')}>비밀번호 찾기</button>
                <br/>
            </div>
            <button onClick={toggleHelpModal} className="help-button">도움이 필요하신가요?</button>

            {showHelpModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleHelpModal}>&times;</span>
                        <h2>어떤게 궁금하신가요?</h2>
                        <p><span className='boldtext'><h3>로그인 관련 안내 </h3><br />
                            1. 로그인하려고 하는데 일치하는 계정이 없다고 나옵니다. </span><br /> <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;① 스카이패스 오프라인 회원이신가요? 홈페이지, 앱 로그인을 위해서는 별도 가입이 필요해요. 홈페이지 회원가입 후 이용해 주세요. <br /> <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;② 입력하신 아이디나 스카이패스 회원번호 또는 비밀번호를 다시 확인해 주세요. 비밀번호를 분실하신 경우 비밀번호 찾기 후 재설정하여 로그인 해 주세요. <br /><br />


                            <span className='boldtext'>2. 홈페이지 회원인데 본인인증을 통해 아이디 찾기, 비밀번호 찾기 시 계정정보가 없다고 나옵니다.(한국지역/한국어)</span> <br /> <br />
                            최초 회원가입 시 본인인증 수단을 통하지 않고 가입하신 경우 ‘회원정보 확인’ 메뉴를 통해 진행해 주세요. 최초 가입 시 등록된 이메일, 휴대전화 번호로 입력하셔야 안내를 받으실 수 있습니다. <br /> <br />
                            <span className='boldtext'>3. 비밀번호 재설정 메시지가 오지 않아요.</span> <br /> <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;① 스팸메일함을 확인해 주세요.(수신 차단되는 경우) <br /> <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;② 여러 번 발송 요청하신 경우, 수신 메시지 중 가장 최신 메일 내 링크를 통해 비밀번호를 재설정해 주세요.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
