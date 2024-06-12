import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // Add this line to import the CSS file

function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true); // Loading 상태 추가
  const navigate = useNavigate(); // navigate 추가

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boards/${id}`)
      .then(response => {
        const boardData = response.data;
        setBoard(boardData);
        setAnswer(boardData.answer || '');
        setLoading(false); // 데이터 로드 완료 후 loading 상태 업데이트
      })
      .catch(error => {
        console.error('There was an error fetching the board data!', error);
        setLoading(false); // 에러 발생 시에도 loading 상태 업데이트
      });
  }, [id]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = () => {
    if (window.confirm('등록하시겠습니까?')) {
      axios.put(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boards/${id}/answer`, { answer }, {
        headers: {
          'Authorization': "Bearer " + window.localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          navigate('/main/admin/board'); // 전체 조회 페이지로 이동
        })
        .catch(error => {
          console.error('There was an error submitting the answer!', error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      {board && (
        <>
          {/* <h1>{board.title}</h1> */}
          <h1>고객의 말씀 답변</h1>
          <table className="table">
            <tbody>
              <tr>
                <th>제목</th>
                <td>{board.title}</td>
              </tr>
              <tr>
                <th>내용</th>
                <td>{board.content}</td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>{board.author}</td> {/* member_id 표시 */}
              </tr>
              <tr>
                <th>등록 일자</th>
                <td>{board.submissionDate}</td>
              </tr>
              <tr>
                <th>답변 여부</th>
                <td>{board.status === 'true' ? '답변 완료' : '미답변'}</td> {/* answer가 null인 경우 false, 아닌 경우 true */}
              </tr>
              <tr>
                <th>답변</th>
                <td>
                  {board.status === 'true' ? (
                    <div style={{ width: '100%', height: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '8px' }}>{answer}</div>
                  ) : (
                    <textarea
                      value={answer}
                      onChange={handleAnswerChange}
                      placeholder="Write your answer here..."
                      style={{ width: '100%', height: '200px' }}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {board.status !== 'true' && (
            <div className="button-container">
              <button onClick={handleAnswerSubmit} style={{ float: 'right' }}>Submit Answer</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BoardDetail;
