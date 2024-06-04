import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ALL_RESERVATIONS = 'reservations/GET_ALL_RESERVATIONS';
export const GET_RESERVATION_BY_NO = 'reservations/GET_RESERVATION_BY_NO';
export const POST_RESERVATION = 'reservations/POST_RESERVATION';

export const { reservations: {getAllReservations, getReservationByNo, postReservation} } = createActions ({
    [GET_ALL_RESERVATIONS]: () => {},
    [GET_RESERVATION_BY_NO]: (payload) => payload,
    [POST_RESERVATION]: (payload) => payload
});

const reservationReducer = handleActions(
    {
        [GET_ALL_RESERVATIONS]: (state, { payload }) => {
            return payload;
        },
        [GET_RESERVATION_BY_NO]: (state, { payload }) => {
            return payload;
        },
        [POST_RESERVATION]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default reservationReducer;