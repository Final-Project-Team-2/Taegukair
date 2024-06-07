import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import {
    callPostReservationAPI
} from '../../apis/ReservationAPICalls';
import {
    callGetCouponByMemberCodeAPI
} from '../../apis/CouponAPICalls';
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls';

const RegistReservation = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const flight = location.state.flight || {};

    const initialSeat = location.state.seat || {};

    const coupon = useSelector(state => state.coupon);

    const member = useSelector(state => state.member.memberData);

    const accessToken = window.localStorage.getItem("accessToken");
    const token = decodeJwt(accessToken);

    const dispatch = useDispatch();

    const [form, setForm] = useState({

        reservationNo: "",
        member: 0,
        flight: 0,
        seat: 0,
        coupon: 0,
        baggageAmount: 0,
        extraBaggageAmount: 0,
        baggagePrice: 0,
        reservationDate: null,
        reservationTotalPrice: 0

    });

    const [memberData, setMemberData] = useState({
        memberCode: '',
        memberId: '',
        memberName: '',
        memberGender: '',
        memberEmail: '',
        birthDate: '',
        memberPhone: ''
    });

    const [loading, setLoading] = useState(true);

    const [baggageAmount, setBaggageAmount] = useState();

    const [extraBaggageAmount, setExtraBaggageAmount] = useState();

    const [baggagePrice, setBaggagePrice] = useState();

    const [selectedCouponId, setSelectedCouponId] = useState(0);

    const [selectedCoupon, setSelectedCoupon] = useState({});

    const [sumPrice, setSumPrice] = useState(null);

    const [totalPrice, setTotalPrice] = useState(null);

    const [seat, setSeat] = useState(initialSeat);

    const calculateSumPrice = () => {
        if (flight.flightPrice) {
            let price = flight.flightPrice;
            if (baggagePrice) {
                price += baggagePrice;
            }
            if (seat.seatId) {
                price += (seat.seatType.seatTypePrice + seat.seatClass.seatClassPrice);
            }
            setSumPrice(price);
        } else {
            setSumPrice(null);
        }
    };

    const calculateTotalPrice = () => {
        if (selectedCoupon != null) {
            if (selectedCoupon.discountAmount) {
                setTotalPrice(sumPrice - selectedCoupon.discountAmount);
            } else if (selectedCoupon.discountPercentage) {
                setTotalPrice(sumPrice * (1 - selectedCoupon.discountPercentage / 100));
            } else {
                setTotalPrice(sumPrice);
            }
        } else {
            setTotalPrice(sumPrice);
        }
    };

    useEffect(() => {
        calculateSumPrice();
    }, [flight.flightPrice, seat, baggagePrice]);
    
    useEffect(() => {
        calculateTotalPrice();

    }, [sumPrice, selectedCoupon]);

    useEffect(() => {
        if (token && token.sub) {
            console.log('Dispatching callGetMemberAPI with memberId:', token.sub);
            dispatch(callGetMemberAPI({ memberId: token.sub }));
        } else {
            console.error("Token is null or invalid");
        }
    }, [dispatch, token.sub]);

    useEffect(() => {
        if (member && member.data) {
            console.log('Member data:', member.data); // member.data 로그 추가
            setMemberData({
                memberCode: member.data.memberCode,
                memberId: member.data.memberId,
                memberName: member.data.memberName,
                memberGender: member.data.memberGender,
                memberEmail: member.data.memberEmail,
                birthDate: member.data.birthDate,
                memberPhone: member.data.memberPhone
            });
            setLoading(false);
        }
    }, [member]);

    useEffect(
        () => {
            if(!loading && memberData.memberCode) {
            const memberCode = memberData.memberCode;
            dispatch(callGetCouponByMemberCodeAPI({memberCode}));
            }
        },
        [dispatch, loading, memberData.memberCode]
    );

    useEffect(() => {
        const selected = coupon.find(couponItem => String(couponItem.couponId) === selectedCouponId);
        setSelectedCoupon(selected || null);
        console.log("selected : ", selected);
    }, [selectedCouponId, coupon]);

    useEffect(() => {
        console.log("selectedCoupon : ", selectedCoupon);
    }, [selectedCoupon]);

    const onChangeCouponHandler = (e) => {
        const couponId = e.target.value;
        setSelectedCouponId(couponId);
    };

    const onBaggageChangeHandler = (e) => {
        const amount = e.target.value;
        if (amount !== baggageAmount) {
            setBaggageAmount(amount);
        }
    };

    const onExtraBaggageChangeHandler = (e) => {
        const amount = e.target.value;
        if (amount !== extraBaggageAmount) {
            setExtraBaggageAmount(amount);
            setBaggagePrice(amount * 10000);
        }
    };

    const onChooseSeatHandler = () => {
        navigate('chooseSeat', {
            state: { flight : flight }
        });
    };

    const onsubmitHandler = () => {
        const updatedForm = {
            reservationNo: "",
            member: Number(member.data.memberCode),
            flight: Number(flight.flightId),
            seat: Number(seat.seatId),
            coupon: Number(selectedCouponId) || null,
            baggageAmount: Number(baggageAmount),
            extraBaggageAmount: Number(extraBaggageAmount),
            baggagePrice: Number(baggagePrice),
            reservationDate: "",
            reservationTotalPrice: Number(totalPrice)
        };

        setForm(updatedForm);

        if (updatedForm.member && updatedForm.flight && updatedForm.seat) {
            console.log("Updated form: ", updatedForm);
            dispatch(callPostReservationAPI(updatedForm));
            alert("예약이 완료되었습니다");
            navigate("/"); // 예약 정보 조회 페이지로 이동시키기
        }
    };

    if (!member || !member.data) {
        return <p>Loading...</p>;
    }

    if(seat.seatId) {
        console.log("seat :", seat);
    }

    return (
        <div>
            <br/>
            <form>
                <div>
                    <div>
                        <div>
                            <label>항공편 번호</label>
                            <p>{flight.flightId}</p>
                        </div>
                        <div>
                            <label>출발공항</label>
                            <p>{flight.startAirPort.airportName}</p>
                        </div>
                        <div>
                            <label>도착공항</label>
                            <p>{flight.endAirPort.airportName}</p>
                        </div>
                        <div>
                            <label>출발시간</label>
                            <p>{flight.startTime}</p>
                        </div>
                        <div>
                            <label>도착시간</label>
                            <p>{flight.endTime}</p>
                        </div>
                        <div>
                            <label>승객명</label>
                            <input
                                type="text"
                                value={memberData.memberName}
                                readOnly
                            />
                        </div>
                        <div>
                        <label>성별</label>
                            <input
                                type="text"
                                value={memberData.memberGender}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>생년월일</label>
                            <input
                                type="date"
                                value={memberData.birthDate}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>회원번호</label>
                            <input 
                                type="text"
                                value={memberData.memberCode}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>연락처</label>
                            <input
                                type="tel"
                                value={memberData.memberPhone}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>이메일</label>
                            <input
                                type="email"
                                value={memberData.memberEmail}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>좌석선택</label>
                            <input
                                type='text'
                                value={seat.seatNo}
                                readOnly
                            />
                            <button type='button' onClick={onChooseSeatHandler}>좌석 선택</button>
                        </div>
                        <div>
                            <label>기본 수하물 선택</label>
                            <select name='baggageAmount' value={baggageAmount} onChange={onBaggageChangeHandler}>
                                <option value="">갯수선택</option>
                                <option value="0">0개</option>
                                <option value="1">1개</option>
                            </select>
                        </div>
                        <div>
                            <label>추가 수하물 선택</label>
                            <select name="extraBaggageAmount" value={extraBaggageAmount} onChange={onExtraBaggageChangeHandler}>
                                <option value="">갯수선택</option>
                                <option value="0">0개</option>
                                <option value="1">1개</option>
                                <option value="2">2개</option>
                                <option value="3">3개</option>
                            </select>
                        </div>
                        <div>
                            <label>쿠폰 선택</label>
                            <select value={selectedCouponId} onChange={onChangeCouponHandler}>
                            <option value="">쿠폰을 선택하세요</option>
                            {Array.isArray(coupon) && coupon.length > 0 && coupon
                            // .filter(couponItem => couponItem.isPossible)
                            .map(couponItem => (
                                <option key={couponItem.couponId} value={couponItem.couponId}>
                                    쿠폰코드 : {couponItem.couponCode}, 할인금액 : {couponItem.discountAmount}, 할인율 : {couponItem.discountPercentage}%
                                </option>
                            ))}
                            </select>
                        </div>
                        <div>
                            <label>최종 금액</label>
                            {totalPrice > 0 &&
                            <input
                                value={totalPrice}
                                type="text"
                            />
                            }
                        </div>
                        <button type='button' onClick={onsubmitHandler}>항공편 예약</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistReservation;