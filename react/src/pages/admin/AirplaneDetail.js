import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function AirplaneDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [airplane, setAirplane] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/airplane/${id}`)
      .then(response => {
        setAirplane(response.data.data); // ResponseDTO의 data 필드에 접근
      })
      .catch(error => {
        console.error('There was an error fetching the airplane data!', error);
        setError(error);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm(`${airplane.airplaneType} 항공기를 삭제하시겠습니까?`)) {
      axios.delete(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/airplane/${id}`)
        .then(() => {
          navigate('/main/admin/airplanes');
        })
        .catch(error => {
          console.error('There was an error deleting the airplane!', error);
          setError(error);
        });
    }
  };

  const handleEdit = () => {
    navigate(`/main/admin/airplanes/${id}/edit`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="table-container">
      {airplane && (
        <>
          <h1>Airplane Details</h1>
          <table className="table">
            <tbody>
              <tr>
                <th>Type</th>
                <td>{airplane.airplaneType}</td>
              </tr>
              <tr>
                <th>Number</th>
                <td>{airplane.airplaneNo}</td>
              </tr>
              <tr>
                <th>Seat</th>
                <td>{airplane.airplaneSeat}</td>
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

export default AirplaneDetail;
