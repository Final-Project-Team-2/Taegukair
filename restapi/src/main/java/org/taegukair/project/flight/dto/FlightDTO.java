package org.taegukair.project.flight.dto;

import java.time.LocalDateTime;

public class FlightDTO {

    private int flightId;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private int airplane;

    private int startAirPort;

    private int endAirPort;

    private int flightPrice;

    public FlightDTO() {
    }

    public FlightDTO(int flightId, LocalDateTime startTime, LocalDateTime endTime, int airplane, int startAirPort, int endAirPort, int flightPrice) {
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

    public int getAirplane() {
        return airplane;
    }

    public void setAirplane(int airplane) {
        this.airplane = airplane;
    }

    public int getStartAirPort() {
        return startAirPort;
    }

    public void setStartAirPort(int startAirPort) {
        this.startAirPort = startAirPort;
    }

    public int getEndAirPort() {
        return endAirPort;
    }

    public void setEndAirPort(int endAirPort) {
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
