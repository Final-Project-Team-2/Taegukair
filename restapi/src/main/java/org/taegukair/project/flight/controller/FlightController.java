package org.taegukair.project.flight.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.common.ResponseDTO;
import org.taegukair.project.flight.dto.FlightDTO;
import org.taegukair.project.flight.service.FlightService;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/flights")
public class FlightController {

    private final FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> getAllFlights() {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 조회 성공", flightService.findAllFlights()));
    }

    @GetMapping("/{flightId}")
    public ResponseEntity<ResponseDTO> getFlightById(@PathVariable int flightId) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 상세 조회 성공", flightService.findFlight(flightId)));
    }

    @PostMapping("/addflight")
    public ResponseEntity<ResponseDTO> addFlight(@RequestBody FlightDTO flightDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 추가 성공", flightService.saveFlight(flightDTO)));
    }

    @PutMapping("/{flightId}")
    public ResponseEntity<ResponseDTO> updateFlight(@PathVariable int flightId, @RequestBody FlightDTO flightDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 수정 성공", flightService.updateFlight(flightId, flightDTO)));
    }

    @DeleteMapping("/{flightId}")
    public ResponseEntity<ResponseDTO> deleteFlight(@PathVariable int flightId) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 삭제 성공", flightService.deleteFlight(flightId)));
    }

    @GetMapping("/startairport")
    public ResponseEntity<ResponseDTO> searchFlightsByStartAirPortAndStartTime(@RequestParam("startAirport") int airportId,
                                                                               @RequestParam("selectedDate") LocalDateTime selectedDate) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 조건별 조회 성공", flightService.findFlightsByStartAirPortAndStartTime(airportId, selectedDate)));

    }

    @GetMapping("/endairport")
    public ResponseEntity<ResponseDTO> searchFlightsByEndAirPortAndStartTime(@RequestParam("endAirport") int airportId,
                                                                             @RequestParam("selectedDate") LocalDateTime selectedDate) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 조건별 조회 성공", flightService.findFlightsByEndAirPortAndStartTime(airportId, selectedDate)));

    }

    @GetMapping("/bothairport")
    public ResponseEntity<ResponseDTO> searchFlightsByStartAirPortAndEndAirPortAndStartTime(@RequestParam("startAirport") int startAirportId,
                                                                                            @RequestParam("endAirport") int endAirportId,
                                                                                            @RequestParam("selectedDate") LocalDateTime selectedDate) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공편 조건별 조회 성공", flightService.findFlightsByStartAirPortAndEndAirPortAndStartTime(startAirportId, endAirportId, selectedDate)));

    }


}
