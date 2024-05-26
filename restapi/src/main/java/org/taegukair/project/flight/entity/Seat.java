package org.taegukair.project.flight.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seat")
public class Seat {

    @Id
    @Column(name = "seat_No")
    private String seatNo;

    @ManyToOne
    @JoinColumn(name = "flight_ID")
    private Flight flight;

    @OneToOne
    @JoinColumn(name = "seat_type_ID")
    private SeatType seatType;

    @OneToOne
    @JoinColumn(name = "seat_ID")
    private SeatClass seatClass;

    @Column(name = "is_reserved")
    private boolean isReserved;

    public Seat() {
    }

    public Seat(String seatNo, Flight flight, SeatType seatType, SeatClass seatClass, boolean isReserved) {
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

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public SeatType getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatType seatType) {
        this.seatType = seatType;
    }

    public SeatClass getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(SeatClass seatClass) {
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
        return "Seat{" +
                "seatNo='" + seatNo + '\'' +
                ", flight=" + flight +
                ", seatType=" + seatType +
                ", seatClass=" + seatClass +
                ", isReserved=" + isReserved +
                '}';
    }
}
