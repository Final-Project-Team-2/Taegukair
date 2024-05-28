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
    @JoinColumn(name = "member_code", nullable = false)
    private Member member;

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

    public Family(String familyUserId, Member member, LocalDate familyBirthDate, int familyKey, String familyRelation, String familyPhone, String familyName, byte[] image) {
        this.familyUserId = familyUserId;
        this.member = member;
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

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
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
                ", member=" + member +
                ", familyBirthDate=" + familyBirthDate +
                ", familyKey=" + familyKey +
                ", familyRelation='" + familyRelation + '\'' +
                ", familyPhone='" + familyPhone + '\'' +
                ", familyName='" + familyName + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
