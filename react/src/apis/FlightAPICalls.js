import {
    GET_FLIGHTS_BY_AIRPORTS_AND_TIME
} from '../modules/FlightModule';
import axios from 'axios';

export const callGetFlightsByAirportsAndTimeAPI = ({ departureAirport, arrivalAirport, date }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/flights/bothairport`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        
        console.log('Fetching flights with params:', { departureAirport, arrivalAirport, date });
            // axios를 사용하여 API 요청을 보냅니다.
            const result = await axios({
                method: "GET",
                url: requestURL,
                params: { 
                startAirport: (JSON.parse(departureAirport)).airportId,
                endAirport: (JSON.parse(arrivalAirport)).airportId,
                    selectedDate : `${date}T00:00:00`
                },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(result => result.data)
            .catch(error => {
                console.error("에러 발생", error)
            });

            console.log('[FlightAPICalls] callGetFlightsByAirportsAndTimeAPI RESULT : ', result);

            dispatch({ type: GET_FLIGHTS_BY_AIRPORTS_AND_TIME, payload: result.data });
    
    };
}