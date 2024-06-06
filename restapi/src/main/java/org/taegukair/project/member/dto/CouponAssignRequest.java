package org.taegukair.project.member.dto;

public class CouponAssignRequest {
    private String couponCode;
    private int memberCode;

    // Getters and Setters
    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }
}
