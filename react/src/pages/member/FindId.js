import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './FindId.css';
import { useNavigate } from 'react-router-dom';

function FindID() {
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const isValidDate = (date) => {
        const regex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
        return regex.test(date);
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleFindId = async () => {
        if (!isValidEmail(email)) {
            setError('이메일 형식이 올바르지 않습니다.');
            return;
        }

        if (!isValidDate(birthDate)) {
            setError('생년월일 형식이 올바르지 않습니다. YYYYMMDD 형식으로 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/find-id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({
                    memberName: name,
                    memberEmail: email,
                    birthDate: birthDate
                })
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }

            const data = await response.json();
            setId(data.memberId);
            setError('');
            alert("인증에 성공하였습니다. 로그인 페이지로 이동합니다.");
            navigate('/login');
        } catch (error) {
            setError('인증 실패: ' + (error.message || '서버와의 연결에 실패했습니다.'));
        }
    };

    return (
        <div>
            <h2>아이디 찾기</h2>
            <div className="find-id-container">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>이메일 주소</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="이메일 입력"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="이름 입력"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicBirthDate">
                        <Form.Label>생년월일 (YYYYMMDD)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="생년월일 입력"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </Form.Group>
                    {id && (
                        <Form.Group controlId="formBasicId">
                            <Form.Label>찾은 아이디</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                value={id}
                            />
                        </Form.Group>
                    )}
                    {error && (
                        <p className="text-danger">{error}</p>
                    )}
                    <Button variant="primary" onClick={handleFindId}>
                        아이디 찾기
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default FindID;
