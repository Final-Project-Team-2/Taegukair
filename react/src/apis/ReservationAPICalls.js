import {
    GET_ALL_RESERVATIONS,
    GET_RESERVATION_BY_NO,
    POST_RESERVATION,
    GET_MY_RESERVATIONS,
    DELETE_RESERVATION
} from '../modules/ReservationModule';
import axios from 'axios';

export const callGetAllReservationsAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/reservations`;

    return async (dispatch, getState) => {
        const result = await axios({
                method: "GET",
                url: requestURL,
                headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(result => result.data)
        .catch(error => {
            console.error("에러 발생", error);
        });

        console.log('[ReservationAPICalls] callGetAllReservationsAPI RESULT : ', result);

        dispatch({ type: GET_ALL_RESERVATIONS, payload: result });
    };
}

export const callGetReservationAPI = ({reservationNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/reservation/detail`;

    return async (dispatch, getState) => {
        const result = await axios({
            method: "GET",
            url: requestURL,
            params: { reservationNo },
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(result => result.data)
        .catch(error => {
            console.error("에러 발생", error);
        });

        console.log('[ReservationAPICalls] callGetReservationAPI RESULT : ', result);

        dispatch({ type: GET_RESERVATION_BY_NO, payload: result });
    };
}

export const callPostReservationAPI = (form) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/registReservation`;

    return async (dispatch, getState) => {
        const result = await axios({
            method: "POST",
            url: requestURL,
            data: form,
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(result => result.data)
        .catch(error => {
            console.error("에러 발생", error);
        });

        console.log('[ReservationAPICalls] callPostReservationAPI RESULT : ', result);

        dispatch({ type: POST_RESERVATION, payload: result });
    };
}

export const callGetMyReservationsAPI = ({ memberCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/mypage/reservation`;

    return async (dispatch, getState) => {
        const result = await axios({
            method: "GET",
            url: requestURL,
            params: { memberCode },
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(result => {
            console.log('[ReservationAPICalls] callGetMyReservationsAPI RESULT: ', result.data);
            return result.data;  // Ensure to return the correct data
        })
        .catch(error => {
            console.error("에러 발생", error);
        });

        return result;
    };
}

export const callDeleteReservationAPI = ({ reservationNo }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/mypage/reservation`;

    return async (dispatch, getState) => {
        const result = await axios({
            method: "DELETE",
            url: requestURL,
            params: { reservationNo },
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(result => result.data)
        .catch(error => {
            console.error("에러 발생", error);
        });

        console.log('[ReservationAPICalls] callDeleteReservationAPI RESULT : ', result);

        return result;
    };
}
