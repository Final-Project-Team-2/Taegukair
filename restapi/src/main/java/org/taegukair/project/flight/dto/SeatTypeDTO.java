package org.taegukair.project.flight.dto;

public class SeatTypeDTO {

    private int seatTypeId;

    private String seatTypeName;

    private int seatTypePrice;

    public SeatTypeDTO() {
    }

    public SeatTypeDTO(int seatTypeId, String seatTypeName, int seatTypePrice) {
        this.seatTypeId = seatTypeId;
        this.seatTypeName = seatTypeName;
        this.seatTypePrice = seatTypePrice;
    }

    public int getSeatTypeId() {
        return seatTypeId;
    }

    public void setSeatTypeId(int seatTypeId) {
        this.seatTypeId = seatTypeId;
    }

    public String getSeatTypeName() {
        return seatTypeName;
    }

    public void setSeatTypeName(String seatTypeName) {
        this.seatTypeName = seatTypeName;
    }

    public int getSeatTypePrice() {
        return seatTypePrice;
    }

    public void setSeatTypePrice(int seatTypePrice) {
        this.seatTypePrice = seatTypePrice;
    }

    @Override
    public String toString() {
        return "SeatTypeDTO{" +
                "seatTypeId=" + seatTypeId +
                ", seatTypeName='" + seatTypeName + '\'' +
                ", seatTypePrice=" + seatTypePrice +
                '}';
    }
}
