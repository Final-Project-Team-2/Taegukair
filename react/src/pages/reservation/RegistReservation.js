import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    callPostReservationAPI
} from '../../apis/ReservationAPICalls'

const RegistReservation = () => {

    const member = useSelector(state => state.memberReducer);

    const dispatch = useDispatch();

    const [form, setForm] = useState({

        reservationNo: "",
        flight: 0,
        seat: 0,
        coupon: 0,
        baggageAmount: 0,
        baggagePrice: 0,
        reservationDate: null,
        reservationTotalPrice: 0

    });

    const [extraBaggageAmount, setExtraBaggageAmount] = useState(0);

    const [baggagePrice, setBaggagePrice] = useState(null);

    useEffect(
    () => {},
    []
    );

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
                                value={member.memberName}
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
                                value={member.birthDate}
                                // onChange={(e) => setMemberIdInput(e.target.value)}
                                // placeholder="Member ID"
                            />
                        </div>
                        <div>
                            <label>회원번호</label>
                            <input 
                                type="text"
                                value={member.memberCode}
                                // onChange={(e) => setMemberIdInput(e.target.value)}
                                // placeholder="Member ID"
                            />
                        </div>
                        <div>
                            <label>연락처</label>
                            <input
                                type="tel"
                                value={member.memberPhone}
                                // onChange={(e) => setMemberIdInput(e.target.value)}
                                // placeholder="Member ID"
                            />
                        </div>
                        <div>
                            <label>이메일</label>
                            <input
                                type="email"
                                value={member.memberPhone}
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
                            <select value={baggageAmount} onChange={onChangeHandler}>
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
                            <input></input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistReservation;