package org.taegukair.project.member.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_code", nullable = false)
    private int memberCode;

    @Column(name = "member_id", nullable = false, unique = true, length = 255)
    private String memberId;

    @Column(name = "member_name", nullable = false, length = 255)
    private String memberName;

    @Column(name = "member_password", nullable = false, length = 255)
    private String memberPassword;

    @Column(name = "member_email", nullable = false, length = 255)
    private String memberEmail;

    @Column(name = "member_gender", nullable = false, length = 255)
    private String memberGender;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "member_phone", nullable = false, length = 255)
    private String memberPhone;

    @OneToMany
    @JoinColumn(name = "member_code")
    private List<MemberRole> memberRole;

    // Default constructor
    public Member() {}

    public Member(int memberCode, String memberId, String memberName, String memberPassword, String memberEmail, String memberGender, LocalDate birthDate, String memberPhone, List<MemberRole> memberRole) {
        this.memberCode = memberCode;
        this.memberId = memberId;
        this.memberName = memberName;
        this.memberPassword = memberPassword;
        this.memberEmail = memberEmail;
        this.memberGender = memberGender;
        this.birthDate = birthDate;
        this.memberPhone = memberPhone;
        this.memberRole = memberRole;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberPassword() {
        return memberPassword;
    }

    public void setMemberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public String getMemberGender() {
        return memberGender;
    }

    public void setMemberGender(String memberGender) {
        this.memberGender = memberGender;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getMemberPhone() {
        return memberPhone;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone;
    }

    public List<MemberRole> getMemberRole() {
        return memberRole;
    }

    public void setMemberRole(List<MemberRole> memberRole) {
        this.memberRole = memberRole;
    }

    @Override
    public String toString() {
        return "Member{" +
                "memberCode=" + memberCode +
                ", memberId='" + memberId + '\'' +
                ", memberName='" + memberName + '\'' +
                ", memberPassword='" + memberPassword + '\'' +
                ", memberEmail='" + memberEmail + '\'' +
                ", memberGender='" + memberGender + '\'' +
                ", birthDate=" + birthDate +
                ", memberPhone='" + memberPhone + '\'' +
                ", memberRole=" + memberRole +
                '}';
    }
}
