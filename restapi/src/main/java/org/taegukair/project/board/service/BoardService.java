package org.taegukair.project.board.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.taegukair.project.board.dto.BoardDTO;
import org.taegukair.project.board.entity.Board;
import org.taegukair.project.board.repository.BoardRepository;
import org.taegukair.project.flight.entity.Airplane;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.MemberRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BoardService(BoardRepository boardRepository, MemberRepository memberRepository, ModelMapper modelMapper) {
        this.boardRepository = boardRepository;
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
    }

    public List<BoardDTO> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream().map(BoardDTO::new).collect(Collectors.toList());
    }

    public BoardDTO getBoardById(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("Board not found"));
        return new BoardDTO(board);
    }

    @Transactional
    public BoardDTO updateBoardAnswer(Long boardId, String answer) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("Board not found"));
        board.setAnswer(answer);
        boardRepository.save(board);
        return new BoardDTO(board);
    }

    // 기존 기능들 추가
    // 예를 들어 Board 추가, 삭제 등의 메서드가 있을 경우 그대로 유지
    // 아래는 예시 메서드입니다. 실제로 있는 메서드인지 확인 후 사용하세요.

    @Transactional
    public Board saveBoard(BoardDTO boardDTO) {

        try {
            Board newBoard = modelMapper.map(boardDTO, Board.class);


            Optional<Member> memberOpt = memberRepository.findById(boardDTO.getMemberCode());
            if (memberOpt.isPresent()) {
                newBoard.setMember(memberOpt.get());
            } else {
                throw new RuntimeException("Member not found");
            }

            // default 사용자가 입력하지 않아도 되는 기본값 설정.
            newBoard.setSubmissionDate(LocalDate.now());
            newBoard.setStatus("false");
            newBoard.setAnswer(null);

            return boardRepository.save(newBoard);

        } catch (Exception e) {
            throw new RuntimeException(e);

        }

    }



    @Transactional
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
