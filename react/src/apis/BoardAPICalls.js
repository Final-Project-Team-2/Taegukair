import {
    POST_BOARD
} from '../modules/BoardModule';

export const callRegisterAPI = ({form}) => {
    const requestURL = `http://localhost:8080/api/v1/boards`;

    return async (dispatch, getState) => {

        console.log('Request URL : ', requestURL);
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
                title : form.title,
                content : form.content,
                status : false,
                answer : null,
                submissionDate : form.submissionDate
            })
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callGetMemberAPI RESULT : ', result);

        dispatch({ type : POST_BOARD, payload : result});
    };
}