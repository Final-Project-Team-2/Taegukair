package org.taegukair.project.board.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.board.repository.BoardRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService {

    private static final Logger log = LoggerFactory.getLogger(BoardService.class);

    @Autowired
    private BoardRepository airPortRepository;

    public BoardService(BoardRepository airPortRepository) {
        this.airPortRepository = airPortRepository;
    }

    public BoardDTO addAirPort(BoardDTO airPortDTO) {
        Board airPort = new Board();
        airPort.setAirportName(airPortDTO.getAirportName());
        airPort.setAirportIata(airPortDTO.getAirportIata());
        airPort.setAirportLocation(airPortDTO.getAirportLocation());
        Board savedAirPort = airPortRepository.save(airPort);
        return new BoardDTO(savedAirPort.getAirportId(), savedAirPort.getAirportName(), savedAirPort.getAirportIata(), savedAirPort.getAirportLocation());
    }

    public List<BoardDTO> findAirPort(String airportName) {
        log.info("Searching for airport with name containing: {}", airportName);
        List<Board> airports = airPortRepository.findByAirportNameContainingIgnoreCase(airportName);
        return airports.stream().map(airPort -> new BoardDTO(airPort.getAirportId(), airPort.getAirportName(), airPort.getAirportIata(), airPort.getAirportLocation())).collect(Collectors.toList());
    }

    public BoardDTO getAirPortDetail(Long airportId) {
        Board airPort = airPortRepository.findById(airportId).orElseThrow(() -> new RuntimeException("공항을 찾을 수 없습니다."));
        return new BoardDTO(airPort.getAirportId(), airPort.getAirportName(), airPort.getAirportIata(), airPort.getAirportLocation());
    }

    public BoardDTO updateAirPort(Long airportId, BoardDTO airPortDTO) {
        Board airPort = airPortRepository.findById(airportId).orElseThrow(() -> new RuntimeException("공항을 찾을 수 없습니다."));
        airPort.setAirportName(airPortDTO.getAirportName());
        airPort.setAirportIata(airPortDTO.getAirportIata());
        airPort.setAirportLocation(airPortDTO.getAirportLocation());
        Board updatedAirPort = airPortRepository.save(airPort);
        return new BoardDTO(updatedAirPort.getAirportId(), updatedAirPort.getAirportName(), updatedAirPort.getAirportIata(), updatedAirPort.getAirportLocation());
    }

    public void deleteAirPort(Long airportId) {
        airPortRepository.deleteById(airportId);
    }
}
