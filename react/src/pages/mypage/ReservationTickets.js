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
    const token = accessToken ? decodeJwt(accessToken) : null;
    const memberCode = token ? token.memberCode : null;

    useEffect(() => {
        const fetchReservations = async () => {
            if (memberCode && !isNaN(memberCode)) {
                try {
                    const response = await dispatch(callGetMyReservationsAPI({ memberCode }));
                    if (response) {
                        console.log('Reservations: ', response);
                        setReservations(response.data); 
                    } else {
                        setReservations([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch reservations:", error);
                }
            } else {
                console.error('Invalid memberCode:', memberCode);
            }
        };

        fetchReservations();
    }, [dispatch, memberCode]);

    const handleDelete = async (reservationNo) => {
        const confirmation = window.confirm("정말로 취소하시겠습니까? 이미 사용된 쿠폰은 복구되지 않습니다.");
        if (!confirmation) {
            return;
        }
        try {
            await dispatch(callDeleteReservationAPI({ reservationNo }));
            const response = await dispatch(callGetMyReservationsAPI({ memberCode }));
            if (response) {
                setReservations(response.data);
            } else {
                setReservations([]);
            }
        } catch (error) {
            console.error("Failed to delete reservation:", error);
        }
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
