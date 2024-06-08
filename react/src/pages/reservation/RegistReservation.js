import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import './RegistReservation.css';
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

    const departureFlight = location.state.departureFlight || {};

    const returnFlight = location.state.returnFlight || {};

    const initialDepartureSeat = location.state.initialDepartureSeat || {};

    const initialReturnSeat = location.state.initialReturnSeat || {};

    const coupon = useSelector(state => state.coupon);

    const member = useSelector(state => state.member.memberData);

    const accessToken = window.localStorage.getItem("accessToken");
    const token = decodeJwt(accessToken);

    const dispatch = useDispatch();

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

    const [returnBaggageAmount, setReturnBaggageAmount] = useState();

    const [returnExtraBaggageAmount, setReturnExtraBaggageAmount] = useState();

    const [returnBaggagePrice, setReturnBaggagePrice] = useState();

    const [selectedCouponId, setSelectedCouponId] = useState(0);

    const [selectedCoupon, setSelectedCoupon] = useState({});

    const [sumPrice, setSumPrice] = useState(null);

    const [returnSumPrice, setReturnSumPrice] = useState(null);

    const [totalPrice, setTotalPrice] = useState(null);

    const calculateSumPrice = () => {
        if (departureFlight.flightPrice) {
            let price = departureFlight.flightPrice;
            if (baggagePrice) {
                price += baggagePrice;
            }
            if (initialDepartureSeat.seatId) {
                price += (initialDepartureSeat.seatType.seatTypePrice + initialDepartureSeat.seatClass.seatClassPrice);
            }
            setSumPrice(price);
        } else {
            setSumPrice(null);
        }
    };

    const calculateReturnSumPrice = () => {
        if (returnFlight.flightPrice) {
            let price = returnFlight.flightPrice;
            if (returnBaggagePrice) {
                price += returnBaggagePrice;
            }
            if (initialReturnSeat.seatId) {
                price += (initialReturnSeat.seatType.seatTypePrice + initialReturnSeat.seatClass.seatClassPrice);
            }
            setReturnSumPrice(price);
        } else {
            setReturnSumPrice(null);
        }
    };

    const calculateTotalPrice = () => {
        let price = sumPrice;
    
        if (Object.keys(returnFlight).length !== 0) {
            price += returnSumPrice;
        }
    
        if (selectedCoupon != null) {
            if (selectedCoupon.discountAmount) {
                price -= selectedCoupon.discountAmount;
            } else if (selectedCoupon.discountPercentage) {
                price *= (1 - selectedCoupon.discountPercentage / 100);
            }
        }
    
        setTotalPrice(price);
    };

    useEffect(() => {
        calculateSumPrice();
    }, [departureFlight.flightPrice, initialDepartureSeat, baggagePrice, ]);
    
    useEffect(() => {
        calculateReturnSumPrice();
    }, [returnFlight.flightPrice, initialReturnSeat, returnBaggagePrice]);

    useEffect(() => {
        calculateTotalPrice();
    }, [sumPrice, returnSumPrice, selectedCoupon]);

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

    const onReturnBaggageChangeHandler = (e) => {
        const amount = e.target.value;
        if (amount !== returnBaggageAmount) {
            setReturnBaggageAmount(amount);
        }
    };

    const onExtraBaggageChangeHandler = (e) => {
        const amount = e.target.value;
        if (amount !== extraBaggageAmount) {
            setExtraBaggageAmount(amount);
            setBaggagePrice(amount * 10000);
        }
    };

    const onReturnExtraBaggageChangeHandler = (e) => {
        const amount = e.target.value;
        if (amount !== returnExtraBaggageAmount) {
            setReturnExtraBaggageAmount(amount);
            setReturnBaggagePrice(amount * 10000);
        }
    };

    const onChooseSeatHandler = () => {
        navigate('chooseSeat', {
            state: { 
                departureFlight : departureFlight,
                returnFlight: returnFlight,
            }
        });
    };

    const onsubmitHandler = async () => {
        const updatedDepartureForm = {
            reservationNo: "",
            member: Number(member.data.memberCode),
            flight: Number(departureFlight.flightId),
            seat: Number(initialDepartureSeat.seatId),
            coupon: Number(selectedCouponId) || null,
            baggageAmount: Number(baggageAmount),
            extraBaggageAmount: Number(extraBaggageAmount),
            baggagePrice: Number(baggagePrice),
            reservationDate: "",
            reservationTotalPrice: returnSumPrice == null 
            ? selectedCoupon
                ? selectedCoupon.discountAmount
                    ? Number(sumPrice - selectedCoupon.discountAmount)
                    : Number(sumPrice * (1 - selectedCoupon.discountPercentage / 100))
                : Number(sumPrice)
            : Number(totalPrice)
        };
        
        let updatedReturnForm = null;

        if ((Object.keys(returnFlight).length !== 0)) {
            updatedReturnForm = {
                reservationNo: "",
                member: Number(member.data.memberCode),
                flight: Number(returnFlight.flightId),
                seat: Number(initialReturnSeat.seatId),
                coupon: Number(selectedCouponId) || null,
                baggageAmount: Number(returnBaggageAmount),
                extraBaggageAmount: Number(returnExtraBaggageAmount),
                baggagePrice: Number(returnBaggagePrice),
                reservationDate: "",
                reservationTotalPrice: selectedCoupon
                ? selectedCoupon.discountAmount
                    ? Number(returnSumPrice - (selectedCoupon.discountAmount / 2))
                    : Number(returnSumPrice * (1 - selectedCoupon.discountPercentage / 100))
                : Number(returnSumPrice)
            };
        }

        try {
            console.log("updatedDepartureForm: ", updatedDepartureForm);
            await dispatch(callPostReservationAPI(updatedDepartureForm));
    
            if (updatedReturnForm && updatedReturnForm.flight !== 0) {
                console.log("updatedReturnForm: ", updatedReturnForm);
                await dispatch(callPostReservationAPI(updatedReturnForm));
            }
    
            alert("예약이 완료되었습니다");
            navigate("/");
        } catch (error) {
            alert("예약 정보를 저장하던 중 오류가 발생했습니다");
            navigate("/");
        }
    };

    if (!member || !member.data) {
        return <p>Loading...</p>;
    }

    if(initialDepartureSeat.seatId) {
        console.log("seat :", initialDepartureSeat);
    }

    if(initialReturnSeat.seatId) {
        console.log("seat :", initialReturnSeat);
    }

    return (
        <div>
            <br/>
                <div>
                    <div>
                        <div className='departureFlightInfo'>
                            <div className='infoItem'>
                                <label>항공편 번호</label>
                                <p>{departureFlight.flightId}</p>
                            </div>
                            <div className='infoItem'>
                                <label>출발공항</label>
                                <p>{departureFlight.startAirPort.airportName}</p>
                            </div>
                            <div className='infoItem'>
                                <label>도착공항</label>
                                <p>{departureFlight.endAirPort.airportName}</p>
                            </div>
                            <div className='infoItem'>
                                <label>출발시간</label>
                                <p>{departureFlight.startTime}</p>
                            </div>
                            <div className='infoItem'>
                                <label>도착시간</label>
                                <p>{departureFlight.endTime}</p>
                            </div>
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
                        {Object.keys(returnFlight).length > 0 && (
                            <>
                            <div className='returnFlightInfo'>
                                <div className='infoItem'>
                                    <label>항공편 번호</label>
                                    <p>{returnFlight.flightId}</p>
                                </div>
                                <div className='infoItem'>
                                    <label>출발공항</label>
                                    <p>{returnFlight.startAirPort.airportName}</p>
                                </div>
                                <div className='infoItem'>
                                    <label>도착공항</label>
                                    <p>{returnFlight.endAirPort.airportName}</p>
                                </div>
                                <div className='infoItem'>
                                    <label>출발시간</label>
                                    <p>{returnFlight.startTime}</p>
                                </div>
                                <div className='infoItem'>
                                    <label>도착시간</label>
                                    <p>{returnFlight.endTime}</p>
                                </div>
                            </div>
                            <div>
                                <label>기본 수하물 선택</label>
                                <select name='returnBaggageAmount' value={returnBaggageAmount} onChange={onReturnBaggageChangeHandler}>
                                    <option value="">갯수선택</option>
                                    <option value="0">0개</option>
                                    <option value="1">1개</option>
                                </select>
                            </div>
                            <div>
                                <label>추가 수하물 선택</label>
                                <select name="returnExtraBaggageAmount" value={returnExtraBaggageAmount} onChange={onReturnExtraBaggageChangeHandler}>
                                    <option value="">갯수선택</option>
                                    <option value="0">0개</option>
                                    <option value="1">1개</option>
                                    <option value="2">2개</option>
                                    <option value="3">3개</option>
                                </select>
                            </div>
                            </>
                        )}

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
                            <label>{returnFlight ? '출발 항공편 좌석 번호' : '좌석 번호'}</label>
                            <input
                                type='text'
                                value={initialDepartureSeat.seatNo}
                                readOnly
                            />
                        </div>
                        { Object.keys(returnFlight).length > 0 ?
                        <>
                        <div>
                            <label>도착 항공편 좌석 번호</label>
                            <input
                                type='text'
                                value={initialReturnSeat.seatNo}
                                readOnly
                            />
                            <br/>
                            <button type='button' onClick={onChooseSeatHandler}>좌석 선택</button>
                        </div>
                        </>
                        : <button type='button' onClick={onChooseSeatHandler}>좌석 선택</button>

                        }
                        <div>
                            <label>쿠폰 선택</label>
                            <select value={selectedCouponId} onChange={onChangeCouponHandler}>
                            <option value="">쿠폰을 선택하세요</option>
                            {Array.isArray(coupon) && coupon.length > 0 && coupon
                            .filter(couponItem => couponItem.possible === true)
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
        </div>
    );
}

export default RegistReservation;