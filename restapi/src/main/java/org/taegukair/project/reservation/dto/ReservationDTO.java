package org.taegukair.project.reservation.dto;

import java.time.LocalDate;

public class ReservationDTO {

    private String reservationNo;

    private int member;

    private int flight;

    private int seat;

    private int coupon;

    private int baggageAmount;

    private int extraBaggageAmount;

    private int baggagePrice;

    private LocalDate reservationDate;

    public ReservationDTO() {
    }

    public ReservationDTO(String reservationNo, int member, int flight, int seat, int coupon, int baggageAmount, int extraBaggageAmount, int baggagePrice, LocalDate reservationDate) {
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

    public int getMember() {
        return member;
    }

    public void setMember(int member) {
        this.member = member;
    }

    public int getFlight() {
        return flight;
    }

    public void setFlight(int flight) {
        this.flight = flight;
    }

    public int getSeat() {
        return seat;
    }

    public void setSeat(int seat) {
        this.seat = seat;
    }

    public int getCoupon() {
        return coupon;
    }

    public void setCoupon(int coupon) {
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
        return "ReservationDTO{" +
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
