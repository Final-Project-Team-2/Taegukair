import {
    GET_ALL_COUPONS,
    GET_COUPON_BY_MEMBER_NO,
    CHECK_COUPON,
    ASSIGN_COUPON
} from '../modules/CouponModule';
import axios from 'axios';

export const callGetAllCouponsAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/coupon`;

    return async (dispatch, getState) => {

            // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
            // 서버에서 cors 허용을 해주어야 함
            const result = await axios({
                    method: "GET",
                    url: requestURL,
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(result => result.data)
            .catch(error => {
                console.error("에러 발생", error)
            });

            console.log('[CouponAPICalls] callGetAllCouponsAPI RESULT : ', result);

            dispatch({ type: GET_ALL_COUPONS, payload: result.data });
        
    };
}

export const callGetCouponByMemberCodeAPI = ({memberCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/coupon/membercode`;

    return async (dispatch, getState) => {

            console.log("API GET memberCode: ", memberCode);

            // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
            // 서버에서 cors 허용을 해주어야 함
            const result = await axios({
                    method: "GET",
                    url: requestURL,
                    params: {memberCode},
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(result => {
                if (result && result.data) {
                    console.log('[CouponAPICalls] callGetCouponByMemberCodeAPI RESULT : ', result.data);
                    dispatch({ type: GET_COUPON_BY_MEMBER_NO, payload: result.data });
                } else {
                    console.error('API 호출 결과가 유효하지 않습니다.');
                    throw new Error('API 호출 결과가 유효하지 않습니다.');
                }
            })
            .catch(error => {
                console.error("에러 발생", error)
            });
    };
}

export const callCheckCouponAPI = ({ couponCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/coupon/check`;

    return async (dispatch, getState) => {
        const result = await axios({
            method: "GET",
            url: requestURL,
            params: { couponCode },
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(result => result.data)
        .catch(error => {
            console.error("에러 발생", error);
        });

        dispatch({ type: CHECK_COUPON, payload: result });
        return result;
    };
}

export const callAssignCouponAPI = ({ couponCode, memberCode }) => {
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/coupon/assign`;
    
        return async (dispatch) => {
        try {
            const response = await axios({
            method: 'POST',
            url: requestURL,
            data: { couponCode, memberCode },
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            }
            });
            console.log('Assign coupon API response:', response.data); // 로그 추가
            dispatch({ type: ASSIGN_COUPON, payload: response.data });
            return response.data; // 응답 데이터를 반환
        } catch (error) {
            console.error('에러 발생', error);
            throw error;
        }
    };
};