import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetAllMembersAPI } from '../../apis/MemberAPICalls';
import '../../App.css';

const Members = () => {
    const dispatch = useDispatch();
    const members = useSelector(state => state.member.allMembers);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(callGetAllMembersAPI()).then(() => setLoading(false));
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!Array.isArray(members)) {
        return <p>회원 정보를 불러오는 데 문제가 발생했습니다.</p>;
    }

    return (
        <div className="members-container">
        <h1>전체 회원 조회</h1>
        <table className="members-table">
            <thead>
            <tr>
                <th>회원 코드</th>
                <th>아이디</th>
                <th>이름</th>
                <th>이메일</th>
                <th>성별</th>
                <th>생년월일</th>
                <th>휴대폰 번호</th>
            </tr>
            </thead>
            <tbody>
            {members.map(member => (
                <tr key={member.memberCode}>
                <td>{member.memberCode}</td>
                <td>{member.memberId}</td>
                <td>{member.memberName}</td>
                <td>{member.memberEmail}</td>
                <td>{member.memberGender}</td>
                <td>{member.birthDate}</td>
                <td>{member.memberPhone}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Members;
