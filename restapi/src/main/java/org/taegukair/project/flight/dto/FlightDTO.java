package org.taegukair.project.flight.dto;

import java.time.LocalDateTime;

public class FlightDTO {

    private int flightId;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private AirplaneDTO airplane;

    private AirPortDTO startAirPort;

    private AirPortDTO endAirPort;

    private int flightPrice;

    public FlightDTO() {
    }

    public FlightDTO(int flightId, LocalDateTime startTime, LocalDateTime endTime, AirplaneDTO airplane, AirPortDTO startAirPort, AirPortDTO endAirPort, int flightPrice) {
        this.flightId = flightId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.airplane = airplane;
        this.startAirPort = startAirPort;
        this.endAirPort = endAirPort;
        this.flightPrice = flightPrice;
    }

    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public AirplaneDTO getAirplane() {
        return airplane;
    }

    public void setAirplane(AirplaneDTO airplane) {
        this.airplane = airplane;
    }

    public AirPortDTO getStartAirPort() {
        return startAirPort;
    }

    public void setStartAirPort(AirPortDTO startAirPort) {
        this.startAirPort = startAirPort;
    }

    public AirPortDTO getEndAirPort() {
        return endAirPort;
    }

    public void setEndAirPort(AirPortDTO endAirPort) {
        this.endAirPort = endAirPort;
    }

    public int getFlightPrice() {
        return flightPrice;
    }

    public void setFlightPrice(int flightPrice) {
        this.flightPrice = flightPrice;
    }

    @Override
    public String toString() {
        return "FlightDTO{" +
                "flightId=" + flightId +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", airplane=" + airplane +
                ", startAirPort=" + startAirPort +
                ", endAirPort=" + endAirPort +
                ", flightPrice=" + flightPrice +
                '}';
    }
}
