import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ALL_SEATS_BY_FLIGHT = 'seats/GET_ALL_SEATS_BY_FLIGHT';
export const GET_AVAILABLE_SEATS_TOTAL_BY_FLIGHT = 'seats/GET_AVAILABLE_SEATS_TOTAL_BY_FLIGHT';

export const { seats: {getAllSeatsByFlight, getAvailableSeatsTotalByFlight} } = createActions ({
    [GET_ALL_SEATS_BY_FLIGHT]: (payload) => payload,
    [GET_AVAILABLE_SEATS_TOTAL_BY_FLIGHT]: (payload) => payload
});

const seatReducer = handleActions(
    {
        [GET_ALL_SEATS_BY_FLIGHT]: (state, { payload }) => {
            return payload;
        },
        [GET_AVAILABLE_SEATS_TOTAL_BY_FLIGHT]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default seatReducer;