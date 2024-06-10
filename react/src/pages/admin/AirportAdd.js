import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // 경로 수정

function AirportAdd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    airportName: '',
    airportIata: '',
    airportLocation: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/airports/${id}`)
        .then(response => {
          const { airportName, airportIata, airportLocation } = response.data.data;
          setForm({ airportName, airportIata, airportLocation });
        })
        .catch(error => {
          console.error('There was an error fetching the airport data!', error);
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
      ? `입력하신 정보로 공항 정보를 수정하시겠습니까?`
      : `${form.airportName} 공항을 추가하시겠습니까?`;

    if (window.confirm(confirmMessage)) {
      const url = id ? `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/airports/${id}` : `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/airports/registAirPort`;
      const method = id ? 'put' : 'post';

      axios({
        method: method,
        url: url,
        data: form
      })
      .then(() => {
        navigate('/main/admin/airports');
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? 'Edit Airport' : 'Add Airport'}</h1>
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <th>
                <label>Name</label>
              </th>
              <td>
                <input
                  type="text"
                  name="airportName"
                  value={form.airportName}
                  onChange={handleChange}
                  placeholder="Airport Name"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>IATA Code</label>
              </th>
              <td>
                <input
                  type="text"
                  name="airportIata"
                  value={form.airportIata}
                  onChange={handleChange}
                  placeholder="IATA Code"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Location</label>
              </th>
              <td>
                <input
                  type="text"
                  name="airportLocation"
                  value={form.airportLocation}
                  onChange={handleChange}
                  placeholder="Location"
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

export default AirportAdd;
