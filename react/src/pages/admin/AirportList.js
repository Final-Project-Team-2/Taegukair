import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // 경로 수정

function AirportList() {
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/airports`)
      .then(response => {
        setAirports(response.data.data); // ResponseDTO의 data 필드에 접근
      })
      .catch(error => {
        console.error('There was an error fetching the airport data!', error);
        setError(error);
      });
  }, []);

  const handleRowClick = (airportId) => {
    navigate(`/main/admin/airports/${airportId}`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="table-container">
      <h1>Airports</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IATA</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {airports.map(airport => (
            <tr key={airport.airportId} onClick={() => handleRowClick(airport.airportId)} style={{ cursor: 'pointer' }}>
              <td>{airport.airportName}</td>
              <td>{airport.airportIata}</td>
              <td>{airport.airportLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={() => navigate('/main/admin/airports/registAirPort')}>Add Airport</button>
      </div>
    </div>
  );
}

export default AirportList;
