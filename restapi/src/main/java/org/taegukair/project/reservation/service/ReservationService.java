package org.taegukair.project.reservation.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.taegukair.project.flight.entity.Flight;
import org.taegukair.project.flight.entity.Seat;
import org.taegukair.project.flight.repository.FlightRepository;
import org.taegukair.project.flight.repository.SeatRepository;
import org.taegukair.project.flight.service.FlightService;
import org.taegukair.project.member.entity.Coupon;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.MemberRepository;
import org.taegukair.project.reservation.dto.ReservationDTO;
import org.taegukair.project.reservation.entity.Reservation;
import org.taegukair.project.reservation.repository.ReservationRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private static final Logger log = LoggerFactory.getLogger(FlightService.class);
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;
    private final FlightRepository flightRepository;
    private final SeatRepository seatRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, MemberRepository memberRepository, ModelMapper modelMapper, FlightRepository flightRepository, SeatRepository seatRepository) {
        this.reservationRepository = reservationRepository;
        this.memberRepository = memberRepository;
        this.flightRepository = flightRepository;
        this.seatRepository = seatRepository;
        this.modelMapper = modelMapper;
    }

    public Object findAllReservations() {

        log.info("[ReservationService] findAllReservations() Start");

        List<Reservation> reservationList = reservationRepository.findAll();

        log.info("[ReservationService] reservationList : {}", reservationList);

        log.info("[ReservationService] findAllReservations() End");

        return reservationList.stream().map(reservation -> modelMapper.map(reservation, Reservation.class)).collect(Collectors.toList());
    }

    public Object findReservation(String reservationNo) {

        log.info("[ReservationService] findReservation() Start");

//        Reservation reservation = reservationRepository.findByReservationNo(reservationNo).get();

        Reservation reservation = null;

        Optional<Reservation> optionalReservation = reservationRepository.findByReservationNo(reservationNo);
        if (optionalReservation.isPresent()) {
            reservation = optionalReservation.get();

        } else {
            throw new RuntimeException("예약이 존재하지 않습니다.");
        }

        log.info("[ReservationService] findReservation() end");

        return modelMapper.map(reservation, Reservation.class);
    }

    @Transactional
    public Object saveReservation(ReservationDTO reservationDTO) {

        log.info("[ReservationService] saveReservation() Start");

        int result = 0;

        log.info("reservationDTO : {}", reservationDTO);

        String uniqueReservationId;
        do {
            uniqueReservationId = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8).toUpperCase();
        } while (reservationRepository.existsByReservationNo(uniqueReservationId));

        log.info("uniqueReservationId : {}", uniqueReservationId);

        try {

            Reservation newReservation = new Reservation();

            newReservation.setReservationNo(uniqueReservationId);

            Member member = memberRepository.findById(reservationDTO.getMember())
                    .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다"));

            newReservation.setMember(member);

            Flight flight = flightRepository.findById(reservationDTO.getFlight())
                    .orElseThrow(() -> new RuntimeException("항공편을 찾을 수 없습니다"));

            newReservation.setFlight(flight);

            Seat seat = seatRepository.findById(reservationDTO.getSeat())
                    .orElseThrow(() -> new RuntimeException("좌석을 찾을 수 없습니다"));

            newReservation.setSeat(seat);

//            Coupon coupon = couponRepository.findById(reservationDTO.getCoupon())
//                    .orElse(null);

//            Coupon coupon = null;
//
//            newReservation.setCoupon(coupon);

            newReservation.setBaggageAmount(reservationDTO.getBaggageAmount());
            newReservation.setExtraBaggageAmount(reservationDTO.getExtraBaggageAmount());
            newReservation.setBaggagePrice(reservationDTO.getBaggagePrice());
            newReservation.setReservationDate(reservationDTO.getReservationDate());

            log.info("newReservation : {}", newReservation);

            reservationRepository.save(newReservation);

            seat.setReserved(true);

//            coupon.setPossible(false);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[ReservationService] saveReservation End");

        return (result > 0) ? "예약 성공" : "예약 실패";
    }

    public Object deleteReservation(String reservationNo) {

        int result = 0;

        log.info("[ReservationService] deleteReservation Start");

        try {

            Optional<Reservation> optionalReservation = reservationRepository.findByReservationNo(reservationNo);

            if (optionalReservation.isPresent()) {
                Reservation reservation = optionalReservation.get();

                Seat seat = reservation.getSeat();

                seat.setReserved(false);

            } else {
                throw new RuntimeException("예약이 존재하지 않습니다.");
            }



            reservationRepository.deleteByReservationNo(reservationNo);




            result = 1;
        } catch (Exception e) {

            log.info("[ReservationService] Delete Exception");

        }

        log.info("[ReservationService] deleteReservation End");

        return (result > 0) ? "예약 삭제 성공" : "예약 삭제 실패";

    }
}
