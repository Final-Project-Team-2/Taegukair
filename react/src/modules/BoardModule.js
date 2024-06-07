import { createActions, handleActions } from "redux-actions";

// 초기값 설정
const initialState = {
    boards: [],
    boardData: null,
    boardDetail: null,
};

// 액션
export const POST_BOARD = 'main/user/POST_BOARD';
export const FETCH_USER_BOARDS = 'main/user/FETCH_USER_BOARDS';
export const FETCH_USER_BOARD_DETAIL = 'main/user/FETCH_USER_BOARD_DETAIL';

const actions = createActions({
    [POST_BOARD]: (payload) => payload,
    [FETCH_USER_BOARDS]: (payload) => payload,
    [FETCH_USER_BOARD_DETAIL]: (payload) => payload,
});

// 리듀서
const boardReducer = handleActions(
    {
        [POST_BOARD]: (state, { payload }) => {
            console.log('POST_BOARD payload: ', payload);
            return {
                ...state,
                boardData: payload
            };
        },
        [FETCH_USER_BOARDS]: (state, { payload }) => {
            console.log('FETCH_USER_BOARDS payload: ', payload);
            return {
                ...state,
                boards: Array.isArray(payload) ? payload : [] // 배열인지 확인하고 설정
            };
        },
        [FETCH_USER_BOARD_DETAIL]: (state, { payload }) => {
            console.log('FETCH_USER_BOARD_DETAIL payload: ', payload);
            return {
                ...state,
                boardDetail: payload
            };
        },
    },
    initialState
);

export default boardReducer;
