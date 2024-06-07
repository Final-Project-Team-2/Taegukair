import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetMyReservationsAPI, callDeleteReservationAPI } from '../../apis/ReservationAPICalls';
import './ReservationTickets.css';

function ReservationTickets() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [reservations, setReservations] = useState([]);
    const accessToken = window.localStorage.getItem("accessToken");
    const token = decodeJwt(accessToken);
    const memberCode = token.sub;

    useEffect(() => {
        if (memberCode) {
            dispatch(callGetMyReservationsAPI({ memberCode }))
                .then(response => setReservations(response.data));
        }
    }, [dispatch, memberCode]);

    const handleDelete = (reservationNo) => {
        dispatch(callDeleteReservationAPI({ reservationNo }))
            .then(() => dispatch(callGetMyReservationsAPI({ memberCode }))
                .then(response => setReservations(response.data)));
    };

    return (
        <div className="ReservationTickets">
            <h1>예약 내역</h1>
            {reservations.length === 0 ? (
                <p>예약 내역이 없습니다.</p>
            ) : (
                reservations.map(reservation => (
                    <div key={reservation.reservationNo} className="ticket">
                        <h2>예약 번호: {reservation.reservationNo}</h2>
                        <p>회원 번호: {reservation.member.memberCode}</p>
                        <p>항공편 번호: {reservation.flight.flightId}</p>
                        <p>출발 시간: {reservation.flight.startTime}</p>
                        <p>도착 시간: {reservation.flight.endTime}</p>
                        <p>출발 공항: {reservation.flight.startAirPort.airportIata}</p>
                        <p>도착 공항: {reservation.flight.endAirPort.airportIata}</p>
                        <p>예약 금액: {reservation.reservationTotalPrice}원</p>
                        <button onClick={() => handleDelete(reservation.reservationNo)}>예약 취소</button>
                    </div>
                ))
            )}
            <button onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
    );
}

export default ReservationTickets;
