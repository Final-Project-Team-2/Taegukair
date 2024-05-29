package org.taegukair.project.board.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.board.dto.BoardDTO;
import org.taegukair.project.board.entity.Board;
import org.taegukair.project.board.repository.BoardRepository;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.MemberRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService {
    private static final Logger log = LoggerFactory.getLogger(BoardService.class);

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository, MemberRepository memberRepository) {
        this.boardRepository = boardRepository;
        this.memberRepository = memberRepository;
    }

    public BoardDTO addBoard(BoardDTO boardDTO, String username) {
        Member member = memberRepository.findByMemberId(username);
        if (member == null) {
            throw new RuntimeException("Member not found");
        }

        log.info("Adding board with title: {}", boardDTO.getTitle());
        Board board = new Board();
        board.setMember(member);
        board.setTitle(boardDTO.getTitle());
        board.setContent(boardDTO.getContent());
        board.setSubmissionDate(boardDTO.getSubmissionDate());
        board.setStatus(boardDTO.getStatus());
        Board savedBoard = boardRepository.save(board);
        log.info("Board saved with ID: {}", savedBoard.getBoardId());
        return new BoardDTO(savedBoard.getBoardId(), savedBoard.getMember().getMemberCode(), savedBoard.getTitle(), savedBoard.getContent(), savedBoard.getSubmissionDate(), savedBoard.getStatus(), savedBoard.getAnswer());
    }

    public List<BoardDTO> findBoard(String title) {
        log.info("Searching for board with title containing: {}", title);
        List<Board> boards = boardRepository.findByTitleContainingIgnoreCase(title);
        log.info("Found boards: {}", boards);
        return boards.stream().map(board -> new BoardDTO(board.getBoardId(), board.getMember().getMemberCode(), board.getTitle(), board.getContent(), board.getSubmissionDate(), board.getStatus(), board.getAnswer())).collect(Collectors.toList());
    }

    public List<BoardDTO> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream().map(board -> new BoardDTO(board.getBoardId(), board.getMember().getMemberCode(), board.getTitle(), board.getContent(), board.getSubmissionDate(), board.getStatus(), board.getAnswer())).collect(Collectors.toList());
    }

    public BoardDTO getBoardDetail(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("게시판 글을 찾을 수 없습니다."));
        return new BoardDTO(board.getBoardId(), board.getMember().getMemberCode(), board.getTitle(), board.getContent(), board.getSubmissionDate(), board.getStatus(), board.getAnswer());
    }

    public BoardDTO updateBoard(Long boardId, BoardDTO boardDTO, String username) {
        Member member = memberRepository.findByMemberId(username);
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("게시판 글을 찾을 수 없습니다."));

        if (member == null) {
            throw new RuntimeException("Member not found");
        }

        board.setMember(member);
        board.setTitle(boardDTO.getTitle());
        board.setContent(boardDTO.getContent());
        board.setSubmissionDate(boardDTO.getSubmissionDate());
        board.setStatus(boardDTO.getStatus());

        if (member.getMemberRole().stream().anyMatch(role -> role.getAuthority().getAuthorityName().equals("ROLE_ADMIN")) && board.getAnswer() == null) {
            board.setAnswer(boardDTO.getAnswer());
        }

        Board updatedBoard = boardRepository.save(board);
        return new BoardDTO(updatedBoard.getBoardId(), updatedBoard.getMember().getMemberCode(), updatedBoard.getTitle(), updatedBoard.getContent(), updatedBoard.getSubmissionDate(), updatedBoard.getStatus(), updatedBoard.getAnswer());
    }

    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
