package org.taegukair.project.flight.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "airport")

public class AirPort {

    @Id
    @Column(name = "airport_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int airPortId;

    @Column(name = "airport_Name")
    private String airPortName;

    @Column(name = "airport_Iata")
    private String airPortIata;

    @Column(name = "airport_location")
    private String airPortLocation;

    public AirPort() {
    }

    public AirPort(int airPortId, String airPortName, String airPortIata, String airPortLocation) {
        this.airPortId = airPortId;
        this.airPortName = airPortName;
        this.airPortIata = airPortIata;
        this.airPortLocation = airPortLocation;
    }

    public int getAirPortId() {
        return airPortId;
    }

    public void setAirPortId(int airPortId) {
        this.airPortId = airPortId;
    }

    public String getAirPortName() {
        return airPortName;
    }

    public void setAirPortName(String airPortName) {
        this.airPortName = airPortName;
    }

    public String getAirPortIata() {
        return airPortIata;
    }

    public void setAirPortIata(String airPortIata) {
        this.airPortIata = airPortIata;
    }

    public String getAirPortLocation() {
        return airPortLocation;
    }

    public void setAirPortLocation(String airPortLocation) {
        this.airPortLocation = airPortLocation;
    }

    @Override
    public String toString() {
        return "AirPort{" +
                "airPortId=" + airPortId +
                ", airPortName='" + airPortName + '\'' +
                ", airPortIata='" + airPortIata + '\'' +
                ", airPortLocation='" + airPortLocation + '\'' +
                '}';
    }
}
