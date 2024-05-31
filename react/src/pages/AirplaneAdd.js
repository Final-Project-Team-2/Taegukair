import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function AirplaneAdd() {
  const [airplaneType, setAirplaneType] = useState('');
  const [airplaneNo, setAirplaneNo] = useState('');
  const [airplaneSeat, setAirplaneSeat] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('정말 등록하시겠습니까?')) {
      const form = { airplaneType, airplaneNo, airplaneSeat };

      axios.post('http://localhost:8080/api/v1/admin/airplane/register', form) // 변경된 경로
        .then(response => {
          navigate('/main/admin/airplanes');
        })
        .catch(error => {
          console.error('There was an error creating the airplane!', error);
        });
    }
  };

  return (
    <div className="form-container">
      <h1>Add Airplane</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input type="text" value={airplaneType} onChange={(e) => setAirplaneType(e.target.value)} required />
        </label>
        <label>
          Number:
          <input type="text" value={airplaneNo} onChange={(e) => setAirplaneNo(e.target.value)} required />
        </label>
        <label>
          Seat:
          <input type="number" value={airplaneSeat} onChange={(e) => setAirplaneSeat(e.target.value)} required />
        </label>
        <button type="submit">Add Airplane</button>
      </form>
    </div>
  );
}

export default AirplaneAdd;
