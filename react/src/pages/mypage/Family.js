import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetFamilyAPI, callUpdateFamilyAPI, callAddFamilyAPI, callDeleteFamilyAPI } from '../../apis/FamilyAPICalls';

function Family() {
    const dispatch = useDispatch();
    const family = useSelector(state => state.family.familyData);
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({});
    const accessToken = window.localStorage.getItem("accessToken");
    const token = decodeJwt(accessToken);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onClickSaveHandler = () => {
        if (isEditing !== null) {
            dispatch(callUpdateFamilyAPI({ form: formData })).then(() => {
                dispatch(callGetFamilyAPI({ memberId: token.sub }));
                setIsEditing(null);
                setFormData({});
            });
        } else if (isAdding) {
            const newFamily = { ...formData, memberCode: token.sub };
            dispatch(callAddFamilyAPI({ form: newFamily })).then(() => {
                dispatch(callGetFamilyAPI({ memberId: token.sub }));
                setIsAdding(false);
                setFormData({});
            });
        }
    };

    const onClickDeleteHandler = (id) => {
        dispatch(callDeleteFamilyAPI({ id })).then(() => {
            dispatch(callGetFamilyAPI({ memberId: token.sub }));
        });
    };

    const onClickEditHandler = (familyMember) => {
        setIsEditing(familyMember.familyUserId);
        setFormData(familyMember);
    };

    useEffect(() => {
        if (token && token.sub) {
            dispatch(callGetFamilyAPI({ memberId: token.sub }));
        }
    }, [dispatch, token.sub]);

    return (
        <div>
            <h1>가족 관리</h1>
            {family && family.length > 0 && (
                <div>
                    {family.map(familyMember => (
                        <div key={familyMember.familyUserId}>
                            <input 
                                type="text" 
                                placeholder="가족 ID" 
                                readOnly={isEditing !== familyMember.familyUserId}
                                name="familyUserId"
                                value={isEditing === familyMember.familyUserId ? formData.familyUserId : familyMember.familyUserId}
                                onChange={onChangeHandler}
                            />
                            <input 
                                type="text" 
                                placeholder="가족 이름" 
                                readOnly={isEditing !== familyMember.familyUserId}
                                name="familyName"
                                value={isEditing === familyMember.familyUserId ? formData.familyName : familyMember.familyName}
                                onChange={onChangeHandler}
                            />
                            <input 
                                type="text" 
                                placeholder="가족 관계" 
                                readOnly={isEditing !== familyMember.familyUserId}
                                name="familyRelation"
                                value={isEditing === familyMember.familyUserId ? formData.familyRelation : familyMember.familyRelation}
                                onChange={onChangeHandler}
                            />
                            <input 
                                type="text" 
                                placeholder="생년월일" 
                                readOnly={isEditing !== familyMember.familyUserId}
                                name="familyBirthDate"
                                value={isEditing === familyMember.familyUserId ? formData.familyBirthDate : familyMember.familyBirthDate}
                                onChange={onChangeHandler}
                            />
                            <input 
                                type="text" 
                                placeholder="휴대폰 번호" 
                                readOnly={isEditing !== familyMember.familyUserId}
                                name="familyPhone"
                                value={isEditing === familyMember.familyUserId ? formData.familyPhone : familyMember.familyPhone}
                                onChange={onChangeHandler}
                            />
                            {isEditing === familyMember.familyUserId ? (
                                <button onClick={onClickSaveHandler}>저장</button>
                            ) : (
                                <button onClick={() => onClickEditHandler(familyMember)}>수정</button>
                            )}
                            <button onClick={() => onClickDeleteHandler(familyMember.familyUserId)}>삭제</button>
                        </div>
                    ))}
                </div>
            )}
            {(isAdding || isEditing === null) && (
                <div>
                    <input 
                        type="text" 
                        placeholder="가족 ID" 
                        name="familyUserId"
                        value={formData.familyUserId || ''}
                        onChange={onChangeHandler}
                    />
                    <input 
                        type="text" 
                        placeholder="가족 이름" 
                        name="familyName"
                        value={formData.familyName || ''}
                        onChange={onChangeHandler}
                    />
                    <input 
                        type="text" 
                        placeholder="가족 관계" 
                        name="familyRelation"
                        value={formData.familyRelation || ''}
                        onChange={onChangeHandler}
                    />
                    <input 
                        type="text" 
                        placeholder="생년월일" 
                        name="familyBirthDate"
                        value={formData.familyBirthDate || ''}
                        onChange={onChangeHandler}
                    />
                    <input 
                        type="text" 
                        placeholder="휴대폰 번호" 
                        name="familyPhone"
                        value={formData.familyPhone || ''}
                        onChange={onChangeHandler}
                    />
                    <button onClick={onClickSaveHandler}>추가</button>
                </div>
            )}
            <button onClick={() => {
                setFormData({});
                setIsAdding(true);
                setIsEditing(null);
            }}>
                가족 추가
            </button>
        </div>
    );
}

export default Family;
