package org.taegukair.project.flight.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.common.ResponseDTO;
import org.taegukair.project.flight.service.SeatService;

@RestController
@RequestMapping("/api/v1/Seat")
public class SeatController {

    private final SeatService seatservice;

    public SeatController(SeatService seatservice) {
        this.seatservice = seatservice;
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> getAllSeatsInFlight(@RequestParam int flightId) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 좌석 조회 성공", seatservice.findAllSeatsByFlight(flightId)));
    }
}
