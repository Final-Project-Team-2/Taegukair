package org.taegukair.project.flight.dto;

public class AirPortDTO {
    private int airportId;
    private String airportName;
    private String airportIata;
    private String airportLocation;

    public AirPortDTO() {
    }

    public AirPortDTO(int airportId, String airportName, String airportIata, String airportLocation) {
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
        return "AirPortDTO{" +
                "airportId=" + airportId +
                ", airportName='" + airportName + '\'' +
                ", airportIata='" + airportIata + '\'' +
                ", airportLocation='" + airportLocation + '\'' +
                '}';
    }
}