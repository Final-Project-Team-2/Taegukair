package org.taegukair.project.flight.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seat_class")
public class SeatClass {

    @Id
    @Column(name = "seat_class_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seatClassId;

    @Column(name = "seat_class_name")
    private String seatClassName;

    @Column(name = "seat_class_price")
    private int seatClassPrice;

    public SeatClass() {
    }

    public SeatClass(int seatClassId, String seatClassName, int seatClassPrice) {
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
        return "SeatClass{" +
                "seatClassId=" + seatClassId +
                ", seatClassName='" + seatClassName + '\'' +
                ", seatClassPrice=" + seatClassPrice +
                '}';
    }
}
