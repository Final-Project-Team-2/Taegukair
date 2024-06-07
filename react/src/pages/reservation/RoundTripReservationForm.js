import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import ko from 'date-fns/locale/ko';
import './ReservationForm.css';

// 한국어 로케일을 등록합니다
registerLocale('ko', ko);

const RoundTripReservationForm = () => {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [departureStartAirport, setDepartureStartAirport] = useState('');
  const [departureEndAirport, setDepartureEndAirport] = useState('');
  const [returnStartAirport, setReturnStartAirport] = useState('');
  const [returnEndAirport, setReturnEndAirport] = useState('');
  const [airports, setAirports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/airports');
        setAirports(response.data.data);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    };

    fetchAirports();
  }, []);

  const handleSearch = () => {
    if (!departureStartAirport || !departureEndAirport || !returnStartAirport || !returnEndAirport || !departureDate || !returnDate) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    console.log('Navigating to round-trip results with the following state:');
    console.log({
      departureStartAirport,
      departureEndAirport,
      returnStartAirport,
      returnEndAirport,
      departureDate: departureDate.toISOString().split('T')[0],
      returnDate: returnDate.toISOString().split('T')[0],
    });

    const departureOffset = departureDate.getTimezoneOffset() * 60000;
  
    const departureDateOffset = new Date(departureDate.getTime() - departureOffset);
  
    const returnOffset = returnDate.getTimezoneOffset() * 60000;
  
    const returnDateOffset = new Date(returnDate.getTime() - returnOffset);

    navigate('/reservation/round-trip-results', {
      state: {
        departureStartAirport,
        departureEndAirport,
        returnStartAirport,
        returnEndAirport,
        departureDate: departureDateOffset.toISOString().split('T')[0],
        returnDate: returnDateOffset.toISOString().split('T')[0],
      },
    });
  };
  
  return (
    <div className="form-container">
      <h1>왕복 항공편 조회</h1>
      <table>
        <tbody>
          <tr>
            <td><label>출발 날짜:</label></td>
            <td>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                dateFormat="yyyy-MM-dd"
                locale="ko"
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>
                      {date.getFullYear()}년 {date.toLocaleString('default', { month: 'long' })}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <button
                        type="button"
                        onClick={decreaseMonth}
                      >
                        &lt;
                      </button>
                      <button
                        type="button"
                        onClick={increaseMonth}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                )}
              />
            </td>
          </tr>
          <tr>
            <td><label>출발 공항 (출발 항공편):</label></td>
            <td>
              <select value={departureStartAirport} onChange={(e) => setDepartureStartAirport(e.target.value)}>
                <option value="">공항 선택</option>
                {airports.map((airport) => (
                  <option key={airport.airportId} value={JSON.stringify(airport)}>
                    {airport.airportName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label>도착 공항 (출발 항공편):</label></td>
            <td>
              <select value={departureEndAirport} onChange={(e) => setDepartureEndAirport(e.target.value)}>
                <option value="">공항 선택</option>
                {airports.map((airport) => (
                  <option key={airport.airportId} value={JSON.stringify(airport)}>
                    {airport.airportName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label>도착 날짜:</label></td>
            <td>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                dateFormat="yyyy-MM-dd"
                locale="ko"
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>
                      {date.getFullYear()}년 {date.toLocaleString('default', { month: 'long' })}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <button
                        type="button"
                        onClick={decreaseMonth}
                      >
                        &lt;
                      </button>
                      <button
                        type="button"
                        onClick={increaseMonth}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                )}
              />
            </td>
          </tr>
          <tr>
            <td><label>출발 공항 (도착 항공편):</label></td>
            <td>
              <select value={returnStartAirport} onChange={(e) => setReturnStartAirport(e.target.value)}>
                <option value="">공항 선택</option>
                {airports.map((airport) => (
                  <option key={airport.airportId} value={JSON.stringify(airport)}>
                    {airport.airportName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label>도착 공항 (도착 항공편):</label></td>
            <td>
              <select value={returnEndAirport} onChange={(e) => setReturnEndAirport(e.target.value)}>
                <option value="">공항 선택</option>
                {airports.map((airport) => (
                  <option key={airport.airportId} value={JSON.stringify(airport)}>
                    {airport.airportName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSearch}>항공편 검색</button>
    </div>
  );
};

export default RoundTripReservationForm;
