import { createActions, handleActions } from "redux-actions";

// 초기값 설정
const initialState = [];

// 액션
export const POST_BOARD = 'main/user/POST_BOARD';

const actions = createActions({
    [POST_BOARD] : (payload) => {payload}
});

// 리듀서
const boardReducer = handleActions(
    {
        [POST_BOARD] : (state, {payload}) => {
            console.log('POST_BOARD payload : ', payload);
            return {
                ...state,
                boardData : payload
            };
        }
    },
    initialState
);

export default boardReducer;
