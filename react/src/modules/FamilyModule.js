import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    familyData: []
};

/* 액션 */
export const GET_FAMILY = 'family/GET_FAMILY';
export const UPDATE_FAMILY = 'family/UPDATE_FAMILY';
export const ADD_FAMILY = 'family/ADD_FAMILY';
export const DELETE_FAMILY = 'family/DELETE_FAMILY'; // DELETE_FAMILY 액션 추가

const actions = createActions({
    [GET_FAMILY]: () => {},
    [UPDATE_FAMILY]: (payload) => payload,
    [ADD_FAMILY]: (payload) => payload,
    [DELETE_FAMILY]: (payload) => payload // DELETE_FAMILY 액션 추가
});

/* 리듀서 */
const familyReducer = handleActions(
    {
        [GET_FAMILY]: (state, { payload }) => {
            return {
                ...state,
                familyData: payload
            };
        },
        [UPDATE_FAMILY]: (state, { payload }) => {
            return {
                ...state,
                familyData: payload
            };
        },
        [ADD_FAMILY]: (state, { payload }) => {
            return {
                ...state,
                familyData: [...state.familyData, payload]
            };
        },
        [DELETE_FAMILY]: (state, { payload }) => {
            return {
                ...state,
                familyData: state.familyData.filter(family => family.familyUserId !== payload)
            };
        },
    },
    initialState
);

export default familyReducer;
