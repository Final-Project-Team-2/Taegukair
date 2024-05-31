import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetAllReservationsAPI } from '../../apis/ReservationAPICalls'; // API 호출 함수를 가져옵니다.

const Reservations = () => {
    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservationReducer);

    useEffect(() => {
        // 페이지가 로드될 때 전체 예약 정보를 가져오도록 액션을 디스패치합니다.
        dispatch(callGetAllReservationsAPI());
    }, [dispatch]);

    return (
        <div>
            <h2>전체 예약 목록</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.reservationNo}>
                        <p>예약 번호: {reservation.reservationNo}</p>
                        <p>예약자 정보: {reservation.member.memberName}</p>
                        <p>항공편 정보: {reservation.flight.flightId}</p>
                        <p>좌석 정보: {reservation.seat.seatNo}</p>
                        <p>쿠폰 정보: {reservation.coupon ? reservation.coupon.couponId : "없음"}</p>
                        <p>기본 수하물 갯수: {reservation.baggageAmount}</p>
                        <p>추가 수하물 갯수: {reservation.extraBaggageAmount}</p>
                        <p>수하물 금액: {reservation.baggagePrice}</p>
                        <p>예약 일자: {reservation.reservationDate}</p>
                        <p>예약 총 금액: {reservation.reservationTotalPrice}</p>
                        <br/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reservations;