package org.taegukair.project.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.board.dto.BoardDTO;
import org.taegukair.project.board.entity.Board;
import org.taegukair.project.board.repository.BoardRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<BoardDTO> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream().map(BoardDTO::new).collect(Collectors.toList());
    }

    public BoardDTO getBoardById(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("Board not found"));
        return new BoardDTO(board);
    }

    public BoardDTO updateBoardAnswer(Long boardId, String answer) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("Board not found"));
        board.setAnswer(answer);
        boardRepository.save(board);
        return new BoardDTO(board);
    }

    // 기존 기능들 추가
    // 예를 들어 Board 추가, 삭제 등의 메서드가 있을 경우 그대로 유지
    // 아래는 예시 메서드입니다. 실제로 있는 메서드인지 확인 후 사용하세요.

    public Board saveBoard(Board board) {
        return boardRepository.save(board);
    }

    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
