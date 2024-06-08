import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetMemberAPI, callUpdateMemberAPI } from '../../apis/MemberAPICalls';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.member.memberData);
    // 로그아웃을 했을때 토큰의 정보가 없을 때 로그인 안내 문자가 오는데 랜더링을 확인해주는 state
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        memberCode: '',
        memberId: '',
        memberName: '',
        memberEmail: '',
        birthDate: '',
        memberPhone: ''
    });
    const accessToken = window.localStorage.getItem("accessToken");
    const token = accessToken ? decodeJwt(accessToken) : null;


    useEffect(() => {
        const checkTokenAndFetchData = async () => {
            if (!token) {
                alert("로그인이 필요합니다");
                navigate('/login');
                return;
            }

            if (token && token.sub && !hasFetchedData) {
                try {
                    await dispatch(callGetMemberAPI({ memberId: token.sub }));
                    setHasFetchedData(true); // 데이터 가져오기 성공 시 상태 업데이트
                } catch (error) {
                    console.error("Failed to fetch member data:", error);
                    alert("회원 정보를 가져오는 데 실패했습니다. 다시 로그인해 주세요.");
                    navigate('/login');
                }
            }
        };

        checkTokenAndFetchData();
    }, [dispatch, token, hasFetchedData, navigate]);

    useEffect(() => {
        if (member && member.data) {
            setFormData({
                memberCode: member.data.memberCode,
                memberId: member.data.memberId,
                memberName: member.data.memberName,
                memberEmail: member.data.memberEmail,
                birthDate: member.data.birthDate,
                memberPhone: member.data.memberPhone
            });
        }
    }, [member]);

    const onClickBackHandler = () => {
        navigate(-1);
    };

    const onClickEditHandler = () => {
        setIsEditing(true);
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onClickSaveHandler = () => {
        dispatch(callUpdateMemberAPI({ form: formData })).then(() => {
            dispatch(callGetMemberAPI({ memberId: token.sub }));
            setIsEditing(false);
        });
    };

    const onClickCouponRegisterHandler = () => {
        navigate('/coupon-register');
    };

    const onClickTicketHandler = () => {
        navigate('/reservation-tickets');
    };

    if (!member || !member.data) {
        return <p>Loading...</p>;
    }

    const { memberId, memberName, memberEmail, birthDate, memberPhone } = formData;

    return (
        <div className='Profile'>
            <div className='boxcenter'>
                <button
                    onClick={onClickCouponRegisterHandler}
                    style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white', marginTop: '10px' }}
                >
                    쿠폰 등록
                </button>
                <button
                    onClick={onClickTicketHandler}
                    style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white', marginTop: '10px', marginLeft: '10px' }}
                >
                    예약 티켓 확인
                </button>

                <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                    <h1>내 정보</h1>
                    <input 
                        type="text" 
                        placeholder="아이디" 
                        readOnly={!isEditing}
                        name="memberId"
                        value={memberId || ''}
                        onChange={onChangeHandler}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                    />
                    <input 
                        type="text" 
                        placeholder="이름" 
                        readOnly={!isEditing}
                        name="memberName"
                        value={memberName || ''}
                        onChange={onChangeHandler}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                    />
                    <input 
                        type="text" 
                        placeholder="이메일" 
                        readOnly={!isEditing}
                        name="memberEmail"
                        value={memberEmail || ''}
                        onChange={onChangeHandler}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                    />
                    <input 
                        type="text" 
                        placeholder="생년월일" 
                        readOnly={!isEditing}
                        name="birthDate"
                        value={birthDate || ''}
                        onChange={onChangeHandler}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                    />
                    <input 
                        type="text" 
                        placeholder="휴대폰 번호" 
                        readOnly={!isEditing}
                        name="memberPhone"
                        value={memberPhone || ''}
                        onChange={onChangeHandler}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                    />
                    {isEditing ? (
                        <button
                            onClick={onClickSaveHandler}
                            style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white' }}
                        >
                            저장
                        </button>
                    ) : (
                        <button
                            onClick={onClickEditHandler}
                            style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white' }}
                        >
                            수정
                        </button>
                    )}
                    <button
                        onClick={onClickBackHandler}
                        style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white', marginTop: '10px' }}
                    >
                        돌아가기
                    </button>
                    <button
                        onClick={() => navigate('/family')}
                        style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white', marginTop: '10px' }}
                    >
                        가족 관리
                    </button>
                    <button
                        onClick={() => navigate('/pets')}
                        style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white', marginTop: '10px' }}
                    >
                        반려동물 관리
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
