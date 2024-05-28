package org.taegukair.project.member.dto;

import java.time.LocalDate;
import java.util.Arrays;

public class FamilyDTO {
    private String familyUserId;
    private String userId;
    private LocalDate familyBirthDate;
    private int familyKey;
    private String familyRelation;
    private String familyPhone;
    private String familyName;
    private byte[] image;

    public FamilyDTO() {
    }

    public FamilyDTO(String familyUserId, String userId, LocalDate familyBirthDate, int familyKey, String familyRelation, String familyPhone, String familyName, byte[] image) {
        this.familyUserId = familyUserId;
        this.userId = userId;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
        return "FamilyDTO{" +
                "familyUserId='" + familyUserId + '\'' +
                ", userId='" + userId + '\'' +
                ", familyBirthDate=" + familyBirthDate +
                ", familyKey=" + familyKey +
                ", familyRelation='" + familyRelation + '\'' +
                ", familyPhone='" + familyPhone + '\'' +
                ", familyName='" + familyName + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
