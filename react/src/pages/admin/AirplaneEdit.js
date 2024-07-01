import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function AirplaneEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [airplaneType, setAirplaneType] = useState('');
  const [airplaneNo, setAirplaneNo] = useState('');
  const [airplaneSeat, setAirplaneSeat] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/airplane/${id}`)
      .then(response => {
        const airplane = response.data.data;
        setAirplaneType(airplane.airplaneType);
        setAirplaneNo(airplane.airplaneNo);
        setAirplaneSeat(airplane.airplaneSeat);
      })
      .catch(error => {
        console.error('There was an error fetching the airplane data!', error);
        setError(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('정말 수정하시겠습니까?')) {
      const form = { airplaneType, airplaneNo, airplaneSeat };

      axios.put(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/airplane/${id}`, form, {
        headers: {
          'Authorization': "Bearer " + window.localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          navigate(`/main/admin/airplanes/${id}`);
        })
        .catch(error => {
          console.error('There was an error updating the airplane!', error);
          setError(error);
        });
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="form-container">
      <h1>Edit Airplane</h1>
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <th>Type:</th>
              <td>
                <input 
                  type="text" 
                  value={airplaneType} 
                  onChange={(e) => setAirplaneType(e.target.value)} 
                  required 
                />
              </td>
            </tr>
            <tr>
              <th>Number:</th>
              <td>
                <input 
                  type="text" 
                  value={airplaneNo} 
                  onChange={(e) => setAirplaneNo(e.target.value)} 
                  required 
                />
              </td>
            </tr>
            <tr>
              <th>Seat:</th>
              <td>
                <input 
                  type="number" 
                  value={airplaneSeat} 
                  onChange={(e) => setAirplaneSeat(e.target.value)} 
                  required 
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button type="submit">Update Airplane</button>
        </div>
      </form>
    </div>
  );
}

export default AirplaneEdit;
