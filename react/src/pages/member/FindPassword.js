import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FindId.css'

function FindPassword() {
    const [memberId, setMemberId] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const sendVerificationCode = () => {
        axios.post(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/send-code`, null, { params: { phoneNumber } })
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                setError('인증번호 전송 실패: ' + (error.response && error.response.data ? error.response.data : '서버와의 연결에 실패했습니다.'));
            });
    };

    const verifyCode = () => {
        axios.post(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/verify-code`, null, { params: { phoneNumber, code: verificationCode } })
            .then(response => {
                if (response.data === 'Verification successful') {
                    alert('인증 성공');
                } else {
                    alert(response.data);
                }
            })
            .catch(error => {
                setError('인증 실패: ' + (error.response && error.response.data ? error.response.data : '서버와의 연결에 실패했습니다.'));
            });
    };

    const resetPassword = () => {
        axios.post(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/reset-password`, null, { params: { memberId, memberEmail, newPassword } })
            .then(response => {
                alert('비밀번호 재설정 성공');
                navigate('/login');
            })
            .catch(error => {
                setError('비밀번호 재설정 실패: ' + (error.response && error.response.data ? error.response.data : '서버와의 연결에 실패했습니다.'));
            });
    };

    return (
        <div>
                <h2>비밀번호 찾기</h2>
            <div className="find-password-container">
                <Form>
                    <Form.Group controlId="formBasicMemberId">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="아이디 입력"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="이메일 입력"
                            value={memberEmail}
                            onChange={(e) => setMemberEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPhoneNumber">
                        <Form.Label>전화번호</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="전화번호 입력"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Button variant="primary" onClick={sendVerificationCode}>
                        인증번호 전송
                    </Button>
                    <br/>
                    <Form.Group controlId="formBasicVerificationCode">
                        <Form.Label>인증번호</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="인증번호 입력"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={verifyCode}>
                        인증번호 확인
                    </Button>
                    <br/>
                    <Form.Group controlId="formBasicNewPassword">
                        <Form.Label>새 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="새 비밀번호 입력"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={resetPassword}>
                        비밀번호 재설정
                    </Button>
                    {error && (
                        <p className="text-danger">{error}</p>
                    )}
                </Form>
            </div>
        </div>
    );
}

export default FindPassword;
