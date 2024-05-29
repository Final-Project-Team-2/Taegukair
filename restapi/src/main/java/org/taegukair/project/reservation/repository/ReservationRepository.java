package org.taegukair.project.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.reservation.entity.Reservation;

import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {


    Optional<Reservation> findByReservationNo(String reservationNo);

    boolean existsByReservationNo(String uniqueReservationId);

    void deleteByReservationNo(String reservationNo);
}
