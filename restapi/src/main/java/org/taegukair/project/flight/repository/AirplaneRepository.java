package org.taegukair.project.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.flight.entity.Airplane;

public interface AirplaneRepository extends JpaRepository<Airplane, Integer> {

}
