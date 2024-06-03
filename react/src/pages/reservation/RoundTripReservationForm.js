import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationForm.css';
import { useNavigate } from 'react-router-dom';

const RoundTripReservationForm = () => {
  const [airports, setAirports] = useState([]);
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [returnDepartureAirport, setReturnDepartureAirport] = useState('');
  const [returnArrivalAirport, setReturnArrivalAirport] = useState('');
  const [departureSeatClass, setDepartureSeatClass] = useState('');
  const [returnSeatClass, setReturnSeatClass] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [seatClassError, setSeatClassError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/airports')
      .then(response => {
        setAirports(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the airport data!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departureSeatClass || !returnSeatClass) {
      setSeatClassError(true);
      return;
    }
    setSeatClassError(false);

    const departureDetails = {
      departureAirport,
      arrivalAirport,
      seatClass: departureSeatClass,
      date: departureDate.toISOString().split('T')[0], // ISO 형식으로 변환
    };

    const returnDetails = {
      departureAirport: returnDepartureAirport,
      arrivalAirport: returnArrivalAirport,
      seatClass: returnSeatClass,
      date: returnDate.toISOString().split('T')[0], // ISO 형식으로 변환
    };

    navigate('/reservation/round-trip-results', { state: { departureDetails, returnDetails } });
  };

  return (
    <div className="form-container">
      <h1>왕복 항공편 예약</h1>
      <form onSubmit={handleSubmit}>
        <label>
          출발일:
          <DatePicker selected={departureDate} onChange={(date) => setDepartureDate(date)} dateFormat="yyyy-MM-dd" required />
        </label>
        <label>
          출발 공항:
          <select value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)} required>
            <option value="">출발 공항 선택</option>
            {airports.map(airport => (
              <option key={airport.airportId} value={airport.airportId}>
                {airport.airportName} ({airport.airportIata})
              </option>
            ))}
          </select>
        </label>
        <label>
          도착 공항:
          <select value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} required>
            <option value="">도착 공항 선택</option>
            {airports.map(airport => (
              <option key={airport.airportId} value={airport.airportId}>
                {airport.airportName} ({airport.airportIata})
              </option>
            ))}
          </select>
        </label>
        <label>
          좌석 등급 (출발):
          <select value={departureSeatClass} onChange={(e) => setDepartureSeatClass(e.target.value)} required>
            <option value="">좌석 등급 선택</option>
            <option value="Economy">이코노미</option>
            <option value="Business">비즈니스</option>
            <option value="First">퍼스트 클래스</option>
          </select>
        </label>
        <label>
          도착일:
          <DatePicker selected={returnDate} onChange={(date) => setReturnDate(date)} dateFormat="yyyy-MM-dd" required />
        </label>
        <label>
          귀국 출발 공항:
          <select value={returnDepartureAirport} onChange={(e) => setReturnDepartureAirport(e.target.value)} required>
            <option value="">귀국 출발 공항 선택</option>
            {airports.map(airport => (
              <option key={airport.airportId} value={airport.airportId}>
                {airport.airportName} ({airport.airportIata})
              </option>
            ))}
          </select>
        </label>
        <label>
          귀국 도착 공항:
          <select value={returnArrivalAirport} onChange={(e) => setReturnArrivalAirport(e.target.value)} required>
            <option value="">귀국 도착 공항 선택</option>
            {airports.map(airport => (
              <option key={airport.airportId} value={airport.airportId}>
                {airport.airportName} ({airport.airportIata})
              </option>
            ))}
          </select>
        </label>
        <label>
          좌석 등급 (귀국):
          <select value={returnSeatClass} onChange={(e) => setReturnSeatClass(e.target.value)} required>
            <option value="">좌석 등급 선택</option>
            <option value="Economy">이코노미</option>
            <option value="Business">비즈니스</option>
            <option value="First">퍼스트 클래스</option>
          </select>
        </label>
        {seatClassError && <p className="error">* 모든 좌석 등급을 선택하셔야 합니다.</p>}
        <button type="submit">항공편 검색</button>
      </form>
    </div>
  );
};

export default RoundTripReservationForm;
