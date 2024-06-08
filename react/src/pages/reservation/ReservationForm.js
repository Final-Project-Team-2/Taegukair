import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import ko from 'date-fns/locale/ko';
import './ReservationForm.css';

// 한국어 로케일을 등록합니다
registerLocale('ko', ko);

const ReservationForm = () => {
  const [date, setDate] = useState(null);
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
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
    if (!departureAirport || !arrivalAirport || !date) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const offset = date.getTimezoneOffset() * 60000;
    
    const dateOffset = new Date(date.getTime() - offset);

    navigate('/reservation/searchresults', {
      
      state: {
        departureAirport,
        arrivalAirport,
        date: dateOffset.toISOString().split('T')[0],
      },
    });
  };

  return (
    <div className="form-container">
      <h1>편도 항공편 조회</h1>
      <table>
        <tbody>
          <tr>
            <td><label>출발 날짜:</label></td>
            <td>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
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
            <td><label>출발 공항:</label></td>
            <td>
              <select value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)}>
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
            <td><label>도착 공항:</label></td>
            <td>
              <select value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)}>
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

export default ReservationForm;
