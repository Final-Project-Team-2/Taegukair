package org.taegukair.project.member.entity;

import java.io.Serializable;
import java.util.Objects;

/* 설명. 복합키 타입을 정의할 때는 Serializable을 반드시 구현 */
public class MemberRolePk implements Serializable {
    private int memberCode;
    private int authorityCode;

    // Default constructor
    public MemberRolePk() {}

    public MemberRolePk(int memberCode, int authorityCode) {
        this.memberCode = memberCode;
        this.authorityCode = authorityCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(int authorityCode) {
        this.authorityCode = authorityCode;
    }

    @Override
    public String toString() {
        return "MemberRolePk{" +
                "memberCode=" + memberCode +
                ", authorityCode=" + authorityCode +
                '}';
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(memberCode, authorityCode);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        MemberRolePk that = (MemberRolePk) obj;
        return memberCode == that.memberCode && authorityCode == that.authorityCode;
    }
}
