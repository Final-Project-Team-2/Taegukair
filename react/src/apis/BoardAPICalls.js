import { POST_BOARD, FETCH_USER_BOARDS, FETCH_USER_BOARD_DETAIL } from '../modules/BoardModule';

// JWT 디코드 함수
function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const callRegisterAPI = ({ form, navigate }) => {
    const requestURL = `http://localhost:8080/api/v1/boards`;

    return async (dispatch, getState) => {
        const memberCode = localStorage.getItem('memberCode'); // memberCode를 로컬 스토리지에서 가져옴
        const accessToken = localStorage.getItem('accessToken'); // accessToken 가져오기

        if (!memberCode || !accessToken) {
            console.error('No memberCode or accessToken found in localStorage');
            return;
        }

        const tokenPayload = decodeJwt(accessToken);
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
                author: author // 사용자 아이디 추가
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
        
        navigate('/main/user/boards'); // 사용자가 작성한 글 조회 페이지로 이동
    };
}

export const callFetchUserBoards = () => {
    const requestURL = `http://localhost:8080/api/v1/boards/user`;

    return async (dispatch, getState) => {
        const memberCode = localStorage.getItem('memberCode'); // memberCode를 로컬 스토리지에서 가져옴
        const accessToken = localStorage.getItem('accessToken'); // accessToken 가져오기

        if (!memberCode || !accessToken) {
            console.error('No memberCode or accessToken found in localStorage');
            return;
        }

        console.log('Request URL: ', requestURL);
        const result = await fetch(`${requestURL}/${memberCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${accessToken}` // Authorization 헤더 추가
            }
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callFetchUserBoards RESULT: ', result);

        dispatch({ type: FETCH_USER_BOARDS, payload: result });
    };
}

export const callFetchUserBoardDetail = (boardId) => {
    const requestURL = `http://localhost:8080/api/v1/boards`;

    return async (dispatch, getState) => {
        const accessToken = localStorage.getItem('accessToken'); // accessToken 가져오기

        if (!accessToken) {
            console.error('No accessToken found in localStorage');
            return;
        }

        console.log('Request URL: ', `${requestURL}/${boardId}`);
        const result = await fetch(`${requestURL}/${boardId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${accessToken}` // Authorization 헤더 추가
            }
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callFetchUserBoardDetail RESULT: ', result);

        dispatch({ type: FETCH_USER_BOARD_DETAIL, payload: result });
    };
}
