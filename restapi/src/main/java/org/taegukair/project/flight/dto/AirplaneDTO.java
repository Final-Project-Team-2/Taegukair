package org.taegukair.project.flight.dto;

public class AirplaneDTO {

    private int airplaneId;

    private String airplaneType;

    private String airplaneNo;

    private int airplaneSeat;

    public AirplaneDTO() {
    }

    public AirplaneDTO(int airplaneId, String airplaneType, String airplaneNo, int airplaneSeat) {
        this.airplaneId = airplaneId;
        this.airplaneType = airplaneType;
        this.airplaneNo = airplaneNo;
        this.airplaneSeat = airplaneSeat;
    }

    public int getAirplaneId() {
        return airplaneId;
    }

    public void setAirplaneId(int airplaneId) {
        this.airplaneId = airplaneId;
    }

    public String getAirplaneType() {
        return airplaneType;
    }

    public void setAirplaneType(String airplaneType) {
        this.airplaneType = airplaneType;
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
        return "AirplaneDTO{" +
                "airplaneId=" + airplaneId +
                ", airplaneType='" + airplaneType + '\'' +
                ", airplaneNo='" + airplaneNo + '\'' +
                ", airplaneSeat=" + airplaneSeat +
                '}';
    }
}
