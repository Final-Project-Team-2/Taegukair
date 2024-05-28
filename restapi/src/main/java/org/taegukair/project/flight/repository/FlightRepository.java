package org.taegukair.project.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.flight.dto.AirPortDTO;
import org.taegukair.project.flight.entity.AirPort;
import org.taegukair.project.flight.entity.Flight;

import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Integer> {

    List<Flight> findByStartAirPortAndStartTimeBetween(
        AirPort startAirPort,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime
    );

    List<Flight> findByEndAirPortAndStartTimeBetween(
            AirPort endAirPort,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime
    );

    List<Flight> findByStartAirPortAndEndAirPortAndStartTimeBetween(
            AirPort startAirPort,
            AirPort endAirPort,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime
    );

}
