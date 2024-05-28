package org.taegukair.project.member.entity;

import jakarta.persistence.*;

import java.security.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int couponId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users user;

    @Column(nullable = false)
    private String couponCode;

    @Column
    private int discountAmount;

    @Column
    private int discountPercentage;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = false)
    private LocalDate validUntil;

    @Column(nullable = false)
    private boolean isPossible;

    public Coupon() {
    }

    public Coupon(int couponId, Users user, String couponCode, int discountAmount, int discountPercentage, Timestamp createdAt, LocalDate validUntil, boolean isPossible) {
        this.couponId = couponId;
        this.user = user;
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

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
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
                ", user=" + user +
                ", couponCode='" + couponCode + '\'' +
                ", discountAmount=" + discountAmount +
                ", discountPercentage=" + discountPercentage +
                ", createdAt=" + createdAt +
                ", validUntil=" + validUntil +
                ", isPossible=" + isPossible +
                '}';
    }
}