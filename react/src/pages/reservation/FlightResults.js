import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FlightResults.css';
import { callGetFlightsByAirportsAndTimeAPI } from '../../apis/FlightAPICalls';
import { useDispatch, useSelector } from 'react-redux';

const FlightResults = () => {

  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { departureAirport, arrivalAirport, date } = location.state;

  const searchFlight = useSelector(state => state.flight);

  const [flights, setFlights] = useState([]);

  const [selectedFlight, setSelectedFlight] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [airports, setAirports] = useState({});

  useEffect(() => {
    if(departureAirport && arrivalAirport && date ) {
      console.log({ departureAirport, arrivalAirport, date });
      dispatch(callGetFlightsByAirportsAndTimeAPI({ departureAirport, arrivalAirport, date }));
    }
  },
  [dispatch, loading, departureAirport, arrivalAirport, date ]);

  useEffect(() => {
    if (searchFlight.length > 0) {
        console.log('searchFlight:', searchFlight);
        setLoading(false);
        setFlights(searchFlight);
    }
  }, [searchFlight]);

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);
      return `${formattedPrice}원`;
    }
    return '가격 정보 없음';
  };

  const selectFlightHandler = (e) => {
    const flightData = JSON.parse(e.currentTarget.getAttribute('data-flight'));
    console.log("flightData :", flightData);
    if (flightData.flightId) {
      setSelectedFlight(flightData);
      console.log(selectedFlight);
    }
    };

  const toReservationHandler = () => {
    if (selectedFlight.flightId) {
      navigate('/reservation/searchresults/registreservation',
        {state : 
          {flight: selectedFlight}
        }
      )
    } else {
      alert("항공편을 선택해주세요!");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="results-container">
      <h1>편도 예약</h1>
      <p>Departure Airport: {(JSON.parse(departureAirport)).airportName}</p>
      <p>Arrival Airport: {(JSON.parse(arrivalAirport)).airportName}</p>
      <p>Date: {date}</p>
      {flights.length === 0 ? (
        <p>조회하신 날짜에 해당 항공편이 없습니다.</p>
      ) : (
        <ul>
          {flights && flights.length > 0 && flights.map((flight) => (
            <li
              key={flight.flightId}
              data-flight={JSON.stringify(flight)}
              onClick={selectFlightHandler}
              className={selectedFlight.flightId === flight.flightId ? 'selected' : ''}
              >
              <p>Flight Number: {flight.flightId}</p>
              <p>Departure Time: {flight.startTime}</p>
              <p>Arrival Time: {flight.endTime}</p>
              <p>Price: {formatPrice(flight.flightPrice)}</p> {/* 가격 표시 */}
            </li>
          ))}
        </ul>
      )}
    <button onClick={toReservationHandler}> 예약하기 </button>
    </div>
  );
};

export default FlightResults;
