import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetReservationAPI } from '../../apis/ReservationAPICalls';
import { useSearchParams } from 'react-router-dom';

const ReservationDetail = () => {
    const reservation = useSelector(state => state.reservationReducer);
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const reservationNo = searchParams.get( 'reservationNo' )
        console.log(reservationNo);
        // 페이지가 로드될 때 예약 상세 정보를 가져오도록 액션을 디스패치합니다.
        dispatch(callGetReservationAPI({ reservationNo }));
    }, [dispatch, searchParams.get('reservationNo')]);

    return (
        <div>
            <h2>예약 상세 정보</h2>
            {reservation && (
                <div>
                <table>
                    <tbody>
                        <tr>
                            <td>예약 번호:</td>
                            <td>{reservation.reservationNo}</td>
                        </tr>
                        <tr>
                            <td>기본 수하물 갯수:</td>
                            <td>{reservation.baggageAmount}</td>
                        </tr>
                        <tr>
                            <td>추가 수하물 갯수:</td>
                            <td>{reservation.extraBaggageAmount}</td>
                        </tr>
                        <tr>
                            <td>수하물 금액:</td>
                            <td>{reservation.baggagePrice}</td>
                        </tr>
                        <tr>
                            <td>예약 일자:</td>
                            <td>{reservation.reservationDate}</td>
                        </tr>
                        <tr>
                            <td>예약 총 금액:</td>
                            <td>{reservation.reservationTotalPrice}</td>
                        </tr>
                    </tbody>
                </table>

                <br/>
            
                {/* 예약자 정보 테이블 */}
                <h2>예약자 상세 정보</h2>
                {reservation.member && (
                <table>
                    <tbody>
                        <tr>
                            <td>예약자 회원번호:</td>
                            <td>{reservation.member.memberCode}</td>
                        </tr>
                        <tr>
                            <td>예약자 이름:</td>
                            <td>{reservation.member.memberName}</td>
                        </tr>
                        <tr>
                            <td>예약자 아이디:</td>
                            <td>{reservation.member.memberId}</td>
                        </tr>
                        <tr>
                            <td>예약자 이메일:</td>
                            <td>{reservation.member.memberEmail}</td>
                        </tr>
                        <tr>
                            <td>예약자 성별:</td>
                            <td>{reservation.member.memberGender}</td>
                        </tr>
                        <tr>
                            <td>예약자 연락처:</td>
                            <td>{reservation.member.memberPhone}</td>
                        </tr>
                    </tbody>
                </table>
                )}
                <br/>

                {/* 항공편 정보 테이블 */}
                <h2>항공편 상세 정보</h2>
                {reservation.flight && (
                <table>
                    <tbody>
                        <tr>
                            <td>항공편 번호:</td>
                            <td>{reservation.flight.flightId}</td>
                        </tr>
                        <tr>
                            <td>항공편 항공기명:</td>
                            <td>{reservation.flight.airplane.airplaneType}</td>
                        </tr>
                        <tr>
                            <td>출발 공항명:</td>
                            <td>{reservation.flight.startAirPort.airportName}</td>
                        </tr>
                        <tr>
                            <td>도착 공항명:</td>
                            <td>{reservation.flight.endAirPort.airportName}</td>
                        </tr>
                        <tr>
                            <td>출발 예정 시간:</td>
                            <td>{reservation.flight.startTime}</td>
                        </tr>
                        <tr>
                            <td>도착 예정 시간:</td>
                            <td>{reservation.flight.endTime}</td>
                        </tr>
                    </tbody>
                </table>
                )}
                <br/>
            
                {/* 좌석 정보 테이블 */}
                <h2>좌석 정보</h2>
                {reservation.seat && (
                <table>
                    <tbody>
                        <tr>
                            <td>좌석 번호:</td>
                            <td>{reservation.seat.seatNo}</td>
                        </tr>
                        <tr>
                            <td>좌석 등급:</td>
                            <td>{reservation.seat.seatClass.seatClassName}</td>
                        </tr>
                        <tr>
                            <td>좌석 종류:</td>
                            <td>{reservation.seat.seatType.seatTypeName}</td>
                        </tr>
                    </tbody>
                </table>
                )}
            </div>
            )}
        </div>
    );
};

export default ReservationDetail;
