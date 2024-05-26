package org.taegukair.project.flight.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seat_class")
public class SeatClass {

    @Id
    @Column(name = "seat_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seatId;

    @Column(name = "seat_class_name")
    private String seatClassName;

    @Column(name = "seat_class_price")
    private int seatClassPrice;

    public SeatClass() {
    }

    public SeatClass(int seatId, String seatClassName, int seatClassPrice) {
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
        return "SeatClass{" +
                "seatId=" + seatId +
                ", seatClassName='" + seatClassName + '\'' +
                ", seatClassPrice=" + seatClassPrice +
                '}';
    }
}
