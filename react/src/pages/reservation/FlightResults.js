import React from 'react';
import { useLocation } from 'react-router-dom';

const FlightResults = () => {
  const location = useLocation();
  const { departureAirport, arrivalAirport, seatClass, date } = location.state;

  // 이 예제에서는 단순히 검색된 정보를 보여줍니다.
  // 실제로는 API 호출을 통해 검색 결과를 받아와야 합니다.
  return (
    <div className="form-container">
      <h1>Flight Search Results</h1>
      <p>Departure Airport: {departureAirport}</p>
      <p>Arrival Airport: {arrivalAirport}</p>
      <p>Seat Class: {seatClass}</p>
      <p>Date: {date.toString()}</p>
      {/* 검색된 항공편 결과를 여기에 표시합니다. */}
    </div>
  );
};

export default FlightResults;
