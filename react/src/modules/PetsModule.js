import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    petsData: []
};

/* 액션 */
export const GET_PETS = 'pets/GET_PETS';
export const UPDATE_PET = 'pets/UPDATE_PET';
export const ADD_PET = 'pets/ADD_PET';
export const DELETE_PET = 'pets/DELETE_PET'; // DELETE_PET 액션 추가

const actions = createActions({
    [GET_PETS]: () => {},
    [UPDATE_PET]: (payload) => payload,
    [ADD_PET]: (payload) => payload,
    [DELETE_PET]: (payload) => payload // DELETE_PET 액션 추가
});

/* 리듀서 */
const petsReducer = handleActions(
    {
        [GET_PETS]: (state, { payload }) => {
            return {
                ...state,
                petsData: payload
            };
        },
        [UPDATE_PET]: (state, { payload }) => {
            return {
                ...state,
                petsData: payload
            };
        },
        [ADD_PET]: (state, { payload }) => {
            return {
                ...state,
                petsData: [...state.petsData, payload]
            };
        },
        [DELETE_PET]: (state, { payload }) => {
            return {
                ...state,
                petsData: state.petsData.filter(pet => pet.petId !== payload)
            };
        },
    },
    initialState
);

export default petsReducer;
