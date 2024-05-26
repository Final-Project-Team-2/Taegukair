package org.taegukair.project.flight.dto;

public class AirPortDTO {

    private int airPortId;

    private String airPortName;

    private String airPortIata;

    private String airPortLocation;

    public AirPortDTO() {
    }

    public AirPortDTO(int airPortId, String airPortName, String airPortIata, String airPortLocation) {
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
        return "AirPortDTO{" +
                "airPortId=" + airPortId +
                ", airPortName='" + airPortName + '\'' +
                ", airPortIata='" + airPortIata + '\'' +
                ", airPortLocation='" + airPortLocation + '\'' +
                '}';
    }
}
