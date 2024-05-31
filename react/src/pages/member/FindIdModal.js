import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function FindIdModal({ show, handleClose }) {
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState('');

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
            const response = await axios.post('http://localhost:8080/api/v1/find-id', { memberEmail: email, birthDate, memberName: name });
            console.log('Server response:', response.data);
            setId(response.data.memberId);
            setError(''); // 에러 메시지 초기화
        } catch (error) {
            console.error('Error:', error);
            setError('정보를 다시 입력해주세요.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>아이디 찾기</Modal.Title>
            </Modal.Header>
            <br/>
            <Modal.Body>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={handleFindId}>
                    아이디 찾기
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FindIdModal;
