package org.taegukair.project.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.flight.entity.Seat;

public interface SeatRepository extends JpaRepository<Seat, String> {
}
