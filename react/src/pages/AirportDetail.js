import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AirportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [airport, setAirport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/airports/${id}`)
      .then(response => {
        setAirport(response.data.data); // ResponseDTO의 data 필드에 접근
      })
      .catch(error => {
        console.error('There was an error fetching the airport data!', error);
        setError(error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/v1/airports/${id}`)
      .then(() => {
        navigate('/main/admin/airports');
      })
      .catch(error => {
        console.error('There was an error deleting the airport!', error);
        setError(error);
      });
  };

  const handleEdit = () => {
    navigate(`/main/admin/airports/${id}/edit`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {airport && (
        <>
          <h1>{airport.airportName}</h1>
          <p>IATA: {airport.airportIata}</p>
          <p>Location: {airport.airportLocation}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default AirportDetail;
