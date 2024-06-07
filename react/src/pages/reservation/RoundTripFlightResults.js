import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FlightResults.css';

const RoundTripFlightResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { departureStartAirport, departureEndAirport, returnStartAirport, returnEndAirport, departureDate, returnDate } = location.state;
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState({});
  const [selectedReturnFlight, setSelectedReturnFlight] = useState({});
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
              startAirport: (JSON.parse(departureStartAirport)).airportId,
              endAirport: (JSON.parse(departureEndAirport)).airportId,
              selectedDate: `${departureDate}T00:00:00`,
            },
          }),
          axios.get('http://localhost:8080/api/v1/flights/bothairport', {
            params: {
              startAirport: (JSON.parse(returnStartAirport)).airportId,
              endAirport: (JSON.parse(returnEndAirport)).airportId,
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

  const selectDepartureFlightHandler = (e) => {
    const flightData = JSON.parse(e.currentTarget.getAttribute('data-flight'));
    console.log("DepartureFlightData :", flightData);
    if (flightData.flightId) {
      setSelectedDepartureFlight(flightData);
      console.log(selectedDepartureFlight);
    }
  };

  const selectReturnFlightHandler = (e) => {
    const flightData = JSON.parse(e.currentTarget.getAttribute('data-flight'));
    console.log("ArrivalFlightData :", flightData);
    if (flightData.flightId) {
      setSelectedReturnFlight(flightData);
      console.log(selectedReturnFlight);
    }
  };

  const toReservationHandler = () => {
    if (selectedDepartureFlight.flightId && selectedReturnFlight.flightId) {
      navigate('/reservation/searchresults/registreservation',
        {state : 
          {
            departureFlight: selectedDepartureFlight,
            returnFlight: selectedReturnFlight,
            flightType: "RoundTrip"
          }
        }
      )
    } else {
      alert("항공편을 선택해주세요!");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="results-container">
      <h1>출발 항공편 조회 결과</h1>
      <p>출발 공항: {(JSON.parse(departureStartAirport)).airportName}</p>
      <p>도착 공항: {(JSON.parse(departureEndAirport)).airportName}</p>
      <p>출발 날짜: {departureDate}</p>
      {departureFlights.length === 0 ? (
        <p>출발 항공편이 없습니다</p>
      ) : (
        <ul>
          {departureFlights.map((flight) => (
            <li 
              key={flight.flightId}
              data-flight={JSON.stringify(flight)}
              onClick={selectDepartureFlightHandler}
              className={selectedDepartureFlight.flightId === flight.flightId ? 'selected' : ''}
              >
              <p>Flight Number: {flight.flightId}</p>
              <p>Departure Time: {flight.startTime}</p>
              <p>Arrival Time: {flight.endTime}</p>
              <p>Price: {formatPrice(flight.flightPrice)}</p>
            </li>
          ))}
        </ul>
      )}

      <h1>도착 항공편 조회 결과</h1>
      <p>출발 공항: {(JSON.parse(returnStartAirport)).airportName}</p>
      <p>도착 공항: {(JSON.parse(returnEndAirport)).airportName}</p>
      <p>도착 날짜: {returnDate}</p>
      {returnFlights.length === 0 ? (
        <p>도착 항공편이 없습니다</p>
      ) : (
        <ul>
          {returnFlights.map((flight) => (
            <li 
            key={flight.flightId}
            data-flight={JSON.stringify(flight)}
            onClick={selectReturnFlightHandler}
            className={selectedReturnFlight.flightId === flight.flightId ? 'selected' : ''}
            >
              <p>Flight Number: {flight.flightId}</p>
              <p>Departure Time: {flight.startTime}</p>
              <p>Arrival Time: {flight.endTime}</p>
              <p>Price: {formatPrice(flight.flightPrice)}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={toReservationHandler}> 예약하기 </button>
    </div>
  );
};



export default RoundTripFlightResults;
