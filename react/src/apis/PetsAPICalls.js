import { GET_PETS, UPDATE_PET, ADD_PET, DELETE_PET } from '../modules/PetsModule';

export const callGetPetsAPI = ({ memberId }) => {
    const requestURL = `http://localhost:8080/api/pet/member/${memberId}`;

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
            dispatch({ type: GET_PETS, payload: result });
        } catch (error) {
            console.error('Failed to fetch pets details:', error);
        }
    };
}

export const callUpdatePetAPI = ({ form }) => {
    const requestURL = `http://localhost:8080/api/pet/${form.petId}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify(form)
            });

            const result = await response.json();
            dispatch({ type: UPDATE_PET, payload: result });
        } catch (error) {
            console.error('Failed to update pet details:', error);
        }
    };
}

export const callAddPetAPI = ({ form }) => {
    const requestURL = `http://localhost:8080/api/pet`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify(form)
            });

            const result = await response.json();
            console.log('Add Pet Response:', result);
            dispatch({ type: ADD_PET, payload: result });
        } catch (error) {
            console.error('Failed to add pet details:', error);
        }
    };
}

export const callDeletePetAPI = ({ id }) => {
    const requestURL = `http://localhost:8080/api/pet/${id}`;

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

            dispatch({ type: DELETE_PET, payload: id });
        } catch (error) {
            console.error('Failed to delete pet details:', error);
        }
    };
}
