import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FindIdModal from './FindIdModal'; // FindIdModal 컴포넌트를 임포트합니다.

function Login({ setIsLoggedIn, setMemberId }) {
    const [loginMethod, setLoginMethod] = useState('memberId'); // 기본값은 memberId
    const [memberId, setMemberIdInput] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [memberCode, setMemberCode] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showFindIdModal, setShowFindIdModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
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

    const toggleHelpModal = () => setShowHelpModal(!showHelpModal);
    const toggleFindIdModal = () => setShowFindIdModal(!showFindIdModal);

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
            <div>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label>아이디 저장</label>
            </div>

            {error && <p>{error}</p>}
            <br/>

            <div>
                <button onClick={() => navigate('/signup/terms')}>회원가입</button>
                <button onClick={toggleFindIdModal}>아이디 찾기</button>
                <button onClick={() => navigate('/findPassword')}>비밀번호 찾기</button>
                <br/>
                <button onClick={toggleHelpModal}>도움이 필요하신가요?</button>
            </div>

            {showHelpModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleHelpModal}>&times;</span>
                        <h2>어떤게 궁금하신가요?</h2>
                        <p>로그인 관련 안내
                            로그인하려고 하는데 일치하는 계정이 없다고 나옵니다.
                            스카이패스 오프라인 회원이신가요? 홈페이지, 앱 로그인을 위해서는 별도 가입이 필요해요. 홈페이지 회원가입 후 이용해 주세요.
                            입력하신 아이디나 스카이패스 회원번호 또는 비밀번호를 다시 확인해 주세요. 비밀번호를 분실하신 경우 비밀번호 찾기 후 재설정하여 로그인 해 주세요.
                            홈페이지 회원인데 본인인증을 통해 아이디 찾기, 비밀번호 찾기 시 계정정보가 없다고 나옵니다.(한국지역/한국어)
                            최초 회원가입 시 본인인증 수단을 통하지 않고 가입하신 경우 ‘회원정보 확인’ 메뉴를 통해 진행해 주세요. 최초 가입 시 등록된 이메일, 휴대전화 번호로 입력하셔야 안내를 받으실 수 있습니다.
                            비밀번호 재설정 메시지가 오지 않아요.
                            스팸메일함을 확인해 주세요.(수신 차단되는 경우)
                            여러 번 발송 요청하신 경우, 수신 메시지 중 가장 최신 메일 내 링크를 통해 비밀번호를 재설정해 주세요.
                        </p>
                    </div>
                </div>
            )}

            {showFindIdModal && (
                <FindIdModal show={showFindIdModal} handleClose={toggleFindIdModal} />
            )}
        </div>
    );
}

export default Login;
