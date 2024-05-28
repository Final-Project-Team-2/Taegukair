package org.taegukair.project.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByAirportNameContainingIgnoreCase(String airportName);
}
