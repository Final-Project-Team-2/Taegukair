import {
    GET_DEPARTURE_SEATS_BY_FLIGHT,
    GET_RETURN_SEATS_BY_FLIGHT
} from '../modules/SeatModule';
import axios from 'axios';

export const callGetAllSeatsByFlightAPI = ({ flightId, isReturnFlight }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/Seat/all`;

    return async (dispatch, getState) => {
        console.log('flightId :', { flightId });
        
        try {
            const result = await axios({
                method: "GET",
                url: requestURL,
                params: { flightId },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            console.log('[SeatAPICalls] callGetAllSeatsByFlightAPI RESULT : ', result);

            if (isReturnFlight) {
                dispatch({ type: GET_RETURN_SEATS_BY_FLIGHT, payload: result.data });
            } else {
                dispatch({ type: GET_DEPARTURE_SEATS_BY_FLIGHT, payload: result.data });
            }
        } catch (error) {
            console.error("에러 발생", error);
        }
    };
}

export const callGetAvailableSeatsTotalByFlightAPI = ({ flightId, isReturnFlight }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/Seat/Available`;

    return async (dispatch, getState) => {
        console.log('flightId :', { flightId });

        try {
            const result = await axios({
                method: "GET",
                url: requestURL,
                params: { flightId },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            console.log('[SeatAPICalls] callGetAvailableSeatsTotalByFlightAPI RESULT : ', result);

            if (isReturnFlight) {
                dispatch({ type: GET_RETURN_SEATS_BY_FLIGHT, payload: result.data });
            } else {
                dispatch({ type: GET_DEPARTURE_SEATS_BY_FLIGHT, payload: result.data });
            }
        } catch (error) {
            console.error("에러 발생", error);
        }
    };
}