package org.taegukair.project.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.flight.entity.AirPort;

import java.util.List;

public interface AirPortRepository extends JpaRepository<AirPort, Integer> {
    List<AirPort> findByAirportNameContainingIgnoreCase(String airportName);
}
