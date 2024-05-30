package org.taegukair.project.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.flight.entity.Flight;
import org.taegukair.project.flight.entity.Seat;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Integer> {


    List<Seat> findSeatByFlight(Flight flight);
}
