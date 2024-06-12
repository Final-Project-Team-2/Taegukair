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
        const result  = fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/send-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber
            })
        }).then(response => {
            return response.text();
        }).then(data => {
            console.log('인증번호 전송 성공:', data);
        }).catch(error => {
            setError('인증번호 전송 실패: ' + (error.response && error.response.data ? error.response.data : '서버와의 연결에 실패했습니다.'));
        });
        console.log(result);

    }

    const verifyCode = () => {
        const result  = fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/verify-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                code: verificationCode
            })
        }).then(response => {
            return response.text();
        }).then(data => {
            console.log('인증 전송:', data);
        }).catch(error => {
            setError('인증 실패: ' + (error.response && error.response.data ? error.response.data : '서버와의 연결에 실패했습니다.'));
        });
        console.log(result);
    };

    const resetPassword = () => {
            const result  = fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({
                    memberId: memberId,
                    memberEmail: memberEmail,
                    newPassword: newPassword
                })
            }).then(response => {
                return response.text();
            }).then(data => {
                console.log('인증 성공:', data);
                alert("인증에 성공하였습니다. 로그인 페이지로 이동합니다.")
                navigate('/login');
            }).catch(error => {
                setError('인증 실패: ' + (error.response && error.response.data ? error.response.data : '서버와의 연결에 실패했습니다.'));
            });
            console.log(result);
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
