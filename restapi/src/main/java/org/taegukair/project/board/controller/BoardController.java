package org.taegukair.project.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.board.dto.BoardDTO;
import org.taegukair.project.board.service.BoardService;
import org.taegukair.project.flight.dto.ResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/boards")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> getAllBoards() {
        List<BoardDTO> boards = boardService.getAllBoards();
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 조회 성공", boards));
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseDTO> findBoard(@RequestParam(name = "s", required = false) String title) {
        List<BoardDTO> boards;
        if (title == null || title.isEmpty() || title.equals("all")) {
            boards = boardService.getAllBoards();
        } else {
            boards = boardService.findBoard(title);
        }
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", boards));
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseDTO> getBoardDetail(@PathVariable Long boardId) {
        BoardDTO board = boardService.getBoardDetail(boardId);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 정보 조회 성공", board));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> addBoard(@RequestBody BoardDTO boardDTO, @RequestHeader("username") String username) {
        BoardDTO createdBoard = boardService.addBoard(boardDTO, username);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 작성 성공", createdBoard));
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<ResponseDTO> updateBoard(@PathVariable Long boardId, @RequestBody BoardDTO boardDTO, @RequestHeader("username") String username) {
        BoardDTO updatedBoard = boardService.updateBoard(boardId, boardDTO, username);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 수정 성공", updatedBoard));
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResponseDTO> deleteBoard(@PathVariable Long boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "글 삭제 성공", null));
    }
}
