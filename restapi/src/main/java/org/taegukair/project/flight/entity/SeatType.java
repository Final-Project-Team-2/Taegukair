package org.taegukair.project.flight.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seat_type")
public class SeatType {

    @Id
    @Column(name = "seat_type_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seatTypeId;

    @Column(name = "seat_type_name")
    private String seatTypeName;

    @Column(name = "seat_type_price")
    private int seatTypePrice;

    public SeatType() {
    }

    public SeatType(int seatTypeId, String seatTypeName, int seatTypePrice) {
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
        return "SeatType{" +
                "seatTypeId=" + seatTypeId +
                ", seatTypeName='" + seatTypeName + '\'' +
                ", seatTypePrice=" + seatTypePrice +
                '}';
    }
}
