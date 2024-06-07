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
    // 전체조회
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

    @GetMapping("/user/{memberCode}")
    public ResponseEntity<List<BoardDTO>> getUserBoards(@PathVariable int memberCode) {
        List<BoardDTO> userBoards = boardService.getUserBoards(memberCode);
        return ResponseEntity.ok(userBoards);
    }

    @PutMapping("/{id}/answer")
    public ResponseEntity<BoardDTO> updateBoardAnswer(@PathVariable Long id, @RequestBody Map<String, String> answerMap) {
        String answer = answerMap.get("answer");
        BoardDTO updatedBoard = boardService.updateBoardAnswer(id, answer);
        return ResponseEntity.ok(updatedBoard);
    }

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody BoardDTO boardDTO) {
        Board savedBoard = boardService.saveBoard(boardDTO);
        return ResponseEntity.ok(savedBoard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }


}
