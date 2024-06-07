import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    isAuthenticated: false,
    memberData: {},
    allMembers: []
};

/* 액션 */
export const GET_MEMBER = 'member/GET_MEMBER';
export const GET_ALL_MEMBERS = 'member/GET_ALL_MEMBERS';
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER';
export const UPDATE_MEMBER = 'member/UPDATE_MEMBER'; // 추가된 부분

const actions = createActions({
    [GET_MEMBER]: () => {},
    [GET_ALL_MEMBERS]: () => {},
    [POST_LOGIN]: (payload) => payload,
    [POST_REGISTER]: (payload) => payload,
    [UPDATE_MEMBER]: (payload) => payload // 추가된 부분
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
        [GET_ALL_MEMBERS]: (state, { payload }) => { // 수정된 부분
            console.log('GET_ALL_MEMBERS payload:', payload);
            return {
                ...state,
                allMembers: payload
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
        [UPDATE_MEMBER]: (state, { payload }) => { // 추가된 부분
            return {
                ...state,
                memberData: payload
            };
        }
    },
    initialState
);

export default memberReducer;
