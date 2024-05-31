import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetReservationAPI } from '../../apis/ReservationAPICalls';

const ReservationDetail = ({ reservationNo }) => {
    const dispatch = useDispatch();
    const reservation = useSelector(state => state.currentReservation);

    useEffect(() => {
        // 페이지가 로드될 때 예약 상세 정보를 가져오도록 액션을 디스패치합니다.
        dispatch(callGetReservationAPI({ reservationNo }));
    }, [dispatch, reservationNo]);

    return (
        <div>
            <h2>예약 상세 정보</h2>
            {reservation && (
                <div>
                    <p>예약 번호: {reservation.reservationNo}</p>
                    <p>예약자 정보: {reservation.member}</p>
                    <p>항공편 정보: {reservation.flight}</p>
                    <p>좌석 정보: {reservation.seat}</p>
                    <p>쿠폰 정보: {reservation.coupon}</p>
                    <p>기본 수하물 갯수: {reservation.baggageAmount}</p>
                    <p>추가 수하물 갯수: {reservation.extraBaggageAmount}</p>
                    <p>수하물 금액: {reservation.baggagePrice}</p>
                    <p>예약 일자: {reservation.reservationDate}</p>
                    <p>예약 총 금액: {reservation.reservationTotalPrice}</p>
                </div>
            )}
        </div>
    );
};

export default ReservationDetail;
