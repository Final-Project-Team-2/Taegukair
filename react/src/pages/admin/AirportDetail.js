import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // 경로 수정

function AirportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [airport, setAirport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/airports/${id}`)
      .then(response => {
        setAirport(response.data.data); // ResponseDTO의 data 필드에 접근
      })
      .catch(error => {
        console.error('There was an error fetching the airport data!', error);
        setError(error);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm(`${airport.airportName} 공항을 삭제하시겠습니까?`)) {
      axios.delete(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/airports/${id}`)
        .then(() => {
          navigate('/main/admin/airports');
        })
        .catch(error => {
          console.error('There was an error deleting the airport!', error);
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
      {airport && (
        <>
          <h1>Airport Details</h1>
          <table className="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{airport.airportName}</td>
              </tr>
              <tr>
                <th>IATA</th>
                <td>{airport.airportIata}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{airport.airportLocation}</td>
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

export default AirportDetail;
