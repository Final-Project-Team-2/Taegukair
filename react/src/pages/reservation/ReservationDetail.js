import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetReservationAPI } from '../../apis/ReservationAPICalls';
import { useSearchParams } from 'react-router-dom';
import './Reservations.css';

const ReservationDetail = () => {
    const reservation = useSelector(state => state.reservation);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const reservationNo = searchParams.get('reservationNo');
        console.log(reservationNo);
        // 페이지가 로드될 때 예약 상세 정보를 가져오도록 액션을 디스패치합니다.
        dispatch(callGetReservationAPI({ reservationNo }));
    }, [dispatch, searchParams]);

    return (
        <div className="detail-container">
            <div className="table-container">
                <h2 className="table-title">예약 상세 정보</h2>
                {reservation && (
                    <table className="reservation-detail-table uniform-table">
                        <tbody>
                            <tr>
                                <th>예약 번호</th>
                                <td>{reservation.data.reservationNo}</td>
                            </tr>
                            <tr>
                                <th>기본 수하물 갯수</th>
                                <td>{reservation.data.baggageAmount}</td>
                            </tr>
                            <tr>
                                <th>추가 수하물 갯수</th>
                                <td>{reservation.data.extraBaggageAmount}</td>
                            </tr>
                            <tr>
                                <th>수하물 금액</th>
                                <td>{reservation.data.baggagePrice}</td>
                            </tr>
                            <tr>
                                <th>예약 일자</th>
                                <td>{reservation.data.reservationDate}</td>
                            </tr>
                            <tr>
                                <th>예약 총 금액</th>
                                <td>{reservation.data.reservationTotalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <h2 className="table-title">예약자 상세 정보</h2>
                {reservation && reservation.member && (
                    <table className="reservation-detail-table uniform-table">
                        <tbody>
                            <tr>
                                <th>예약자 회원번호</th>
                                <td>{reservation.data.member.memberCode}</td>
                            </tr>
                            <tr>
                                <th>예약자 이름</th>
                                <td>{reservation.data.member.memberName}</td>
                            </tr>
                            <tr>
                                <th>예약자 아이디</th>
                                <td>{reservation.data.member.memberId}</td>
                            </tr>
                            <tr>
                                <th>예약자 이메일</th>
                                <td>{reservation.data.member.memberEmail}</td>
                            </tr>
                            <tr>
                                <th>예약자 성별</th>
                                <td>{reservation.data.member.memberGender}</td>
                            </tr>
                            <tr>
                                <th>예약자 연락처</th>
                                <td>{reservation.data.member.memberPhone}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <h2 className="table-title">항공편 상세 정보</h2>
                {reservation && reservation.flight && (
                    <table className="reservation-detail-table uniform-table">
                        <tbody>
                            <tr>
                                <th>항공편 번호</th>
                                <td>{reservation.data.flight.flightId}</td>
                            </tr>
                            <tr>
                                <th>항공기명</th>
                                <td>{reservation.data.flight.airplane.airplaneType}</td>
                            </tr>
                            <tr>
                                <th>출발 공항명</th>
                                <td>{reservation.data.flight.startAirPort.airportName}</td>
                            </tr>
                            <tr>
                                <th>도착 공항명</th>
                                <td>{reservation.data.flight.endAirPort.airportName}</td>
                            </tr>
                            <tr>
                                <th>출발 예정 시간</th>
                                <td>{reservation.data.flight.startTime}</td>
                            </tr>
                            <tr>
                                <th>도착 예정 시간</th>
                                <td>{reservation.data.flight.endTime}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <h2 className="table-title">좌석 정보</h2>
                {reservation && reservation.seat && (
                    <table className="reservation-detail-table uniform-table">
                        <tbody>
                            <tr>
                                <th>좌석 번호</th>
                                <td>{reservation.data.seat.seatNo}</td>
                            </tr>
                            <tr>
                                <th>좌석 등급</th>
                                <td>{reservation.data.seat.seatClass.seatClassName}</td>
                            </tr>
                            <tr>
                                <th>좌석 종류</th>
                                <td>{reservation.data.seat.seatType.seatTypeName}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ReservationDetail;
