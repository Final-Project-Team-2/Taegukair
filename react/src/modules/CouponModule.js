import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ALL_COUPONS = 'coupons/GET_ALL_COUPONS';

export const { coupons: {getAllCoupons} } = createActions ({
    [GET_ALL_COUPONS]: () => {}
});

const couponReducer = handleActions(
    {
        [GET_ALL_COUPONS]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default couponReducer;



