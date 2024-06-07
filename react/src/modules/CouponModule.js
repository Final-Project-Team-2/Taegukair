import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ALL_COUPONS = 'coupons/GET_ALL_COUPONS';
export const GET_COUPON_BY_MEMBER_NO = 'coupons/GET_COUPON_BY_MEMBER_NO';
export const REGISTER_COUPON = 'coupons/REGISTER_COUPON';
export const CHECK_COUPON = 'coupons/CHECK_COUPON';
export const ASSIGN_COUPON = 'coupons/ASSIGN_COUPON';

export const { coupons: { getAllCoupons, getCouponByMemberNo, registerCoupon, checkCoupon, assignCoupon } } = createActions({
    [GET_ALL_COUPONS]: () => {},
    [GET_COUPON_BY_MEMBER_NO]: (payload) => payload,
    [REGISTER_COUPON]: (payload) => payload,
    [CHECK_COUPON]: (payload) => payload,
    [ASSIGN_COUPON]: (payload) => payload
});

const couponReducer = handleActions(
    {
        [GET_ALL_COUPONS]: (state, { payload }) => [...payload],
        [GET_COUPON_BY_MEMBER_NO]: (state, { payload }) => [...payload],
        [REGISTER_COUPON]: (state, { payload }) => [...state, payload],
        [ASSIGN_COUPON]: (state, { payload }) => [...state, payload],
        [CHECK_COUPON]: (state, { payload }) => state // or handle the result appropriately
    },
    initialState
);

export default couponReducer;
