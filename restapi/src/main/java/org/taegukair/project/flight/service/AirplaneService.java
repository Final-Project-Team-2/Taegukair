package org.taegukair.project.flight.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.taegukair.project.flight.dto.AirplaneDTO;
import org.taegukair.project.flight.entity.Airplane;
import org.taegukair.project.flight.repository.AirplaneRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AirplaneService {

    private static final Logger log = LoggerFactory.getLogger(AirplaneService.class);
    private final AirplaneRepository airplaneRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AirplaneService(AirplaneRepository airplaneRepository, ModelMapper modelMapper) {
        this.airplaneRepository = airplaneRepository;
        this.modelMapper = modelMapper;
    }

    public Object findAllAirplane() {

        log.info("[AirplaneService] findAllAirplane() Start");

        List<Airplane> airplaneList = airplaneRepository.findAll();

        log.info("[AirplaneService] airplaneList : {}", airplaneList);

        log.info("[AirplaneService] findAllAirplane() End");

        return airplaneList.stream().map(airplane -> modelMapper.map(airplane, Airplane.class)).collect(Collectors.toList());
    }

    public Object findAirplane(int airplaneId) {

        log.info("[AirplaneService] findAirplane() Start");

        Airplane airplane = airplaneRepository.findById(airplaneId).get();

        log.info("[AirplaneService] findAirplane() End");

        return modelMapper.map(airplane, Airplane.class);

    }

    @Transactional
    public Object saveAirplane(AirplaneDTO airplaneDTO) {

        log.info("[AirplaneService] saveAirplane() Start");

        int result = 0;

        try {
            Airplane newAirplane = modelMapper.map(airplaneDTO, Airplane.class);

            airplaneRepository.save(newAirplane);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);

        }

        log.info("[AirplaneService] saveAirplane() End");
        return (result > 0) ? "항공기 입력 성공" : "항공기 입력 실패";
    }

    @Transactional
    public Object updateAirplane(int airplaneId, AirplaneDTO airplaneDTO) {

        log.info("[AirplaneService] updateAirplane() Start");

        int result = 0;

        try {

            Airplane airplane = airplaneRepository.findById(airplaneId).get();

            airplane.setAirplaneNo(airplaneDTO.getAirplaneNo());
            airplane.setAirplaneName(airplaneDTO.getAirplaneName());
            airplane.setAirplaneSeat(airplaneDTO.getAirplaneSeat());

            result = 1;

        } catch (Exception e) {
            log.info("[AirplaneService] Update Exception");
            throw new RuntimeException(e);
        }

        log.info("[AirplaneService] updateAirplane() End");
        return (result > 0) ? "항공기 업데이트 성공" : "항공기 업데이트 실패";
    }

    @Transactional
    public Object deleteAirplane(int airplaneId) {

        int result = 0;
        
        log.info("[AirplaneService] deleteAirplane() Start");

        try {

            airplaneRepository.deleteById(airplaneId);

            result = 1;
        } catch (Exception e) {

            log.info("[AirplaneService] Delete Exception");
            
            
        }

        log.info("[AirplaneService] deleteAirplane() End");

        return (result > 0) ? "항공기 삭제 성공" : "항공기 삭제 실패";
    }





}
