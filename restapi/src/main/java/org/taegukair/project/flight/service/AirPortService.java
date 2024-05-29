package org.taegukair.project.flight.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.flight.dto.AirPortDTO;
import org.taegukair.project.flight.entity.AirPort;
import org.taegukair.project.flight.repository.AirPortRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AirPortService {

    private final AirPortRepository airPortRepository;

    @Autowired
    public AirPortService(AirPortRepository airPortRepository) {
        this.airPortRepository = airPortRepository;
    }

    // 전체 공항 목록 조회
    public List<AirPortDTO> getAllAirPorts() {
        List<AirPort> airPorts = airPortRepository.findAll();
        return airPorts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 공항 이름으로 검색
    public List<AirPortDTO> findAirPort(String airportName) {
        List<AirPort> airPorts = airPortRepository.findByAirportNameContainingIgnoreCase(airportName);
        return airPorts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 공항 상세 정보 조회
    public AirPortDTO getAirPortDetail(int airportId) {
        AirPort airPort = airPortRepository.findById(airportId)
                .orElseThrow(() -> new RuntimeException("Airport not found"));
        return convertToDTO(airPort);
    }

    // 공항 등록
    public AirPortDTO addAirPort(AirPortDTO airPortDTO) {
        AirPort airPort = convertToEntity(airPortDTO);
        AirPort savedAirPort = airPortRepository.save(airPort);
        return convertToDTO(savedAirPort);
    }

    // 공항 수정
    public AirPortDTO updateAirPort(int airportId, AirPortDTO airPortDTO) {
        AirPort existingAirPort = airPortRepository.findById(airportId)
                .orElseThrow(() -> new RuntimeException("Airport not found"));
        existingAirPort.setAirportName(airPortDTO.getAirportName());
        existingAirPort.setAirportIata(airPortDTO.getAirportIata());
        existingAirPort.setAirportLocation(airPortDTO.getAirportLocation());
        AirPort updatedAirPort = airPortRepository.save(existingAirPort);
        return convertToDTO(updatedAirPort);
    }

    // 공항 삭제
    public void deleteAirPort(int airportId) {
        AirPort existingAirPort = airPortRepository.findById(airportId)
                .orElseThrow(() -> new RuntimeException("Airport not found"));
        airPortRepository.delete(existingAirPort);
    }

    private AirPortDTO convertToDTO(AirPort airPort) {
        return new AirPortDTO(
                airPort.getAirportId(),
                airPort.getAirportName(),
                airPort.getAirportIata(),
                airPort.getAirportLocation()
        );
    }

    private AirPort convertToEntity(AirPortDTO airPortDTO) {
        return new AirPort(
                airPortDTO.getAirportId(),
                airPortDTO.getAirportName(),
                airPortDTO.getAirportIata(),
                airPortDTO.getAirportLocation()
        );
    }
}
