package org.taegukair.project.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.flight.entity.Flight;

public interface FlightRepository extends JpaRepository<Flight, Integer> {
}
