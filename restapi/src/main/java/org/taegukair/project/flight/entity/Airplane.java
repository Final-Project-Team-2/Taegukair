package org.taegukair.project.flight.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "airplane")
public class Airplane {

    @Id
    @Column(name = "airplane_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int airplaneId;

    @Column(name = "airplane_Type")
    private String airplaneName;

    @Column(name = "airplane_No")
    private String airplaneNo;

    @Column(name = "airplane_Seat")
    private int airplaneSeat;

    public Airplane() {
    }

    public Airplane(int airplaneId, String airplaneName, String airplaneNo, int airplaneSeat) {
        this.airplaneId = airplaneId;
        this.airplaneName = airplaneName;
        this.airplaneNo = airplaneNo;
        this.airplaneSeat = airplaneSeat;
    }

    public int getAirplaneId() {
        return airplaneId;
    }

    public void setAirplaneId(int airplaneId) {
        this.airplaneId = airplaneId;
    }

    public String getAirplaneName() {
        return airplaneName;
    }

    public void setAirplaneName(String airplaneName) {
        this.airplaneName = airplaneName;
    }

    public String getAirplaneNo() {
        return airplaneNo;
    }

    public void setAirplaneNo(String airplaneNo) {
        this.airplaneNo = airplaneNo;
    }

    public int getAirplaneSeat() {
        return airplaneSeat;
    }

    public void setAirplaneSeat(int airplaneSeat) {
        this.airplaneSeat = airplaneSeat;
    }

    @Override
    public String toString() {
        return "Airplane{" +
                "airplaneId=" + airplaneId +
                ", airplaneName='" + airplaneName + '\'' +
                ", airplaneNo='" + airplaneNo + '\'' +
                ", airplaneSeat=" + airplaneSeat +
                '}';
    }
}
