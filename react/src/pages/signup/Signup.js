import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('입력 정보를 확인해주세요.');
      return;
    }

    try {
      const formattedBirthDate = birthDate ? new Date(birthDate).toISOString().split('T')[0] : '';

      const signupData = {
        memberId: username,
        memberPassword: password,
        memberEmail: email,
        memberName: name,
        memberGender: gender,
        birthDate: formattedBirthDate,
        memberPhone: phone
      };

      console.log('Sending signup data:', signupData);

      await axios.post(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/signup`, signupData);

      navigate('/signup/complete');
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      setError('회원가입에 실패했습니다');
    }
  };

  return (
    <div className='signup-box'>
      <div className="signup-container">
        <h2>회원 정보 입력</h2>
        {error && <p>{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="생년월일"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="휴대폰 번호"
        />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default Signup;
