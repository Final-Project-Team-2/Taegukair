import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const signupData = {
        memberId: username,
        memberPassword: password,
        memberEmail: email,
        memberName: name,
        memberGender: gender,
        birthDate: birthDate,
        memberPhone: phone
      };
      
      console.log('Sending signup data:', signupData);  // 로그 추가

      await axios.post('http://localhost:8080/auth/signup', signupData);

      navigate('/signup/complete'); // 회원가입 성공 시 완료 페이지로 이동
    } catch (error) {
      console.error('Signup error:', error.response.data);  // 로그 추가
      setError('회원가입에 실패했습니다');
    }
  };

  return (
    <div>
      <h2>회원 정보 입력</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Gender"
      />
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        placeholder="Birth Date"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
