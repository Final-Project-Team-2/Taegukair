package org.taegukair.project.reservation.entity;

import jakarta.persistence.*;
import org.taegukair.project.flight.entity.Flight;
import org.taegukair.project.flight.entity.Seat;
import org.taegukair.project.member.entity.Coupon;
import org.taegukair.project.member.entity.Member;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "reservation")
public class Reservation implements Serializable {

    @Id
    @Column(name = "Reservation_No")
    private String reservationNo;

    @OneToOne
    @JoinColumn(name = "member_code")
    private Member member;

    @OneToOne
    @JoinColumn(name = "flight_ID")
    private Flight flight;

    @OneToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

    @OneToOne
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @Column(name = "baggage_amount")
    private int baggageAmount;

    @Column(name = "extra_baggage_amount")
    private int extraBaggageAmount;

    @Column(name = "baggage_price")
    private int baggagePrice;

    @Column(name = "reservation_Date")
    private LocalDate reservationDate;

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

    @Override
    public String toString() {
        return "Reservation{" +
                "reservationNo='" + reservationNo + '\'' +
                ", member=" + member +
                ", flight=" + flight +
                ", seat=" + seat +
                ", coupon=" + coupon +
                ", baggageAmount=" + baggageAmount +
                ", extraBaggageAmount=" + extraBaggageAmount +
                ", baggagePrice=" + baggagePrice +
                ", reservationDate=" + reservationDate +
                '}';
    }
}
