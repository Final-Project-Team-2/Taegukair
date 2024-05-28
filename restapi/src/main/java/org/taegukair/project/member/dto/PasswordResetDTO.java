package org.taegukair.project.member.dto;

public class PasswordResetDTO {
    private int resetCode;
    private String resetToken;
    private String tokenExpiration;
    private String userId;

    public PasswordResetDTO() {
    }

    public PasswordResetDTO(int resetCode, String resetToken, String tokenExpiration, String userId) {
        this.resetCode = resetCode;
        this.resetToken = resetToken;
        this.tokenExpiration = tokenExpiration;
        this.userId = userId;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "PasswordResetDTO{" +
                "resetCode=" + resetCode +
                ", resetToken='" + resetToken + '\'' +
                ", tokenExpiration='" + tokenExpiration + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
