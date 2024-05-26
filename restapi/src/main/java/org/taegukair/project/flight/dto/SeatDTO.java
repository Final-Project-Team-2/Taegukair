package org.taegukair.project.flight.dto;

public class SeatDTO {

    private String seatNo;

    private FlightDTO flight;

    private SeatTypeDTO seatType;

    private SeatClassDTO seatClass;

    private boolean isReserved;

    public SeatDTO() {
    }

    public SeatDTO(String seatNo, FlightDTO flight, SeatTypeDTO seatType, SeatClassDTO seatClass, boolean isReserved) {
        this.seatNo = seatNo;
        this.flight = flight;
        this.seatType = seatType;
        this.seatClass = seatClass;
        this.isReserved = isReserved;
    }

    public String getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(String seatNo) {
        this.seatNo = seatNo;
    }

    public FlightDTO getFlight() {
        return flight;
    }

    public void setFlight(FlightDTO flight) {
        this.flight = flight;
    }

    public SeatTypeDTO getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatTypeDTO seatType) {
        this.seatType = seatType;
    }

    public SeatClassDTO getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(SeatClassDTO seatClass) {
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
                "seatNo='" + seatNo + '\'' +
                ", flight=" + flight +
                ", seatType=" + seatType +
                ", seatClass=" + seatClass +
                ", isReserved=" + isReserved +
                '}';
    }
}
