package org.taegukair.project.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.board.service.BoardService;
import org.taegukair.project.flight.dto.ResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/airports")
public class BoardController {

    private final BoardService airPortService;

    @Autowired
    public BoardController(BoardService airPortService) {
        this.airPortService = airPortService;
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseDTO> findAirPort(@RequestParam(name = "s", defaultValue = "all") String airportName) {
        List<BoardDTO> airPorts = airPortService.findAirPort(airportName);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", airPorts));
    }

    @GetMapping("/{airportId}")
    public ResponseEntity<ResponseDTO> getAirPortDetail(@PathVariable Long airportId) {
        BoardDTO airPort = airPortService.getAirPortDetail(airportId);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공항 상세정보 조회 성공", airPort));
    }

    @PostMapping("/registAirPort")
    public ResponseEntity<ResponseDTO> addAirPort(@RequestBody BoardDTO airPortDTO) {
        BoardDTO createdAirPort = airPortService.addAirPort(airPortDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공항 등록 성공", createdAirPort));
    }

    @PutMapping("/{airportId}")
    public ResponseEntity<ResponseDTO> updateAirPort(@PathVariable Long airportId, @RequestBody BoardDTO airPortDTO) {
        BoardDTO updatedAirPort = airPortService.updateAirPort(airportId, airPortDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공항 수정 성공", updatedAirPort));
    }

    @DeleteMapping("/{airportId}")
    public ResponseEntity<ResponseDTO> deleteAirPort(@PathVariable Long airportId) {
        airPortService.deleteAirPort(airportId);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공항 삭제 성공", null));
    }
}
