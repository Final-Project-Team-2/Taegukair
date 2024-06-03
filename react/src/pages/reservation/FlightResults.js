import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './FlightResults.css';

const FlightResults = () => {
  const location = useLocation();
  const { departureAirport, arrivalAirport, date } = location.state;
  const [flights, setFlights] = useState([]);
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
        console.log('Fetching flights with params:', { departureAirport, arrivalAirport, date });
        const response = await axios.get('http://localhost:8080/api/v1/flights/bothairport', {
          params: {
            startAirport: departureAirport,
            endAirport: arrivalAirport,
            selectedDate: `${date}T00:00:00`, // 날짜의 시작 시간으로 설정
          },
        });
        console.log('Fetched flights:', response.data);
        setFlights(Array.isArray(response.data.data) ? response.data.data : []); // 배열인지 확인 후 설정
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight data:', error);
        setError('Error fetching flight data');
        setLoading(false);
      }
    };

    fetchFlights();
  }, [departureAirport, arrivalAirport, date]);

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
      <h1>편도 예약</h1>
      <p>Departure Airport: {airports[departureAirport]}</p>
      <p>Arrival Airport: {airports[arrivalAirport]}</p>
      <p>Date: {date}</p>
      {flights.length === 0 ? (
        <p>조회하신 날짜에 해당 항공편이 없습니다.</p>
      ) : (
        <ul>
          {flights.map((flight) => (
            <li key={flight.flightId}>
              <p>Flight Number: {flight.flightId}</p>
              <p>Departure Time: {flight.startTime}</p>
              <p>Arrival Time: {flight.endTime}</p>
              <p>Price: {formatPrice(flight.flightPrice)}</p> {/* 가격 표시 */}
            </li>
          ))}
        </ul>
      )}
    <button> 결제하기 </button>
    </div>
  );
};

export default FlightResults;
