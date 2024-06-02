import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './FlightResults.css';

const RoundTripFlightResults = () => {
  const location = useLocation();
  const { departureDetails, returnDetails } = location.state;
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        // 출발 항공편 검색
        console.log('출발 항공편 검색 요청:', departureDetails);
        const departureResponse = await axios.get('http://localhost:8080/api/v1/flights/search', {
          params: {
            departureAirport: departureDetails.departureAirport,
            arrivalAirport: departureDetails.arrivalAirport,
            seatClass: departureDetails.seatClass,
            date: departureDetails.date,
          },
        });
        console.log('출발 항공편 검색 결과:', departureResponse.data);
        setDepartureFlights(departureResponse.data);

        // 귀국 항공편 검색
        console.log('귀국 항공편 검색 요청:', returnDetails);
        const returnResponse = await axios.get('http://localhost:8080/api/v1/flights/search', {
          params: {
            departureAirport: returnDetails.departureAirport,
            arrivalAirport: returnDetails.arrivalAirport,
            seatClass: returnDetails.seatClass,
            date: returnDetails.date,
          },
        });
        console.log('귀국 항공편 검색 결과:', returnResponse.data);
        setReturnFlights(returnResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('항공편 데이터 검색 오류:', error);
        setError('항공편 데이터 검색 오류');
        setLoading(false);
      }
    };

    fetchFlights();
  }, [departureDetails, returnDetails]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="results-container">
      <h1>항공편 검색 결과</h1>
      <h2>출발 항공편</h2>
      {departureFlights.length === 0 ? (
        <p>항공편을 찾을 수 없습니다</p>
      ) : (
        <ul>
          {departureFlights.map((flight) => (
            <li key={flight.id}>
              <p>항공편 번호: {flight.flightNumber}</p>
              <p>출발 시간: {flight.departureTime}</p>
              <p>도착 시간: {flight.arrivalTime}</p>
              <p>가격: ${flight.price}</p>
            </li>
          ))}
        </ul>
      )}
      <h2>귀국 항공편</h2>
      {returnFlights.length === 0 ? (
        <p>항공편을 찾을 수 없습니다</p>
      ) : (
        <ul>
          {returnFlights.map((flight) => (
            <li key={flight.id}>
              <p>항공편 번호: {flight.flightNumber}</p>
              <p>출발 시간: {flight.departureTime}</p>
              <p>도착 시간: {flight.arrivalTime}</p>
              <p>가격: ${flight.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoundTripFlightResults;
