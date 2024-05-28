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
    @JoinColumn(name = "userId", nullable = false)
    private Users user;

    public PasswordReset() {
    }

    public PasswordReset(int resetCode, String resetToken, String tokenExpiration, Users user) {
        this.resetCode = resetCode;
        this.resetToken = resetToken;
        this.tokenExpiration = tokenExpiration;
        this.user = user;
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

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "PasswordReset{" +
                "resetCode=" + resetCode +
                ", resetToken='" + resetToken + '\'' +
                ", tokenExpiration='" + tokenExpiration + '\'' +
                ", user=" + user +
                '}';
    }
}