import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationForm.css';
import { useNavigate } from 'react-router-dom';

const ReservationForm = () => {
  const [airports, setAirports] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedArrival, setSelectedArrival] = useState('');
  const [seatClass, setSeatClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    if (!seatClass) {
      setSeatClassError(true);
      return;
    }
    setSeatClassError(false);

    const reservationDetails = {
      departureAirport: selectedDeparture,
      arrivalAirport: selectedArrival,
      seatClass: seatClass,
      date: selectedDate,
    };
    console.log('Reservation Details:', reservationDetails);

    navigate('/reservation/results', { state: reservationDetails });
  };

  return (
    <div className="form-container">
      <h1>Book a Flight</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Departure Airport:
          <select value={selectedDeparture} onChange={(e) => setSelectedDeparture(e.target.value)} required>
            <option value="">Select Departure Airport</option>
            {airports.map(airport => (
              <option key={airport.airportId} value={airport.airportId}>
                {airport.airportName} ({airport.airportIata})
              </option>
            ))}
          </select>
        </label>
        <label>
          Arrival Airport:
          <select value={selectedArrival} onChange={(e) => setSelectedArrival(e.target.value)} required>
            <option value="">Select Arrival Airport</option>
            {airports.map(airport => (
              <option key={airport.airportId} value={airport.airportId}>
                {airport.airportName} ({airport.airportIata})
              </option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="yyyy-MM-dd" required />
        </label>
        <label>
          Seat Class:
          <select value={seatClass} onChange={(e) => setSeatClass(e.target.value)} required>
            <option value="">Select Seat Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First Class</option>
          </select>
        </label>
        {seatClassError && <p className="error">* 반드시 선택하셔야합니다.</p>}
        <button type="submit">Search Flights</button>
      </form>
    </div>
  );
};

export default ReservationForm;
