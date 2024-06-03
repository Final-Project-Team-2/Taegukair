import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetPetsAPI, callUpdatePetAPI, callAddPetAPI, callDeletePetAPI } from '../../apis/PetsAPICalls';

function Pets() {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pets.petsData);
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({});
    const accessToken = window.localStorage.getItem("accessToken");
    const token = decodeJwt(accessToken);
    const memberCode = token && token.memberCode ? token.memberCode : localStorage.getItem("memberCode");

    useEffect(() => {
        console.log("Decoded token:", token);
        console.log("Member code from token:", memberCode);
    }, [token]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onClickSaveHandler = () => {
        if (isEditing !== null) {
            const updatedPet = { 
                ...formData, 
                petId: parseInt(formData.petId),
                memberCode 
            };
            console.log("Updating pet with data:", updatedPet);
            dispatch(callUpdatePetAPI({ form: updatedPet })).then(() => {
                dispatch(callGetPetsAPI({ memberId: token.sub }));
                setIsEditing(null);
                setFormData({});
            });
        } else if (isAdding) {
            const newPet = { 
                ...formData,
                memberCode 
            };
            console.log("Adding new pet with data:", newPet);
            dispatch(callAddPetAPI({ form: newPet })).then(() => {
                dispatch(callGetPetsAPI({ memberId: token.sub }));
                setIsAdding(false);
                setFormData({});
            });
        }
    };

    const onClickDeleteHandler = (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            dispatch(callDeletePetAPI({ id })).then(() => {
                dispatch(callGetPetsAPI({ memberId: token.sub }));
            });
        }
    };

    const onClickEditHandler = (pet) => {
        setIsEditing(pet.petId);
        setFormData(pet);
    };

    const onClickCancelHandler = () => {
        setIsAdding(false);
        setFormData({});
    };

    useEffect(() => {
        if (token && token.sub) {
            dispatch(callGetPetsAPI({ memberId: token.sub }));
        }
    }, [dispatch, token.sub]);

    return (
        <div>
            <h1>반려동물 관리</h1>
            {pets && pets.length > 0 && (
                <div>
                    {pets.map(pet => (
                        <div key={pet.petId} style={{ marginBottom: '10px' }}>
                            <input 
                                type="text" 
                                placeholder="반려동물 이름" 
                                readOnly={isEditing !== pet.petId}
                                name="petName"
                                value={isEditing === pet.petId ? formData.petName : pet.petName}
                                onChange={onChangeHandler}
                                style={{ display: 'block', marginBottom: '5px' }}
                            />
                            <input 
                                type="text" 
                                placeholder="종" 
                                readOnly={isEditing !== pet.petId}
                                name="species"
                                value={isEditing === pet.petId ? formData.species : pet.species}
                                onChange={onChangeHandler}
                                style={{ display: 'block', marginBottom: '5px' }}
                            />
                            <input 
                                type="text" 
                                placeholder="품종" 
                                readOnly={isEditing !== pet.petId}
                                name="breed"
                                value={isEditing === pet.petId ? formData.breed : pet.breed}
                                onChange={onChangeHandler}
                                style={{ display: 'block', marginBottom: '5px' }}
                            />
                            {isEditing === pet.petId ? (
                                <button onClick={onClickSaveHandler}>저장</button>
                            ) : (
                                <button onClick={() => onClickEditHandler(pet)}>수정</button>
                            )}
                            <button onClick={() => onClickDeleteHandler(pet.petId)}>삭제</button>
                        </div>
                    ))}
                </div>
            )}
            {isAdding && (
                <div style={{ marginTop: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="반려동물 이름" 
                        name="petName"
                        value={formData.petName || ''}
                        onChange={onChangeHandler}
                        style={{ display: 'block', marginBottom: '5px' }}
                    />
                    <input 
                        type="text" 
                        placeholder="종" 
                        name="species"
                        value={formData.species || ''}
                        onChange={onChangeHandler}
                        style={{ display: 'block', marginBottom: '5px' }}
                    />
                    <input 
                        type="text" 
                        placeholder="품종" 
                        name="breed"
                        value={formData.breed || ''}
                        onChange={onChangeHandler}
                        style={{ display: 'block', marginBottom: '5px' }}
                    />
                    <button onClick={onClickSaveHandler}>추가</button>
                    <button onClick={onClickCancelHandler} style={{ marginLeft: '10px' }}>취소</button>
                </div>
            )}
            {!isAdding && (
                <button onClick={() => {
                    setFormData({});
                    setIsAdding(true);
                    setIsEditing(null);
                }} style={{ marginTop: '10px' }}>
                    반려동물 추가
                </button>
            )}
        </div>
    );
}

export default Pets;
