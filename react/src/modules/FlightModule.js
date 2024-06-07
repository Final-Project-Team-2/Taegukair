import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션  */
export const GET_FLIGHTS_BY_AIRPORTS_AND_TIME = 'flights/GET_FLIGHTS_BY_AIRPORTS_AND_TIME';

export const { flights: {getFlightsByAirportsAndTime} } = createActions ({
    [GET_FLIGHTS_BY_AIRPORTS_AND_TIME]: (payload) => payload
});

const flightReducer = handleActions(
    {
        [GET_FLIGHTS_BY_AIRPORTS_AND_TIME]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default flightReducer;