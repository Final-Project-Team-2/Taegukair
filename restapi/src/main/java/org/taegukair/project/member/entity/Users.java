package org.taegukair.project.member.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
public class Users {
    @Id
    private String userId;

    @Column(nullable = false)
    private String userPw;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private int userKey;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String userGender;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private String userPhone;

    @ManyToOne
    @JoinColumn(name = "permissionCode", nullable = false)
    private Permission permission;

    public Users() {
    }

    public Users(String userId, String userPw, String userEmail, int userKey, String userName, String userGender, LocalDate birthDate, String userPhone, Permission permission) {
        this.userId = userId;
        this.userPw = userPw;
        this.userEmail = userEmail;
        this.userKey = userKey;
        this.userName = userName;
        this.userGender = userGender;
        this.birthDate = birthDate;
        this.userPhone = userPhone;
        this.permission = permission;
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

    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }

    @Override
    public String toString() {
        return "Users{" +
                "userId='" + userId + '\'' +
                ", userPw='" + userPw + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userKey=" + userKey +
                ", userName='" + userName + '\'' +
                ", userGender='" + userGender + '\'' +
                ", birthDate=" + birthDate +
                ", userPhone='" + userPhone + '\'' +
                ", permission=" + permission +
                '}';
    }
}

