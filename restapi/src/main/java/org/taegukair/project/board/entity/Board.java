package org.taegukair.project.board.entity;

import jakarta.persistence.*;
import org.taegukair.project.member.entity.Users;

import java.time.LocalDate;

@Entity
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users user;

    @Column(nullable = false)
    private String title;

    @Column
    private String content;

    @Column(nullable = false)
    private LocalDate submissionDate;

    @Column(nullable = false)
    private String status;

    @Column
    private String answer;

    public Board() {
    }

    public Board(int boardId, Users user, String title, String content, LocalDate submissionDate, String status, String answer) {
        this.boardId = boardId;
        this.user = user;
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

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
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
        return "Board{" +
                "boardId=" + boardId +
                ", user=" + user +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", submissionDate=" + submissionDate +
                ", status='" + status + '\'' +
                ", answer='" + answer + '\'' +
                '}';
    }
}