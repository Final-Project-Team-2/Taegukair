package org.taegukair.project.flight.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.flight.dto.AirPortDTO;
import org.taegukair.project.flight.entity.AirPort;
import org.taegukair.project.flight.repository.AirPortRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AirPortService {

    private static final Logger log = LoggerFactory.getLogger(AirPortService.class);

    @Autowired
    private AirPortRepository airPortRepository;

    public AirPortService(AirPortRepository airPortRepository) {
        this.airPortRepository = airPortRepository;
    }

    public AirPortDTO addAirPort(AirPortDTO airPortDTO) {
        AirPort airPort = new AirPort();
        airPort.setAirportName(airPortDTO.getAirportName());
        airPort.setAirportIata(airPortDTO.getAirportIata());
        airPort.setAirportLocation(airPortDTO.getAirportLocation());
        AirPort savedAirPort = airPortRepository.save(airPort);
        return new AirPortDTO(savedAirPort.getAirportId(), savedAirPort.getAirportName(), savedAirPort.getAirportIata(), savedAirPort.getAirportLocation());
    }

    public List<AirPortDTO> findAirPort(String airportName) {
        log.info("Searching for airport with name containing: {}", airportName);
        List<AirPort> airports = airPortRepository.findByAirportNameContainingIgnoreCase(airportName);
        return airports.stream().map(airPort -> new AirPortDTO(airPort.getAirportId(), airPort.getAirportName(), airPort.getAirportIata(), airPort.getAirportLocation())).collect(Collectors.toList());
    }

    public AirPortDTO getAirPortDetail(Long airportId) {
        AirPort airPort = airPortRepository.findById(airportId).orElseThrow(() -> new RuntimeException("공항을 찾을 수 없습니다."));
        return new AirPortDTO(airPort.getAirportId(), airPort.getAirportName(), airPort.getAirportIata(), airPort.getAirportLocation());
    }

    public AirPortDTO updateAirPort(Long airportId, AirPortDTO airPortDTO) {
        AirPort airPort = airPortRepository.findById(airportId).orElseThrow(() -> new RuntimeException("공항을 찾을 수 없습니다."));
        airPort.setAirportName(airPortDTO.getAirportName());
        airPort.setAirportIata(airPortDTO.getAirportIata());
        airPort.setAirportLocation(airPortDTO.getAirportLocation());
        AirPort updatedAirPort = airPortRepository.save(airPort);
        return new AirPortDTO(updatedAirPort.getAirportId(), updatedAirPort.getAirportName(), updatedAirPort.getAirportIata(), updatedAirPort.getAirportLocation());
    }

    public void deleteAirPort(Long airportId) {
        airPortRepository.deleteById(airportId);
    }
}
