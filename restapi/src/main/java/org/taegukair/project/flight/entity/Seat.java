package org.taegukair.project.flight.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seat")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private int seatId;

    @Column(name = "seat_No")
    private String seatNo;

    @ManyToOne
    @JoinColumn(name = "flight_ID")
    private Flight flight;

    @OneToOne
    @JoinColumn(name = "seat_type_id")
    private SeatType seatType;

    @OneToOne
    @JoinColumn(name = "seat_class_id")
    private SeatClass seatClass;

    @Column(name = "is_reserved")
    private boolean isReserved;

    public Seat() {
    }

    public Seat(int seatId, String seatNo, Flight flight, SeatType seatType, SeatClass seatClass, boolean isReserved) {
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
                "seatId=" + seatId +
                ", seatNo='" + seatNo + '\'' +
                ", flight=" + flight +
                ", seatType=" + seatType +
                ", seatClass=" + seatClass +
                ", isReserved=" + isReserved +
                '}';
    }
}
