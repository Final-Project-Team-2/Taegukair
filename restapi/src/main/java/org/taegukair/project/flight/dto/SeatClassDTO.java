package org.taegukair.project.flight.dto;

public class SeatClassDTO {

    private int seatId;

    private String seatClassName;

    private int seatClassPrice;

    public SeatClassDTO() {
    }

    public SeatClassDTO(int seatId, String seatClassName, int seatClassPrice) {
        this.seatId = seatId;
        this.seatClassName = seatClassName;
        this.seatClassPrice = seatClassPrice;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatClassName() {
        return seatClassName;
    }

    public void setSeatClassName(String seatClassName) {
        this.seatClassName = seatClassName;
    }

    public int getSeatClassPrice() {
        return seatClassPrice;
    }

    public void setSeatClassPrice(int seatClassPrice) {
        this.seatClassPrice = seatClassPrice;
    }

    @Override
    public String toString() {
        return "SeatClassDTO{" +
                "seatId=" + seatId +
                ", seatClassName='" + seatClassName + '\'' +
                ", seatClassPrice=" + seatClassPrice +
                '}';
    }
}
