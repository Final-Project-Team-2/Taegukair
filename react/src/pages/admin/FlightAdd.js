import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // 경로 수정

function FlightAdd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    startTime: '',
    endTime: '',
    airplane: 0,
    startAirPort: 0,
    endAirPort: 0,
    flightPrice: 0
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/flights/${id}`, {
        headers: {
          'Authorization': "Bearer " + window.localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          const { startTime, endTime, airplane, startAirPort, endAirPort, flightPrice } = response.data.data;
          setForm({ startTime, endTime, airplane: airplane.airplaneId, startAirPort: startAirPort.airportId, endAirPort: endAirPort.airportId, flightPrice });
        })
        .catch(error => {
          console.error('There was an error fetching the flight data!', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmMessage = id 
      ? `입력하신 정보로 항공편 정보를 수정하시겠습니까?`
      : `항공편을 추가하시겠습니까?`;

    if (window.confirm(confirmMessage)) {
      const url = id ? `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/flights/${id}` : `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/flights/addflight`;
      const method = id ? 'put' : 'post';

      axios({
        headers: {
          'Authorization': "Bearer " + window.localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        },
        method: method,
        url: url,
        data: form
      })
      .then(() => {
        navigate('/main/admin/flights');
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? 'Edit Flight' : 'Add Flight'}</h1>
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <th>
                <label>출발 시간 (YYYY-MM-DDTHH:mm:ss)</label>
              </th>
              <td>
                <input
                  type="text"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DDTHH:mm:ss"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>도착 시간 (YYYY-MM-DDTHH:mm:ss)</label>
              </th>
              <td>
                <input
                  type="text"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DDTHH:mm:ss"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>항공기 ID</label>
              </th>
              <td>
                <input
                  type="number"
                  name="airplane"
                  value={form.airplane}
                  onChange={handleChange}
                  placeholder="항공기 ID"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>출발 공항 ID</label>
              </th>
              <td>
                <input
                  type="number"
                  name="startAirPort"
                  value={form.startAirPort}
                  onChange={handleChange}
                  placeholder="출발 공항 ID"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>도착 공항 ID</label>
              </th>
              <td>
                <input
                  type="number"
                  name="endAirPort"
                  value={form.endAirPort}
                  onChange={handleChange}
                  placeholder="도착 공항 ID"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>항공편 금액</label>
              </th>
              <td>
                <input
                  type="number"
                  name="flightPrice"
                  value={form.flightPrice}
                  onChange={handleChange}
                  placeholder="항공편 금액"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button type="submit">{id ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
}

export default FlightAdd;
