import {
    GET_ALL_SEATS_BY_FLIGHT,
    GET_AVAILABLE_SEATS_TOTAL_BY_FLIGHT
} from '../modules/SeatModule';
import axios from 'axios';

export const callgetAllSeatsByFlightAPI = ({ flightId }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/Seat/all`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        
        console.log('flightId :', { flightId });
            // axios를 사용하여 API 요청을 보냅니다.
            const result = await axios({
                method: "GET",
                url: requestURL,
                params: { 
                flightId
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

            console.log('[SeatAPICalls] callgetAllSeatsByFlightAPI RESULT : ', result);

            dispatch({ type: GET_ALL_SEATS_BY_FLIGHT, payload: result.data });
    
    };
}

export const callgetAvailableSeatsTotalByFlightAPI = ({ flightId }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/Seat/Available`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        
        console.log('flightId :', { flightId });
            // axios를 사용하여 API 요청을 보냅니다.
            const result = await axios({
                method: "GET",
                url: requestURL,
                params: { 
                flightId
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

            console.log('[SeatAPICalls] callgetAllSeatsByFlightAPI RESULT : ', result);

            dispatch({ type: GET_AVAILABLE_SEATS_TOTAL_BY_FLIGHT, payload: result.data });
    
    };
}