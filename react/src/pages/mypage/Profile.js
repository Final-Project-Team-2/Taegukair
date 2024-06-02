import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetMemberAPI, callUpdateMemberAPI } from '../../apis/MemberAPICalls';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
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
    const token = decodeJwt(accessToken);
    const memberDetail = member?.memberData;

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

    useEffect(() => {
        if (token && token.sub) {
            console.log('Dispatching callGetMemberAPI with memberId:', token.sub);
            dispatch(callGetMemberAPI({ memberId: token.sub }));
        } else {
            console.error("Token is null or invalid");
        }
    }, [dispatch, token.sub]);

    useEffect(() => {
        if (memberDetail && memberDetail.data) {
            setFormData({
                memberCode: memberDetail.data.memberCode, // memberCode 추가
                memberId: memberDetail.data.memberId,
                memberName: memberDetail.data.memberName,
                memberEmail: memberDetail.data.memberEmail,
                birthDate: memberDetail.data.birthDate, // 올바른 형식으로 설정
                memberPhone: memberDetail.data.memberPhone
            });
        }
    }, [memberDetail]);

    if (!memberDetail || !memberDetail.data) {
        return <p>Loading...</p>;
    }

    const { memberCode, memberId, memberName, memberEmail, birthDate, memberPhone } = formData;

    return (
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
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
            </div>
        </div>
    );
}

export default Profile;
