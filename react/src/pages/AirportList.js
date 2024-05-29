import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AirportList() {
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/airports')
      .then(response => {
        setAirports(response.data.data); // ResponseDTO의 data 필드에 접근
      })
      .catch(error => {
        console.error('There was an error fetching the airport data!', error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Airports</h1>
      <ul>
        {airports.map(airport => (
          <li key={airport.airportId}>
            <Link to={`/main/admin/airports/${airport.airportId}`}>
              {airport.airportName}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/main/admin/airports/registAirPort">
        <button>Add Airport</button>
      </Link>
    </div>
  );
}

export default AirportList;
