package org.taegukair.project.member.entity;

import jakarta.persistence.*;

import java.security.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_id")
    private int couponId;

    @ManyToOne
    @JoinColumn(name = "member_code", nullable = false)
    private Member member;

    @Column(name = "coupon_code", nullable = false)
    private String couponCode;

    @Column(name = "discount_amount")
    private int discountAmount;

    @Column(name = "discount_percentage")
    private int discountPercentage;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "valid_until", nullable = false)
    private LocalDate validUntil;

    @Column(name = "is_possible", nullable = false)
    private boolean isPossible;

    public Coupon() {
    }

    public Coupon(int couponId, Member member, String couponCode, int discountAmount, int discountPercentage, Timestamp createdAt, LocalDate validUntil, boolean isPossible) {
        this.couponId = couponId;
        this.member = member;
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

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
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
        return "Coupon{" +
                "couponId=" + couponId +
                ", member=" + member +
                ", couponCode='" + couponCode + '\'' +
                ", discountAmount=" + discountAmount +
                ", discountPercentage=" + discountPercentage +
                ", createdAt=" + createdAt +
                ", validUntil=" + validUntil +
                ", isPossible=" + isPossible +
                '}';
    }
}