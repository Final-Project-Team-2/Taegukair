package org.taegukair.project.board.dto;

import java.time.LocalDate;
import org.taegukair.project.board.entity.Board;

public class BoardDTO {
    private Long boardId;
    private int memberCode;
    private String title;
    private String content;
    private LocalDate submissionDate;
    private String status;
    private String answer;
    private String author; // member_id 추가

    // 기존 생성자
    public BoardDTO() {
    }

    // Board 엔터티를 사용한 생성자 추가
    public BoardDTO(Board board) {
        this.boardId = board.getBoardId();
        this.memberCode = board.getMember().getMemberCode();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.submissionDate = board.getSubmissionDate();
        this.status = board.getAnswer() != null ? "true" : "false"; // answer가 null인 경우 false, 아닌 경우 true
        this.answer = board.getAnswer();
        this.author = board.getMember().getMemberId(); // member_id 추가
    }

    // Getters and setters

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "BoardDTO{" +
                "boardId=" + boardId +
                ", memberCode=" + memberCode +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", submissionDate=" + submissionDate +
                ", status='" + status + '\'' +
                ", answer='" + answer + '\'' +
                ", author='" + author + '\'' +
                '}';
    }
}
