package org.taegukair.project.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.flight.entity.SeatType;

public interface SeatTypeRepository extends JpaRepository<SeatType, Integer> {
}
