import { GET_FAMILY, UPDATE_FAMILY, ADD_FAMILY, DELETE_FAMILY } from '../modules/FamilyModule';

export const callGetFamilyAPI = ({ memberId }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/family/member/${memberId}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            const result = await response.json();
            dispatch({ type: GET_FAMILY, payload: result });
        } catch (error) {
            console.error('Failed to fetch family details:', error);
        }
    };
}

export const callAddFamilyAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/family`;

    return async (dispatch, getState) => {
        try {
            const memberCode = form.memberCode || localStorage.getItem('memberCode');
            console.log('Adding family with data:', { ...form, memberCode }); // 디버깅용 로그 추가
            const response = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify({ ...form, memberCode }) // memberCode 추가
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Add Family Response:', result);
            dispatch({ type: ADD_FAMILY, payload: result });
        } catch (error) {
            console.error('Failed to add family details:', error);
        }
    };
}

export const callUpdateFamilyAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/family/${form.familyUserId}`;

    const updatedForm = {
        ...form,
        familyBirthDate: form.familyBirthDate ? form.familyBirthDate.replace(/-/g, '') : null
    };

    return async (dispatch, getState) => {
        try {
            const memberCode = form.memberCode || localStorage.getItem('memberCode');
            console.log('Updating family with data:', { ...updatedForm, memberCode }); // 디버깅용 로그 추가
            const response = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify({ ...updatedForm, memberCode }) // memberCode 추가
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Update Family Response:', result);
            dispatch({ type: UPDATE_FAMILY, payload: result });
        } catch (error) {
            console.error('Failed to update family details:', error);
        }
    };
}




export const callDeleteFamilyAPI = ({ id }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/family/${id}`;

    return async (dispatch, getState) => {
        try {
            await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            dispatch({ type: DELETE_FAMILY, payload: id });
        } catch (error) {
            console.error('Failed to delete family details:', error);
        }
    };
}
