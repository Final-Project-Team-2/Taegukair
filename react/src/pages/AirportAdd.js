import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
      axios.get(`http://localhost:8080/api/v1/airports/${id}`)
        .then(response => {
          setForm(response.data.data); // ResponseDTO의 data 필드에 접근
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
    const url = id ? `http://localhost:8080/api/v1/airports/${id}` : 'http://localhost:8080/api/v1/airports/registAirPort';
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
  };

  return (
    <div>
      <h1>{id ? 'Edit Airport' : 'Add Airport'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="airportName"
          value={form.airportName}
          onChange={handleChange}
          placeholder="Airport Name"
        />
        <input
          type="text"
          name="airportIata"
          value={form.airportIata}
          onChange={handleChange}
          placeholder="IATA"
        />
        <input
          type="text"
          name="airportLocation"
          value={form.airportLocation}
          onChange={handleChange}
          placeholder="Location"
        />
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default AirportAdd;
    