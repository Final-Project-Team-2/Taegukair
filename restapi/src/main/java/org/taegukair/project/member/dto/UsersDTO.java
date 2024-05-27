package org.taegukair.project.member.dto;

import java.time.LocalDate;

public class UsersDTO {
    private String userId;
    private String userPw;
    private String userEmail;
    private int userKey;
    private String userName;
    private String userGender;
    private LocalDate birthDate;
    private String userPhone;
    private int permissionCode;

    public UsersDTO() {
    }

    public UsersDTO(String userId, String userPw, String userEmail, int userKey, String userName, String userGender, LocalDate birthDate, String userPhone, int permissionCode) {
        this.userId = userId;
        this.userPw = userPw;
        this.userEmail = userEmail;
        this.userKey = userKey;
        this.userName = userName;
        this.userGender = userGender;
        this.birthDate = birthDate;
        this.userPhone = userPhone;
        this.permissionCode = permissionCode;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPw() {
        return userPw;
    }

    public void setUserPw(String userPw) {
        this.userPw = userPw;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public int getUserKey() {
        return userKey;
    }

    public void setUserKey(int userKey) {
        this.userKey = userKey;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserGender() {
        return userGender;
    }

    public void setUserGender(String userGender) {
        this.userGender = userGender;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public int getPermissionCode() {
        return permissionCode;
    }

    public void setPermissionCode(int permissionCode) {
        this.permissionCode = permissionCode;
    }

    @Override
    public String toString() {
        return "UsersDTO{" +
                "userId='" + userId + '\'' +
                ", userPw='" + userPw + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userKey=" + userKey +
                ", userName='" + userName + '\'' +
                ", userGender='" + userGender + '\'' +
                ", birthDate=" + birthDate +
                ", userPhone='" + userPhone + '\'' +
                ", permissionCode=" + permissionCode +
                '}';
    }
}
