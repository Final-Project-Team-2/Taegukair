import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callAssignCouponAPI } from '../../apis/CouponAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';

function CouponRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState('');
    const [couponDetails, setCouponDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const accessToken = window.localStorage.getItem("accessToken");
    const token = decodeJwt(accessToken);

    const onChangeHandler = (e) => {
        setCouponCode(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log('Checking coupon:', couponCode); // 로그 추가

        const memberCode = token.memberCode; // memberCode 필드가 token에 있는지 확인
        console.log('Assigning coupon:', couponCode, 'to member:', memberCode); // 로그 추가

        try {
            const response = await dispatch(callAssignCouponAPI({ couponCode, memberCode }));
            console.log('Coupon assigned, response:', response); // 로그 추가

            if (response && response.valid) {
                setCouponDetails(response.coupon);
            } else {
                setErrorMessage(response.message || '쿠폰 번호가 유효하지 않거나 이미 사용되었습니다.');
            }
        } catch (error) {
            console.error('Error assigning coupon:', error); // 에러 로그 추가
            setErrorMessage('쿠폰 등록 중 오류가 발생했습니다.');
        }
    };

    const onConfirmHandler = () => {
        navigate('/profile');
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
            <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                <h1>쿠폰 등록</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={onSubmitHandler}>
                    <input 
                        type="text" 
                        placeholder="쿠폰 코드" 
                        name="couponCode"
                        value={couponCode}
                        onChange={onChangeHandler}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                    />
                    <button
                        type="submit"
                        style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white' }}
                    >
                        등록
                    </button>
                </form>
                {couponDetails && (
                    <div style={{ marginTop: '20px', textAlign: 'left' }}>
                        <h3>쿠폰 상세 정보</h3>
                        {couponDetails.discountAmount && <p>{couponDetails.discountAmount}원 할인쿠폰</p>}
                        {couponDetails.discountPercentage && <p>{couponDetails.discountPercentage}% 할인쿠폰</p>}
                        <p>유효기간: {couponDetails.validUntil}</p>
                        <button
                            onClick={onConfirmHandler}
                            style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white', marginTop: '10px' }}
                        >
                            확인
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CouponRegister;
