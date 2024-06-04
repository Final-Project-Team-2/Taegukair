import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetAllReservationsAPI } from '../../apis/ReservationAPICalls'; // API 호출 함수를 가져옵니다.
import { useNavigate } from 'react-router-dom';
import "./Reservations.css";

const Reservations = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reservations = useSelector(state => state.reservation);

    useEffect(() => {
        // 페이지가 로드될 때 전체 예약 정보를 가져오도록 액션을 디스패치합니다.
        dispatch(callGetAllReservationsAPI());
    }, [dispatch]);

    const onClickHandler = (e) => {
        const reservationNo = e.currentTarget.getAttribute('data-reservationno');
        console.log(reservationNo);
        navigate(`detail?reservationNo=${reservationNo}`);
    }

    console.log(reservations);

    return (
        <div className="table-container">
            <h2>전체 예약 목록</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>예약 번호</th>
                        <th>예약자 정보</th>
                        <th>항공편 정보</th>
                        <th>좌석 정보</th>
                        <th>쿠폰 정보</th>
                        <th>기본 수하물 갯수</th>
                        <th>추가 수하물 갯수</th>
                        <th>수하물 금액</th>
                        <th>예약 일자</th>
                        <th>예약 총 금액</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(reservations) && reservations.length > 0 && reservations.map(reservation => (
                        <tr className='reservationList' onClick={onClickHandler} key={reservation.reservationNo} data-reservationno={reservation.reservationNo}>
                            <td>{reservation.reservationNo}</td>
                            <td>{reservation.member.memberName}</td>
                            <td>{reservation.flight.flightId}</td>
                            <td>{reservation.seat.seatNo}</td>
                            <td>{reservation.coupon ? reservation.coupon.couponId : "없음"}</td>
                            <td>{reservation.baggageAmount}</td>
                            <td>{reservation.extraBaggageAmount}</td>
                            <td>{reservation.baggagePrice}</td>
                            <td>{reservation.reservationDate}</td>
                            <td>{reservation.reservationTotalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservations;
