package org.taegukair.project.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.board.dto.BoardDTO;
import org.taegukair.project.board.entity.Board;
import org.taegukair.project.board.service.BoardService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/boards")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        List<BoardDTO> boards = boardService.getAllBoards();
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable Long id) {
        BoardDTO board = boardService.getBoardById(id);
        return ResponseEntity.ok(board);
    }

    @PutMapping("/{id}/answer")
    public ResponseEntity<BoardDTO> updateBoardAnswer(@PathVariable Long id, @RequestBody Map<String, String> answerMap) {
        String answer = answerMap.get("answer");
        BoardDTO updatedBoard = boardService.updateBoardAnswer(id, answer);
        return ResponseEntity.ok(updatedBoard);
    }

    // 기존 기능들 추가
    // 예를 들어 Board 추가, 삭제 등의 엔드포인트가 있을 경우 그대로 유지
    // 아래는 예시 엔드포인트입니다. 실제로 있는 엔드포인트인지 확인 후 사용하세요.

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board savedBoard = boardService.saveBoard(board);
        return ResponseEntity.ok(savedBoard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }
}
