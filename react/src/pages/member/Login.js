import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn, setMemberId }) {
    const [memberId, setMemberIdInput] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            memberId: memberId,
            memberPassword: memberPassword,
        });

        const responseData = response.data;

        console.log('Parsed response data:', responseData);

        if (responseData.data.accessToken) {
            localStorage.setItem('token', responseData.data.accessToken);
            localStorage.setItem('memberId', memberId);
            setIsLoggedIn(true);
            setMemberId(memberId);
            console.log('Login successful, token saved:', responseData.data.accessToken);
            navigate('/');
        } else {
            setError('Invalid memberId or memberPassword');
        }
        } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        setError('Invalid memberId or memberPassword');
        }
    };

    return (
        <div>
        <h2>Login</h2>
        <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberIdInput(e.target.value)}
            placeholder="Member ID"
        />
        <input
            type="password"
            value={memberPassword}
            onChange={(e) => setMemberPassword(e.target.value)}
            placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
