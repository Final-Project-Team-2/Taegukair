import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // 경로 수정

function FlightDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/flights/${id}`)
      .then(response => {
        setFlight(response.data.data); // ResponseDTO의 data 필드에 접근
      })
      .catch(error => {
        console.error('There was an error fetching the flight data!', error);
        setError(error);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm(`${flight.flightId} 항공편을 삭제하시겠습니까?`)) {
      axios.delete(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/flights/${id}`)
        .then(() => {
          navigate('/main/admin/flights/all');
        })
        .catch(error => {
          console.error('There was an error deleting the flight!', error);
          setError(error);
        });
    }
  };

  const handleEdit = () => {
    navigate(`/main/admin/airports/${id}/edit`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="table-container">
      {flight && (
        <>
          <h1>Flight Details</h1>
          <table className="table">
            <tbody>
              <tr>
                <th>항공편 번호</th>
                <td>{flight.flightId}</td>
              </tr>
              <tr>
                <th>출발 시간</th>
                <td>{flight.startTime}</td>
              </tr>
              <tr>
                <th>도착 시간</th>
                <td>{flight.endTime}</td>
              </tr>
              <tr>
                <th>출발 공항</th>
                <td>{flight.startAirPort.airportName}</td>
              </tr>
              <tr>
                <th>도착 공항</th>
                <td>{flight.endAirPort.airportName}</td>
              </tr>
            </tbody>
          </table>
          <h1>Airplane Details</h1>
          <table>
            <tbody>
              <tr>
                <th>항공기 ID</th>
                <td>{flight.airplane.airplaneId}</td>
              </tr>
              <tr>
                <th>항공기 기종</th>
                <td>{flight.airplane.airplaneType}</td>
              </tr>
              <tr>
                <th>항공기 번호</th>
                <td>{flight.airplane.airplaneNo}</td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default FlightDetail;
