import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './FlightResults.css';

const RoundTripFlightResults = () => {
  const location = useLocation();
  const { departureStartAirport, departureEndAirport, returnStartAirport, returnEndAirport, departureDate, returnDate } = location.state;
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airports, setAirports] = useState({});

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/airports');
        const airportsMap = response.data.data.reduce((map, airport) => {
          map[airport.airportId] = airport.airportName;
          return map;
        }, {});
        setAirports(airportsMap);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    };

    fetchAirports();
  }, []);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const [departureResponse, returnResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/flights/bothairport', {
            params: {
              startAirport: departureStartAirport,
              endAirport: departureEndAirport,
              selectedDate: `${departureDate}T00:00:00`,
            },
          }),
          axios.get('http://localhost:8080/api/v1/flights/bothairport', {
            params: {
              startAirport: returnStartAirport,
              endAirport: returnEndAirport,
              selectedDate: `${returnDate}T00:00:00`,
            },
          }),
        ]);

        setDepartureFlights(Array.isArray(departureResponse.data.data) ? departureResponse.data.data : []);
        setReturnFlights(Array.isArray(returnResponse.data.data) ? returnResponse.data.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight data:', error);
        setError('Error fetching flight data');
        setLoading(false);
      }
    };

    fetchFlights();
  }, [departureStartAirport, departureEndAirport, returnStartAirport, returnEndAirport, departureDate, returnDate]);

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);
      return `${formattedPrice}원`;
    }
    return '가격 정보 없음';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="results-container">
      <h1>출발 항공편 조회 결과</h1>
      <p>출발 공항: {airports[departureStartAirport]}</p>
      <p>도착 공항: {airports[departureEndAirport]}</p>
      <p>출발 날짜: {departureDate}</p>
      {departureFlights.length === 0 ? (
        <p>출발 항공편이 없습니다</p>
      ) : (
        <ul>
          {departureFlights.map((flight) => (
            <li key={flight.flightId}>
              <p>Flight Number: {flight.flightId}</p>
              <p>Departure Time: {flight.startTime}</p>
              <p>Arrival Time: {flight.endTime}</p>
              <p>Price: {formatPrice(flight.flightPrice)}</p>
            </li>
          ))}
        </ul>
      )}

      <h1>도착 항공편 조회 결과</h1>
      <p>출발 공항: {airports[returnStartAirport]}</p>
      <p>도착 공항: {airports[returnEndAirport]}</p>
      <p>도착 날짜: {returnDate}</p>
      {returnFlights.length === 0 ? (
        <p>도착 항공편이 없습니다</p>
      ) : (
        <ul>
          {returnFlights.map((flight) => (
            <li key={flight.flightId}>
              <p>Flight Number: {flight.flightId}</p>
              <p>Departure Time: {flight.startTime}</p>
              <p>Arrival Time: {flight.endTime}</p>
              <p>Price: {formatPrice(flight.flightPrice)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



export default RoundTripFlightResults;
