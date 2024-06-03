import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import {
    callPostReservationAPI
} from '../../apis/ReservationAPICalls';
import {
    callGetAllCouponsAPI
} from '../../apis/CouponAPICalls';
import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls';

const RegistReservation = () => {

    const coupon = useSelector(state => state.coupon);

    const member = useSelector(state => state.member.memberData);

    const accessToken = window.localStorage.getItem("accessToken");
    const token = decodeJwt(accessToken);

    const dispatch = useDispatch();

    const [form, setForm] = useState({

        reservationNo: "",
        flight: 0,
        seat: 0,
        baggageAmount: 0,
        baggagePrice: 0,
        reservationDate: null,
        reservationTotalPrice: 0

    });

    const [memberData, setMemberData] = useState({
        memberCode: '',
        memberId: '',
        memberName: '',
        memberEmail: '',
        birthDate: '',
        memberPhone: ''
    });

    const [extraBaggageAmount, setExtraBaggageAmount] = useState(0);

    const [baggagePrice, setBaggagePrice] = useState(0);

    useEffect(
    () => {
        dispatch(callGetAllCouponsAPI());
    },
    [dispatch]
    );

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
                memberEmail: member.data.memberEmail,
                birthDate: member.data.birthDate,
                memberPhone: member.data.memberPhone
            });
        }
    }, [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onExtraBaggageChangeHandler = (e) => {
        /* setBaggagePrice가 잘 적용되는지 확인할 것 */
        const amount = e.target.value;
    setExtraBaggageAmount(amount);
    setBaggagePrice(amount * 10000);
    };

    const onClickHandler = () => {
        dispatch(callPostReservationAPI(form));
    }

    if (!member || !member.data) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <br/>
            <form>
                <div>
                    <div>
                        <div>
                            <label>승객명</label>
                            <input
                                type="text"
                                value={memberData.memberName}
                                // onChange={(e) => setMemberIdInput(e.target.value)}
                                // placeholder="Member ID"
                            />
                        </div>
                        <div>
                            <label>성별</label>
                            <div>
                                <label>남자</label>
                            </div>
                            <div>
                                <label>여자</label>
                            </div>
                        </div>
                        <div>
                            <label>생년월일</label>
                            <input
                                type="date"
                                value={memberData.birthDate}
                                // onChange={(e) => setMemberIdInput(e.target.value)}
                                // placeholder="Member ID"
                            />
                        </div>
                        <div>
                            <label>회원번호</label>
                            <input 
                                type="text"
                                value={memberData.memberCode}
                                // onChange={(e) => setMemberIdInput(e.target.value)}
                                // placeholder="Member ID"
                            />
                        </div>
                        <div>
                            <label>연락처</label>
                            <input
                                type="tel"
                                value={memberData.memberPhone}
                                // onChange={(e) => setMemberIdInput(e.target.value)}
                                // placeholder="Member ID"
                            />
                        </div>
                        <div>
                            <label>이메일</label>
                            <input
                                type="email"
                                value={memberData.memberEmail}
                                // onChange={(e) => setMemberIdInput(e.target.value)}
                                // placeholder="Member ID"
                            />
                        </div>
                        <div>
                            <label>좌석선택</label>
                            <input/>
                        </div>
                        <div>
                            <label>기본 수하물 선택</label>
                            <select name='baggageAmount' onChange={onChangeHandler}>
                                <option value="0">0개</option>
                                <option value="1">1개</option>
                            </select>
                        </div>
                        <div>
                            <label>추가 수하물 선택</label>
                            <select value={extraBaggageAmount} onChange={onExtraBaggageChangeHandler}>
                                <option value="0">0개</option>
                                <option value="1">1개</option>
                                <option value="2">2개</option>
                                <option value="3">3개</option>
                            </select>
                        </div>
                        <div>
                            <label>쿠폰 선택</label>
                            <select>
                                
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistReservation;