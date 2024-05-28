package org.taegukair.project.member.dto;

import java.security.Timestamp;
import java.time.LocalDate;

public class CouponDTO {
    private int couponId;
    private String userId;
    private String couponCode;
    private int discountAmount;
    private int discountPercentage;
    private Timestamp createdAt;
    private LocalDate validUntil;
    private boolean isPossible;

    public CouponDTO() {
    }

    public CouponDTO(int couponId, String userId, String couponCode, int discountAmount, int discountPercentage, Timestamp createdAt, LocalDate validUntil, boolean isPossible) {
        this.couponId = couponId;
        this.userId = userId;
        this.couponCode = couponCode;
        this.discountAmount = discountAmount;
        this.discountPercentage = discountPercentage;
        this.createdAt = createdAt;
        this.validUntil = validUntil;
        this.isPossible = isPossible;
    }

    public int getCouponId() {
        return couponId;
    }

    public void setCouponId(int couponId) {
        this.couponId = couponId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public int getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(int discountAmount) {
        this.discountAmount = discountAmount;
    }

    public int getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(int discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(LocalDate validUntil) {
        this.validUntil = validUntil;
    }

    public boolean isPossible() {
        return isPossible;
    }

    public void setPossible(boolean possible) {
        isPossible = possible;
    }

    @Override
    public String toString() {
        return "CouponDTO{" +
                "couponId=" + couponId +
                ", userId='" + userId + '\'' +
                ", couponCode='" + couponCode + '\'' +
                ", discountAmount=" + discountAmount +
                ", discountPercentage=" + discountPercentage +
                ", createdAt=" + createdAt +
                ", validUntil=" + validUntil +
                ", isPossible=" + isPossible +
                '}';
    }
}
