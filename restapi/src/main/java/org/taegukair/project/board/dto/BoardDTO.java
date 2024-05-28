package org.taegukair.project.board.dto;

import java.time.LocalDate;

public class BoardDTO {
    private int boardId;
    private String userId;
    private String title;
    private String content;
    private LocalDate submissionDate;
    private String status;
    private String answer;

    public BoardDTO() {
    }

    public BoardDTO(int boardId, String userId, String title, String content, LocalDate submissionDate, String status, String answer) {
        this.boardId = boardId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.submissionDate = submissionDate;
        this.status = status;
        this.answer = answer;
    }

    public int getBoardId() {
        return boardId;
    }

    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    @Override
    public String toString() {
        return "BoardDTO{" +
                "boardId=" + boardId +
                ", userId='" + userId + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", submissionDate=" + submissionDate +
                ", status='" + status + '\'' +
                ", answer='" + answer + '\'' +
                '}';
    }
}