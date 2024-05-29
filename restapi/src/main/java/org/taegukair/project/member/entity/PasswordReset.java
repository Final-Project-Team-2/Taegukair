package org.taegukair.project.member.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "password_reset")
public class PasswordReset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resetCode;

    @Column(nullable = false)
    private String resetToken;

    @Column(nullable = false)
    private String tokenExpiration;

    @ManyToOne
    @JoinColumn(name = "member_code", nullable = false)
    private Member member;

    public PasswordReset() {
    }

    public PasswordReset(int resetCode, String resetToken, String tokenExpiration, Member member) {
        this.resetCode = resetCode;
        this.resetToken = resetToken;
        this.tokenExpiration = tokenExpiration;
        this.member = member;
    }

    public int getResetCode() {
        return resetCode;
    }

    public void setResetCode(int resetCode) {
        this.resetCode = resetCode;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public String getTokenExpiration() {
        return tokenExpiration;
    }

    public void setTokenExpiration(String tokenExpiration) {
        this.tokenExpiration = tokenExpiration;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    @Override
    public String toString() {
        return "PasswordReset{" +
                "resetCode=" + resetCode +
                ", resetToken='" + resetToken + '\'' +
                ", tokenExpiration='" + tokenExpiration + '\'' +
                ", member=" + member +
                '}';
    }
}