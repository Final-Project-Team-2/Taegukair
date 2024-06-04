import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ALL_COUPONS = 'coupons/GET_ALL_COUPONS';
export const GET_COUPON_BY_MEMBER_NO = 'coupons/GET_COUPON_BY_MEMBER_NO';

export const { coupons: {getAllCoupons, getCouponByMemberNo} } = createActions ({
    [GET_ALL_COUPONS]: () => {},
    [GET_COUPON_BY_MEMBER_NO]: (payload) => payload
});

const couponReducer = handleActions(
    {
        [GET_ALL_COUPONS]: (state, { payload }) => {
            return payload;
        },
        [GET_COUPON_BY_MEMBER_NO]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default couponReducer;



