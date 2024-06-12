package org.taegukair.project.member.dto;

public class VerificationDTO {

    private String phoneNumber;
    private String code;
    private String memberId;
    private String memberEmail;
    private String newPassword;

    public VerificationDTO() {
    }

    public VerificationDTO(String phoneNumber, String code, String memberId, String memberEmail, String newPassword) {
        this.phoneNumber = phoneNumber;
        this.code = code;
        this.memberId = memberId;
        this.memberEmail = memberEmail;
        this.newPassword = newPassword;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    @Override
    public String toString() {
        return "VerificationDTO{" +
                "phoneNumber='" + phoneNumber + '\'' +
                ", code='" + code + '\'' +
                ", memberId='" + memberId + '\'' +
                ", memberEmail='" + memberEmail + '\'' +
                ", newPassword='" + newPassword + '\'' +
                '}';
    }
}
