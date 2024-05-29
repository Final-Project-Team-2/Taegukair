import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BoardList() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/main/admin/board')
      .then(response => {
        setBoards(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the board data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Boards</h1>
      <ul>
        {boards.map(board => (
          <li key={board.id}>
            <Link to={`/main/admin/board/${board.id}`}>
              {board.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
