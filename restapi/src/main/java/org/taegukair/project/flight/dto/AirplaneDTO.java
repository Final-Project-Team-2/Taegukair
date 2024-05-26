package org.taegukair.project.flight.dto;

public class AirplaneDTO {

    private int airplaneId;

    private String airplaneName;

    private String airplaneNo;

    private int airplaneSeat;

    public AirplaneDTO() {
    }

    public AirplaneDTO(int airplaneId, String airplaneName, String airplaneNo, int airplaneSeat) {
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
        return "AirplaneDTO{" +
                "airplaneId=" + airplaneId +
                ", airplaneName='" + airplaneName + '\'' +
                ", airplaneNo='" + airplaneNo + '\'' +
                ", airplaneSeat=" + airplaneSeat +
                '}';
    }
}
