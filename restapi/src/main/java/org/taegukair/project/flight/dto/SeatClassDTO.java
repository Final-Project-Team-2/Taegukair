package org.taegukair.project.flight.dto;

public class SeatClassDTO {

    private int seatClassId;

    private String seatClassName;

    private int seatClassPrice;

    public SeatClassDTO() {
    }

    public SeatClassDTO(int seatClassId, String seatClassName, int seatClassPrice) {
        this.seatClassId = seatClassId;
        this.seatClassName = seatClassName;
        this.seatClassPrice = seatClassPrice;
    }

    public int getSeatClassId() {
        return seatClassId;
    }

    public void setSeatClassId(int seatClassId) {
        this.seatClassId = seatClassId;
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
                "seatClassId=" + seatClassId +
                ", seatClassName='" + seatClassName + '\'' +
                ", seatClassPrice=" + seatClassPrice +
                '}';
    }
}
