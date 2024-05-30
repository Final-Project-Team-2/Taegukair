package org.taegukair.project.flight.dto;

public class SeatDTO {

    private int seatId;

    private String seatNo;

    private int flight;

    private int seatType;

    private int seatClass;

    private boolean isReserved;

    public SeatDTO() {
    }

    public SeatDTO(int seatId, String seatNo, int flight, int seatType, int seatClass, boolean isReserved) {
        this.seatId = seatId;
        this.seatNo = seatNo;
        this.flight = flight;
        this.seatType = seatType;
        this.seatClass = seatClass;
        this.isReserved = isReserved;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(String seatNo) {
        this.seatNo = seatNo;
    }

    public int getFlight() {
        return flight;
    }

    public void setFlight(int flight) {
        this.flight = flight;
    }

    public int getSeatType() {
        return seatType;
    }

    public void setSeatType(int seatType) {
        this.seatType = seatType;
    }

    public int getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(int seatClass) {
        this.seatClass = seatClass;
    }

    public boolean isReserved() {
        return isReserved;
    }

    public void setReserved(boolean reserved) {
        isReserved = reserved;
    }

    @Override
    public String toString() {
        return "SeatDTO{" +
                "seatId=" + seatId +
                ", seatNo='" + seatNo + '\'' +
                ", flight=" + flight +
                ", seatType=" + seatType +
                ", seatClass=" + seatClass +
                ", isReserved=" + isReserved +
                '}';
    }
}
