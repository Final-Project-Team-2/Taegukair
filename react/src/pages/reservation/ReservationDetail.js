import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetReservationAPI } from '../../apis/ReservationAPICalls';
import { useSearchParams } from 'react-router-dom';
import './Reservations.css';

const ReservationDetail = () => {
    const reservation = useSelector(state => state.reservationReducer);
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
                                <td>{reservation.reservationNo}</td>
                            </tr>
                            <tr>
                                <th>기본 수하물 갯수</th>
                                <td>{reservation.baggageAmount}</td>
                            </tr>
                            <tr>
                                <th>추가 수하물 갯수</th>
                                <td>{reservation.extraBaggageAmount}</td>
                            </tr>
                            <tr>
                                <th>수하물 금액</th>
                                <td>{reservation.baggagePrice}</td>
                            </tr>
                            <tr>
                                <th>예약 일자</th>
                                <td>{reservation.reservationDate}</td>
                            </tr>
                            <tr>
                                <th>예약 총 금액</th>
                                <td>{reservation.reservationTotalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <h2 className="table-title">예약자 상세 정보</h2>
                {reservation.member && (
                    <table className="reservation-detail-table uniform-table">
                        <tbody>
                            <tr>
                                <th>예약자 회원번호</th>
                                <td>{reservation.member.memberCode}</td>
                            </tr>
                            <tr>
                                <th>예약자 이름</th>
                                <td>{reservation.member.memberName}</td>
                            </tr>
                            <tr>
                                <th>예약자 아이디</th>
                                <td>{reservation.member.memberId}</td>
                            </tr>
                            <tr>
                                <th>예약자 이메일</th>
                                <td>{reservation.member.memberEmail}</td>
                            </tr>
                            <tr>
                                <th>예약자 성별</th>
                                <td>{reservation.member.memberGender}</td>
                            </tr>
                            <tr>
                                <th>예약자 연락처</th>
                                <td>{reservation.member.memberPhone}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <h2 className="table-title">항공편 상세 정보</h2>
                {reservation.flight && (
                    <table className="reservation-detail-table uniform-table">
                        <tbody>
                            <tr>
                                <th>항공편 번호</th>
                                <td>{reservation.flight.flightId}</td>
                            </tr>
                            <tr>
                                <th>항공기명</th>
                                <td>{reservation.flight.airplane.airplaneType}</td>
                            </tr>
                            <tr>
                                <th>출발 공항명</th>
                                <td>{reservation.flight.startAirPort.airportName}</td>
                            </tr>
                            <tr>
                                <th>도착 공항명</th>
                                <td>{reservation.flight.endAirPort.airportName}</td>
                            </tr>
                            <tr>
                                <th>출발 예정 시간</th>
                                <td>{reservation.flight.startTime}</td>
                            </tr>
                            <tr>
                                <th>도착 예정 시간</th>
                                <td>{reservation.flight.endTime}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <h2 className="table-title">좌석 정보</h2>
                {reservation.seat && (
                    <table className="reservation-detail-table uniform-table">
                        <tbody>
                            <tr>
                                <th>좌석 번호</th>
                                <td>{reservation.seat.seatNo}</td>
                            </tr>
                            <tr>
                                <th>좌석 등급</th>
                                <td>{reservation.seat.seatClass.seatClassName}</td>
                            </tr>
                            <tr>
                                <th>좌석 종류</th>
                                <td>{reservation.seat.seatType.seatTypeName}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ReservationDetail;
