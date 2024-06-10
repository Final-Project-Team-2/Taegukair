import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    departureSeats: [],
    returnSeats: []
};

/* 액션 */
export const GET_DEPARTURE_SEATS_BY_FLIGHT = 'seats/GET_DEPARTURE_SEATS_BY_FLIGHT';
export const GET_RETURN_SEATS_BY_FLIGHT = 'seats/GET_RETURN_SEATS_BY_FLIGHT';

export const { seats: {getDepartureSeatsByFlight, getReturnSeatsByFlight} } = createActions ({
    [GET_DEPARTURE_SEATS_BY_FLIGHT]: (payload) => payload,
    [GET_RETURN_SEATS_BY_FLIGHT]: (payload) => payload
});

const seatReducer = handleActions(
    {
        [GET_DEPARTURE_SEATS_BY_FLIGHT]: (state, {payload}) => ({
            ...state,
            departureSeats: payload
        }),
        [GET_RETURN_SEATS_BY_FLIGHT]: (state, {payload}) => ({
            ...state,
            returnSeats: payload
        })
    },
    initialState
);

export default seatReducer;