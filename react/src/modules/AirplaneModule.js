import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    airplanes: { data: [] }, // 초기 상태 설정
    airplane: null
};

/* 액션 */
export const GET_AIRPLANES = 'airplane/GET_AIRPLANES';
export const GET_AIRPLANE = 'airplane/GET_AIRPLANE';
export const POST_AIRPLANE = 'airplane/POST_AIRPLANE';
export const PUT_AIRPLANE = 'airplane/PUT_AIRPLANE';
export const DELETE_AIRPLANE = 'airplane/DELETE_AIRPLANE';

export const { getAirplanes, getAirplane, postAirplane, putAirplane, deleteAirplane } = createActions({
    [GET_AIRPLANES]: (payload) => payload,
    [GET_AIRPLANE]: (payload) => payload,
    [POST_AIRPLANE]: (payload) => payload,
    [PUT_AIRPLANE]: (payload) => payload,
    [DELETE_AIRPLANE]: (payload) => payload
});

/* 리듀서 */
const airplaneReducer = handleActions(
    {
        [GET_AIRPLANES]: (state, { payload }) => {
            console.log('Reducer GET_AIRPLANES payload:', payload); 
            return {
                ...state,
                airplanes: payload  
            };
        },
        [GET_AIRPLANE]: (state, { payload }) => ({
            ...state,
            airplane: payload
        }),
        [POST_AIRPLANE]: (state, { payload }) => ({
            ...state,
            airplanes: [...state.airplanes, payload]
        }),
        [PUT_AIRPLANE]: (state, { payload }) => ({
            ...state,
            airplanes: state.airplanes.map(airplane =>
                airplane.id === payload.id ? payload : airplane
            )
        }),
        [DELETE_AIRPLANE]: (state, { payload }) => ({
            ...state,
            airplanes: state.airplanes.filter(airplane => airplane.id !== payload.id)
        })
    },
    initialState
);

export default airplaneReducer;
