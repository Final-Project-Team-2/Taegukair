import {
    POST_BOARD
} from '../modules/BoardModule';

export const callRegisterAPI = ({ form, navigate }) => {
    const requestURL = `http://localhost:8080/api/v1/boards`;

    return async (dispatch, getState) => {
        const memberCode = localStorage.getItem('memberCode'); // memberCode를 로컬 스토리지에서 가져옴
        const accessToken = localStorage.getItem('accessToken'); // accessToken 가져오기

        if (!memberCode || !accessToken) {
            console.error('No memberCode or accessToken found in localStorage');
            return;
        }

        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
        const roles = tokenPayload.auth; // auth 배열 확인
        const role = roles[0]; // 첫 번째 역할을 가져옴
        const author = tokenPayload.sub; // 토큰에서 사용자 아이디 추출

        console.log('Request URL: ', requestURL);
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${accessToken}` // Authorization 헤더 추가
            },
            
            body: JSON.stringify({
                title: form.title,
                content: form.content,
                memberCode: memberCode,
                author: author
            })
            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });

        console.log('[BoardAPICalls] callRegisterAPI RESULT: ', result);

        dispatch({ type: POST_BOARD, payload: result });

        alert('고객의 말씀이 등록되었습니다.');

        const isLogin = window.localStorage.getItem('accessToken');
        let decoded = null;

        if(isLogin !== undefined && isLogin !== null) {
            const temp = decodeJwt(window.localStorage.getItem("accessToken"));
            console.log('temp.auth : ' + temp.auth);
            decoded = temp.auth[1];
        }
        
        
    };
}
