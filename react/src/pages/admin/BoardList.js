import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';  // Add this line to import the CSS file

function BoardList() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boards/all`)
      .then(response => {
        setBoards(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the board data!', error);
      });
  }, []);

  const handleRowClick = (boardId) => {
    navigate(`/main/admin/board/${boardId}`);
  };

  return (
    <div className="table-container">
      <h1>Boards</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {boards.map(board => (
            <tr key={board.boardId} onClick={() => handleRowClick(board.boardId)} style={{ cursor: 'pointer' }}>
              <td>{board.title}</td>
              <td>{board.content.length > 100 ? board.content.substring(0, 100) + '...' : board.content}</td> {/* Content 길 경우 ... 표시 */}
              <td>{board.author}</td> {/* member_id 표시 */}
              <td>{board.status === 'true' ? '답변 완료' : '미답변'}</td> {/* answer가 null인 경우 false, 아닌 경우 true */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardList;
