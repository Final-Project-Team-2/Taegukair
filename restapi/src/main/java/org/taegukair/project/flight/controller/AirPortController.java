package org.taegukair.project.flight.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.flight.dto.AirPortDTO;
import org.taegukair.project.flight.dto.ResponseDTO;
import org.taegukair.project.flight.service.AirPortService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/airports")
public class AirPortController {

    private final AirPortService airPortService;

    @Autowired
    public AirPortController(AirPortService airPortService) {
        this.airPortService = airPortService;
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseDTO> findAirPort(@RequestParam(name = "s", defaultValue = "all") String airportName) {
        List<AirPortDTO> airPorts = airPortService.findAirPort(airportName);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", airPorts));
    }

    @GetMapping("/{airportId}")
    public ResponseEntity<ResponseDTO> getAirPortDetail(@PathVariable Long airportId) {
        AirPortDTO airPort = airPortService.getAirPortDetail(airportId);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공항 상세정보 조회 성공", airPort));
    }

    @PostMapping("/registAirPort")
    public ResponseEntity<ResponseDTO> addAirPort(@RequestBody AirPortDTO airPortDTO) {
        AirPortDTO createdAirPort = airPortService.addAirPort(airPortDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공항 등록 성공", createdAirPort));
    }

    @PutMapping("/{airportId}")
    public ResponseEntity<ResponseDTO> updateAirPort(@PathVariable Long airportId, @RequestBody AirPortDTO airPortDTO) {
        AirPortDTO updatedAirPort = airPortService.updateAirPort(airportId, airPortDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공항 수정 성공", updatedAirPort));
    }

    @DeleteMapping("/{airportId}")
    public ResponseEntity<ResponseDTO> deleteAirPort(@PathVariable Long airportId) {
        airPortService.deleteAirPort(airportId);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공항 삭제 성공", null));
    }
}
