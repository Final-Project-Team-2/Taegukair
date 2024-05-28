package org.taegukair.project.reservation.entity;

import jakarta.persistence.*;
import org.taegukair.project.flight.entity.Flight;
import org.taegukair.project.flight.entity.Seat;
import org.taegukair.project.member.entity.Coupon;
import org.taegukair.project.member.entity.Member;

import java.time.LocalDate;

@Entity
public class Reservation {
    @Id
    @Column(name = "Reservation_No")
    private String reservationNo;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "flight_ID", nullable = false)
    private Flight flight;

    @ManyToOne
    @JoinColumn(name = "seat_No", nullable = false)
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @Column(name = "baggage_amount", nullable = false)
    private int baggageAmount;

    @Column(name = "extra_baggage_amount", nullable = false)
    private int extraBaggageAmount;

    @Column(name = "baggage_price", nullable = false)
    private int baggagePrice;

    @Column(name = "reservation_Date", nullable = false)
    private LocalDate reservationDate;

    // Constructors, getters and setters

    public Reservation() {
    }

    public Reservation(String reservationNo, Member member, Flight flight, Seat seat, Coupon coupon, int baggageAmount, int extraBaggageAmount, int baggagePrice, LocalDate reservationDate) {
        this.reservationNo = reservationNo;
        this.member = member;
        this.flight = flight;
        this.seat = seat;
        this.coupon = coupon;
        this.baggageAmount = baggageAmount;
        this.extraBaggageAmount = extraBaggageAmount;
        this.baggagePrice = baggagePrice;
        this.reservationDate = reservationDate;
    }

    public String getReservationNo() {
        return reservationNo;
    }

    public void setReservationNo(String reservationNo) {
        this.reservationNo = reservationNo;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public Coupon getCoupon() {
        return coupon;
    }

    public void setCoupon(Coupon coupon) {
        this.coupon = coupon;
    }

    public int getBaggageAmount() {
        return baggageAmount;
    }

    public void setBaggageAmount(int baggageAmount) {
        this.baggageAmount = baggageAmount;
    }

    public int getExtraBaggageAmount() {
        return extraBaggageAmount;
    }

    public void setExtraBaggageAmount(int extraBaggageAmount) {
        this.extraBaggageAmount = extraBaggageAmount;
    }

    public int getBaggagePrice() {
        return baggagePrice;
    }

    public void setBaggagePrice(int baggagePrice) {
        this.baggagePrice = baggagePrice;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }
}
