import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetMemberAPI } from '../../apis/MemberAPICalls';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const accessToken = window.localStorage.getItem("accessToken");
    const token = decodeJwt(accessToken);
    const memberDetail = member?.memberData;

    const onClickBackHandler = () => {
        navigate(-1); // 돌아가기 클릭 시 이전 페이지로 이동
    };

    useEffect(() => {
        console.log('Access Token:', accessToken);
        console.log('Decoded Token:', token);
        if (token && token.sub) {
            console.log('Dispatching callGetMemberAPI with memberId:', token.sub);
            dispatch(callGetMemberAPI({ memberId: token.sub }));
        } else {
            console.error("Token is null or invalid");
        }
    }, [dispatch, token.sub]);

    useEffect(() => {
        console.log('memberDetail:', memberDetail);
    }, [memberDetail]);

    if (!memberDetail || !memberDetail.data) {
        return <p>Loading...</p>;
    }

    const { memberId, memberName, memberEmail } = memberDetail.data;

    return (
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
            <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                <h1>내 정보</h1>
                <input 
                    type="text" 
                    placeholder="아이디" 
                    readOnly
                    value={memberId || ''}
                    style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                />
                <input 
                    type="text" 
                    placeholder="이름" 
                    readOnly
                    value={memberName || ''}
                    style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                />
                <input 
                    type="text" 
                    placeholder="이메일" 
                    readOnly
                    value={memberEmail || ''}
                    style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                />
                <button
                    onClick={onClickBackHandler}
                    style={{ border: 'none', padding: '10px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#282c34', color: 'white' }}
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default Profile;
