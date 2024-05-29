import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/main/admin/board/${id}`)
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the board data!', error);
      });
  }, [id]);

  return (
    <div>
      {board && (
        <>
          <h1>{board.title}</h1>
          <p>{board.content}</p>
        </>
      )}
    </div>
  );
}

export default BoardDetail;
