package org.taegukair.project.member.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Arrays;

@Entity
@Table(name = "family")
public class Family {
    @Id
    private String familyUserId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users user;

    @Column
    private LocalDate familyBirthDate;

    @Column(nullable = false)
    private int familyKey;

    @Column(nullable = false)
    private String familyRelation;

    @Column(nullable = false)
    private String familyPhone;

    @Column(nullable = false)
    private String familyName;

    @Column
    private byte[] image;

    public Family() {
    }

    public Family(String familyUserId, Users user, LocalDate familyBirthDate, int familyKey, String familyRelation, String familyPhone, String familyName, byte[] image) {
        this.familyUserId = familyUserId;
        this.user = user;
        this.familyBirthDate = familyBirthDate;
        this.familyKey = familyKey;
        this.familyRelation = familyRelation;
        this.familyPhone = familyPhone;
        this.familyName = familyName;
        this.image = image;
    }

    public String getFamilyUserId() {
        return familyUserId;
    }

    public void setFamilyUserId(String familyUserId) {
        this.familyUserId = familyUserId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public LocalDate getFamilyBirthDate() {
        return familyBirthDate;
    }

    public void setFamilyBirthDate(LocalDate familyBirthDate) {
        this.familyBirthDate = familyBirthDate;
    }

    public int getFamilyKey() {
        return familyKey;
    }

    public void setFamilyKey(int familyKey) {
        this.familyKey = familyKey;
    }

    public String getFamilyRelation() {
        return familyRelation;
    }

    public void setFamilyRelation(String familyRelation) {
        this.familyRelation = familyRelation;
    }

    public String getFamilyPhone() {
        return familyPhone;
    }

    public void setFamilyPhone(String familyPhone) {
        this.familyPhone = familyPhone;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Family{" +
                "familyUserId='" + familyUserId + '\'' +
                ", user=" + user +
                ", familyBirthDate=" + familyBirthDate +
                ", familyKey=" + familyKey +
                ", familyRelation='" + familyRelation + '\'' +
                ", familyPhone='" + familyPhone + '\'' +
                ", familyName='" + familyName + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
