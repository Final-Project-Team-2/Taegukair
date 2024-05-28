package org.taegukair.project.board.entity;

import jakarta.persistence.*;
import org.taegukair.project.member.entity.Member;

import java.time.LocalDate;

@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @ManyToOne
    @JoinColumn(name = "member_code", nullable = false)
    private Member member;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "submission_date", nullable = false)
    private LocalDate submissionDate;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "answer")
    private String answer;

    // Constructors, getters and setters

    public Board() {}

    public Board(Member member, String title, String content, LocalDate submissionDate, String status, String answer) {
        this.member = member;
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

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
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
