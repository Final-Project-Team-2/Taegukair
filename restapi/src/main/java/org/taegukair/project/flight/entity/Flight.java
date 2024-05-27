package org.taegukair.project.flight.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "flight")
public class Flight {

    @Id
    @Column(name = "flight_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int flightId;

    @Column(name = "start_Time")
    private LocalDateTime startTime;

    @Column(name = "end_Time")
    private LocalDateTime endTime;

    @OneToOne
    @JoinColumn(name = "airplane_ID")
    private Airplane airplane;

    @OneToOne
    @JoinColumn(name = "departure_airport_ID")
    private AirPort startAirPort;

    @OneToOne
    @JoinColumn(name = "arrival_airport_ID")
    private AirPort endAirPort;

    @Column(name = "flight_Price")
    private int flightPrice;

    public Flight() {
    }

    public Flight(int flightId, LocalDateTime startTime, LocalDateTime endTime, Airplane airplane, AirPort startAirPort, AirPort endAirPort, int flightPrice) {
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

    public Airplane getAirplane() {
        return airplane;
    }

    public void setAirplane(Airplane airplane) {
        this.airplane = airplane;
    }

    public AirPort getStartAirPort() {
        return startAirPort;
    }

    public void setStartAirPort(AirPort startAirPort) {
        this.startAirPort = startAirPort;
    }

    public AirPort getEndAirPort() {
        return endAirPort;
    }

    public void setEndAirPort(AirPort endAirPort) {
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
        return "Flight{" +
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
