package org.taegukair.project.flight.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "airport")
public class AirPort {

    @Id
    @Column(name = "airport_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int airportId;

    @Column(name = "airport_Name")
    private String airportName;

    @Column(name = "airport_Iata")
    private String airportIata;

    @Column(name = "airport_location")
    private String airportLocation;

    public AirPort() {
    }

    public AirPort(int airportId, String airportName, String airportIata, String airportLocation) {
        this.airportId = airportId;
        this.airportName = airportName;
        this.airportIata = airportIata;
        this.airportLocation = airportLocation;
    }

    public int getAirportId() {
        return airportId;
    }

    public void setAirportId(int airportId) {
        this.airportId = airportId;
    }

    public String getAirportName() {
        return airportName;
    }

    public void setAirportName(String airportName) {
        this.airportName = airportName;
    }

    public String getAirportIata() {
        return airportIata;
    }

    public void setAirportIata(String airportIata) {
        this.airportIata = airportIata;
    }

    public String getAirportLocation() {
        return airportLocation;
    }

    public void setAirportLocation(String airportLocation) {
        this.airportLocation = airportLocation;
    }

    @Override
    public String toString() {
        return "AirPort{" +
                "airportId=" + airportId +
                ", airportName='" + airportName + '\'' +
                ", airportIata='" + airportIata + '\'' +
                ", airportLocation='" + airportLocation + '\'' +
                '}';
    }
}
