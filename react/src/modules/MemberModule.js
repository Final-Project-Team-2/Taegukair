import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    isAuthenticated: false,
    memberData: {}
};

/* 액션 */
export const GET_MEMBER = 'member/GET_MEMBER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER';

const actions = createActions({
    [GET_MEMBER]: () => {},
    [POST_LOGIN]: (payload) => payload,
    [POST_REGISTER]: (payload) => payload
});

/* 리듀서 */
const memberReducer = handleActions(
    {
        [GET_MEMBER]: (state, { payload }) => {
            console.log('GET_MEMBER payload:', payload);
            return {
                ...state,
                memberData: payload // payload를 바로 저장
            };
        },
        [POST_LOGIN]: (state, { payload }) => {
            return {
                ...state,
                isAuthenticated: true,
                memberData: payload
            };
        },
        [POST_REGISTER]: (state, { payload }) => {
            return {
                ...state,
                memberData: payload
            };
        },
    },
    initialState
);

export default memberReducer;
