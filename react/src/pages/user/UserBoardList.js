import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFetchUserBoards } from '../../apis/BoardAPICalls';
import { useNavigate } from 'react-router-dom';

const UserBoardList = () => {
    const dispatch = useDispatch();
    const boards = useSelector(state => state.board.boards || []); // 초기 상태를 빈 배열로 설정
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callFetchUserBoards());
    }, [dispatch]);

    const handleRowClick = (boardId) => {
        navigate(`/main/user/board/${boardId}`);
    };

    return (
        <div className="table-container">
            <h1>내가 작성한 고객의 말씀</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>내용</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(boards) && boards.map(board => (
                        <tr key={board.boardId} onClick={() => handleRowClick(board.boardId)} style={{ cursor: 'pointer' }}>
                            <td>{board.title}</td>
                            <td>{board.content.length > 100 ? board.content.substring(0, 100) + '...' : board.content}</td>
                            <td>{board.answer == null ? '미답변' : '답변완료'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserBoardList;
