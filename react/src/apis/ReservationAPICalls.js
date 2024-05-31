import {
    GET_ALL_RESERVATIONS,
    GET_RESERVATION_BY_NO,
    POST_RESERVATION
} from '../modules/ReservationModule';
import axios from 'axios';

export const callGetAllReservationsAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/reservations`;

    return async (dispatch, getState) => {

            // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
            // 서버에서 cors 허용을 해주어야 함
            const result = await axios({
                    method: "GET",
                    url: requestURL,
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(result => result.data)
            .catch(error => {
                console.error("에러 발생", error)
            });

            console.log('[ReservationAPICalls] callGetAllReservationsAPI RESULT : ', result);

            dispatch({ type: GET_ALL_RESERVATIONS, payload: result.data });
        
    };
}

export const callGetReservationAPI = ({reservationNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/reservation/detail`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        
            // axios를 사용하여 API 요청을 보냅니다.
            const result = await axios({
                method: "GET",
                url: requestURL,
                params: { reservationNo }, // 요청에 reservationNo를 쿼리 파라미터로 전달합니다.
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                //     "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(result => result.data)
            .catch(error => {
                console.error("에러 발생", error)
            });

            console.log('[ReservationAPICalls] callGetReservationAPI RESULT : ', result);

            dispatch({ type: GET_RESERVATION_BY_NO, payload: result.data });
    
    };
}

export const callPostReservationAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/registReservation`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        
            // axios를 사용하여 API 요청을 보냅니다.
            const result = await axios({
                method: "POST",
                url: requestURL,
                data: form,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                //     "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(result => result.data)
            .catch(error => {
                console.error("에러 발생", error)
            });

            console.log('[ReservationAPICalls] callPostReservationAPI RESULT : ', result);

            dispatch({ type: POST_RESERVATION, payload: result.data });
    
    };
}