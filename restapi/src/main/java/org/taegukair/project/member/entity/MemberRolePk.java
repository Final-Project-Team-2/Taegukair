package org.taegukair.project.member.entity;

import java.io.Serializable;
import java.util.Objects;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberRolePk that = (MemberRolePk) o;
        return memberCode == that.memberCode && authorityCode == that.authorityCode;
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberCode, authorityCode);
    }

    @Override
    public String toString() {
        return "MemberRolePk{" +
                "memberCode=" + memberCode +
                ", authorityCode=" + authorityCode +
                '}';
    }
}
