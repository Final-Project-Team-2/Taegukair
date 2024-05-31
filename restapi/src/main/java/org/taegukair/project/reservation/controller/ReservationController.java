package org.taegukair.project.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.common.ResponseDTO;
import org.taegukair.project.reservation.dto.ReservationDTO;
import org.taegukair.project.reservation.service.ReservationService;

@RestController
@RequestMapping("api/v1")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/admin/reservations")
    public ResponseEntity<ResponseDTO> getAllReservations() {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 예약 조회 성공", reservationService.findAllReservations()));
    }

    @GetMapping("/admin/reservation/detail")
    public ResponseEntity<ResponseDTO> getReservation(@RequestParam String reservationNo) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "예약 상세 조회 성공", reservationService.findReservation(reservationNo)));
    }

    // 주소 부분 마이 페이지 완료될 시 수정할 것
    // 남의 예약 정보를 어떻게 조회하지 못하게 할 지 생각할 것
    @GetMapping("/mypage/reservation")
    public ResponseEntity<ResponseDTO> getMyReservation(@RequestParam String reservationNo) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "예약 상세 조회 성공", reservationService.findReservation(reservationNo)));
    }

    @PostMapping("/reservationSuccess")
    public ResponseEntity<ResponseDTO> addReservation(@RequestBody ReservationDTO reservationDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "예약 성공", reservationService.saveReservation(reservationDTO)));
    }

    @DeleteMapping("/mypage/reservation")
    public ResponseEntity<ResponseDTO> deleteReservation(@RequestParam String reservationNo) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "예약 취소 성공", reservationService.deleteReservation(reservationNo)));
    }

}
