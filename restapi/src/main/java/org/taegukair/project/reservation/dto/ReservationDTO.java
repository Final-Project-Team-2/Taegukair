package org.taegukair.project.reservation.dto;

import java.time.LocalDate;

public class ReservationDTO {
    private String reservationNo;
    private int memberCode;
    private int flightId;
    private String seatNo;
    private int couponId;
    private int baggageAmount;
    private int extraBaggageAmount;
    private int baggagePrice;
    private LocalDate reservationDate;

    public ReservationDTO() {
    }

    public ReservationDTO(String reservationNo, int memberCode, int flightId, String seatNo, int couponId, int baggageAmount, int extraBaggageAmount, int baggagePrice, LocalDate reservationDate) {
        this.reservationNo = reservationNo;
        this.memberCode = memberCode;
        this.flightId = flightId;
        this.seatNo = seatNo;
        this.couponId = couponId;
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

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public String getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(String seatNo) {
        this.seatNo = seatNo;
    }

    public int getCouponId() {
        return couponId;
    }

    public void setCouponId(int couponId) {
        this.couponId = couponId;
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
                ", memberCode='" + memberCode + '\'' +
                ", flightId=" + flightId +
                ", seatNo='" + seatNo + '\'' +
                ", couponId=" + couponId +
                ", baggageAmount=" + baggageAmount +
                ", extraBaggageAmount=" + extraBaggageAmount +
                ", baggagePrice=" + baggagePrice +
                ", reservationDate=" + reservationDate +
                '}';
    }
}
