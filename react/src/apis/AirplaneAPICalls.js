import {
    GET_AIRPLANES,
    GET_AIRPLANE,
    POST_AIRPLANE,
    PUT_AIRPLANE,
    DELETE_AIRPLANE
} from '../modules/AirplaneModule';

const BASE_URL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/admin/airplane`;

export const callGetAirplanesAPI = () => {
    const requestURL = `${BASE_URL}/all`;

    return async (dispatch, getState) => {
        console.log('[AirplaneAPICalls] callGetAirplanesAPI URL:', requestURL);

        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('[AirplaneAPICalls] callGetAirplanesAPI RESULT: ', result);
            dispatch({ type: GET_AIRPLANES, payload: result });
        } catch (error) {
            console.error('[AirplaneAPICalls] callGetAirplanesAPI error: ', error);
        }
    };
}

export const callGetAirplaneAPI = ({ id }) => {
    const requestURL = `${BASE_URL}/${id}`;

    return async (dispatch, getState) => {
        console.log('[AirplaneAPICalls] callGetAirplaneAPI URL:', requestURL);

        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('[AirplaneAPICalls] callGetAirplaneAPI RESULT: ', result);
            dispatch({ type: GET_AIRPLANE, payload: result });
        } catch (error) {
            console.error('[AirplaneAPICalls] callGetAirplaneAPI error: ', error);
        }
    };
}

export const callCreateAirplaneAPI = ({ form }) => {
    const requestURL = BASE_URL;

    return async (dispatch, getState) => {
        console.log('[AirplaneAPICalls] callCreateAirplaneAPI URL:', requestURL);

        try {
            const response = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    airplaneType: form.airplaneType,
                    airplaneNo: form.airplaneNo,
                    airplaneSeat: form.airplaneSeat
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('[AirplaneAPICalls] callCreateAirplaneAPI RESULT: ', result);
            dispatch({ type: POST_AIRPLANE, payload: result });
        } catch (error) {
            console.error('[AirplaneAPICalls] callCreateAirplaneAPI error: ', error);
        }
    };
}

export const callUpdateAirplaneAPI = ({ form }) => {
    const requestURL = BASE_URL;

    return async (dispatch, getState) => {
        console.log('[AirplaneAPICalls] callUpdateAirplaneAPI URL:', requestURL);

        try {
            const response = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    id: form.id,
                    airplaneType: form.airplaneType,
                    airplaneNo: form.airplaneNo,
                    airplaneSeat: form.airplaneSeat
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('[AirplaneAPICalls] callUpdateAirplaneAPI RESULT: ', result);
            dispatch({ type: PUT_AIRPLANE, payload: result });
        } catch (error) {
            console.error('[AirplaneAPICalls] callUpdateAirplaneAPI error: ', error);
        }
    };
}

export const callDeleteAirplaneAPI = ({ id }) => {
    const requestURL = `${BASE_URL}/${id}`;

    return async (dispatch, getState) => {
        console.log('[AirplaneAPICalls] callDeleteAirplaneAPI URL:', requestURL);

        try {
            const response = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('[AirplaneAPICalls] callDeleteAirplaneAPI RESULT: ', result);
            dispatch({ type: DELETE_AIRPLANE, payload: result });
        } catch (error) {
            console.error('[AirplaneAPICalls] callDeleteAirplaneAPI error: ', error);
        }
    };
}
