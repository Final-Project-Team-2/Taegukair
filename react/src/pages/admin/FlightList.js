import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // 경로 수정

function FlightsList() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/flights/all`, {
      headers: {
        'Authorization': "Bearer " + window.localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setFlights(response.data.data); // ResponseDTO의 data 필드에 접근
      })
      .catch(error => {
        console.error('There was an error fetching the flight data!', error);
        setError(error);
      });
  }, []);

  const handleRowClick = (flightId) => {
    navigate(`/main/admin/flights/${flightId}`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="table-container">
      <h1>Flights</h1>
      <table className="table">
        <thead>
          <tr>
            <th>항공편 번호</th>
            <th>출발시간</th>
            <th>도착시간</th>
            <th>출발공항</th>
            <th>도착공항</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.flightId} onClick={() => handleRowClick(flight.flightId)} style={{ cursor: 'pointer' }}>
              <td>{flight.flightId}</td>
              <td>{flight.startTime}</td>
              <td>{flight.endTime}</td>
              <td>{flight.startAirPort.airportName}</td>
              <td>{flight.endAirPort.airportName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={() => navigate('/main/admin/flights/addflight')}>Add Flights</button>
      </div>
    </div>
  );
}

export default FlightsList;
