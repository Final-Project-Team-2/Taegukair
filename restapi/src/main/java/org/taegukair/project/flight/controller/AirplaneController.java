package org.taegukair.project.flight.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.common.ResponseDTO;
import org.taegukair.project.flight.dto.AirplaneDTO;
import org.taegukair.project.flight.service.AirplaneService;

@RestController
@RequestMapping("/api/v1/airplane")
public class AirplaneController {

        private final AirplaneService airplaneService;

    public AirplaneController(AirplaneService airplaneService) {
        this.airplaneService = airplaneService;
    }

    @Operation(summary = "항공기 전체 조회 요청", description = "항공기 조회가 진행됩니다.", tags = {"AirplaneController"})
    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> findAllAirplane() {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공기 조회 성공", airplaneService.findAllAirplane()));
    }

    @Operation(summary = "항공기 상세 조회 요청", description = "항공기 상세 조회가 진행됩니다.", tags = {"AirplaneController"})
    @GetMapping("/{airplaneId}")
    public ResponseEntity<ResponseDTO> findAirplane(@PathVariable int airplaneId) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공기 상세 조회 성공", airplaneService.findAirplane(airplaneId)));
    }

    @Operation(summary = "항공기 등록 요청", description = "항공기 등록이 진행됩니다.", tags = {"AirplaneController"})
    @PostMapping("/registairplane")
    public ResponseEntity<ResponseDTO> saveAirplane(@RequestBody AirplaneDTO airplaneDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공기 등록 성공", airplaneService.saveAirplane(airplaneDTO)));
    }

    @Operation(summary = "항공기 수정 요청", description = "항공기 수정이 진행됩니다.", tags = {"AirplaneController"})
    @PostMapping("/{airplaneId}")
    public ResponseEntity<ResponseDTO> updateAirplane(@PathVariable int airplaneId, @RequestBody AirplaneDTO airplaneDTO) {
        // airplaneId를 사용하여 어떤 항공기를 수정할 것인지 결정.
        // airplaneDTO를 사용하여 수정할 항공기의 정보를 제공.

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공기 수정 성공", airplaneService.updateAirplane(airplaneId, airplaneDTO)));
    }

    @Operation(summary = "항공기 삭제 요청", description = "항공기 삭제가 진행됩니다.", tags = {"AirplaneController"})
    @DeleteMapping("/{airplaneId}")
    public ResponseEntity<ResponseDTO> deleteAirplane(@PathVariable int airplaneId) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "항공기 삭제 성공", airplaneService.deleteAirplane(airplaneId)));
    }



}
