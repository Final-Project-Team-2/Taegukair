package org.taegukair.project.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.flight.entity.SeatClass;

public interface SeatClassRepository extends JpaRepository<SeatClass, Integer> {
}
