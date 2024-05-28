package org.taegukair.project.board.dto;

import java.time.LocalDate;

public class BoardDTO {
    private Long boardId;
    private int memberCode;
    private String title;
    private String content;
    private LocalDate submissionDate;
    private String status;
    private String answer;

    // Constructors, getters and setters

    public BoardDTO() {}

    public BoardDTO(Long boardId, int memberCode, String title, String content, LocalDate submissionDate, String status, String answer) {
        this.boardId = boardId;
        this.memberCode = memberCode;
        this.title = title;
        this.content = content;
        this.submissionDate = submissionDate;
        this.status = status;
        this.answer = answer;
    }

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
}
