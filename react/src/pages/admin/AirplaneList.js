import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // 경로 수정

function AirplaneList() {
  const [airplanes, setAirplanes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/airplane/all`)
      .then(response => {
        setAirplanes(response.data.data); // ResponseDTO의 data 필드에 접근
      })
      .catch(error => {
        console.error('There was an error fetching the airplane data!', error);
        setError(error);
      });
  }, []);

  const handleRowClick = (airplaneId) => {
    navigate(`/main/admin/airplanes/${airplaneId}`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="table-container">
      <h1>Airplanes</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Number</th>
            <th>Seat</th>
          </tr>
        </thead>
        <tbody>
          {airplanes.map(airplane => (
            <tr key={airplane.airplaneId} onClick={() => handleRowClick(airplane.airplaneId)} style={{ cursor: 'pointer' }}>
              <td>{airplane.airplaneType}</td>
              <td>{airplane.airplaneNo}</td>
              <td>{airplane.airplaneSeat}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={() => navigate('/main/admin/airplanes/add')}>Add Airplane</button>
      </div>
    </div>
  );
}

export default AirplaneList;
