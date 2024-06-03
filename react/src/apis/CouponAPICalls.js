import {
    GET_ALL_COUPONS
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