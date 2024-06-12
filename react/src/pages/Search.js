import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [airportName, setAirportName] = useState('');
  const [airports, setAirports] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/airports/search`, {
        params: { s: airportName },
      });
      console.log(response.data); // 응답 데이터 확인
      setAirports(response.data.data); // Assuming the response structure is { data: [...] }
    } catch (error) {
      console.error('Error fetching airport data:', error);
    }
  };

  return (
    <div>
      <h1>Airport Search</h1>
      <input
        type="text"
        value={airportName}
        onChange={(e) => setAirportName(e.target.value)}
        placeholder="Enter airport name"
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Results</h2>
      <ul>
        {airports.map((airport) => (
          <li key={airport.airportId}>
            <p>Name: {airport.airportName}</p>
            <p>IATA: {airport.airportIata}</p>
            <p>Location: {airport.airportLocation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
