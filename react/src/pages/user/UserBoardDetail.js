import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callFetchUserBoardDetail } from '../../apis/BoardAPICalls';
import './UserBoardDetail.css'; // CSS 파일 추가

const UserBoardDetail = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const boardDetail = useSelector(state => state.board.boardDetail);
    
    useEffect(() => {
        dispatch(callFetchUserBoardDetail(boardId));
    }, [dispatch, boardId]);

    return (
        <div className="board-detail-container">
            <h1>고객의 말씀 상세조회</h1>
            {boardDetail ? (
                <div className="board-detail">
                    <div className="detail-field">
                        <label>제목:</label>
                        <span>{boardDetail.title}</span>
                    </div>
                    <div className="detail-field">
                        <label>내용:</label>
                        <span>{boardDetail.content}</span>
                    </div>
                    <div className="detail-field">
                        <label>작성일:</label>
                        <span>{boardDetail.submissionDate}</span>
                    </div>
                    <div className="detail-field large-field">
                        <label>답변:</label>
                        <span>{boardDetail.answer ? boardDetail.answer : '아직 답변 전입니다..'}</span>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserBoardDetail;
