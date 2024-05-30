package org.taegukair.project.flight.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.taegukair.project.flight.dto.FlightDTO;
import org.taegukair.project.flight.entity.AirPort;
import org.taegukair.project.flight.entity.Airplane;
import org.taegukair.project.flight.entity.Flight;
import org.taegukair.project.flight.repository.AirPortRepository;
import org.taegukair.project.flight.repository.AirplaneRepository;
import org.taegukair.project.flight.repository.FlightRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private static final Logger log = LoggerFactory.getLogger(FlightService.class);
    private final AirplaneRepository airplaneRepository;
    private final AirPortRepository airPortRepository;
    private final FlightRepository flightRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FlightService(AirplaneRepository airplaneRepository, AirPortRepository airPortRepository, FlightRepository flightRepository, ModelMapper modelMapper) {
        this.airplaneRepository = airplaneRepository;
        this.airPortRepository = airPortRepository;
        this.flightRepository = flightRepository;
        this.modelMapper = modelMapper;
    }


    public Object findAllFlights() {

        log.info("[FlightService] findAllFlights() Start");

        List<Flight> flightsList = flightRepository.findAll();

        log.info("[FlightService] flightsList : {}", flightsList);

        log.info("[FlightService] findAllFlight() End");

        return flightsList.stream().map(flight -> modelMapper.map(flight, Flight.class)).collect(Collectors.toList());
    }

    public Object findFlight(int flightId) {

        log.info("[FlightService] findFlight() Start");

        Flight flight = flightRepository.findById(flightId).get();

        log.info("[FlightService] findFlight() End");

        return modelMapper.map(flight, Flight.class);
    }

    @Transactional
    public Object saveFlight(FlightDTO flightDTO) {

        log.info("[FlightService] saveFlight() Start");

        int result = 0;

        log.info("flightDTO : {}", flightDTO);

        try {
            Flight newFlight = new Flight();

            newFlight.setStartTime(flightDTO.getStartTime());
            newFlight.setEndTime(flightDTO.getEndTime());
            newFlight.setFlightPrice(flightDTO.getFlightPrice());

            Airplane airplane = airplaneRepository.findById(flightDTO.getAirplane())
                            .orElseThrow(() -> new RuntimeException("항공기를 찾을 수 없습니다"));

            newFlight.setAirplane(airplane);

            AirPort startAirPort = airPortRepository.findById(flightDTO.getStartAirPort())
                    .orElseThrow(() -> new RuntimeException("출발공항을 찾을 수 없습니다"));

            newFlight.setStartAirPort(startAirPort);

            AirPort endAirPort = airPortRepository.findById(flightDTO.getEndAirPort())
                    .orElseThrow(() -> new RuntimeException("도착공항을 찾을 수 없습니다"));

            newFlight.setEndAirPort(endAirPort);

            log.info("newFlight : {}", newFlight);

            flightRepository.save(newFlight);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("[FlightService] saveFlight() End");
        return (result > 0) ? "항공편 등록 성공" : "항공편 등록 실패";
    }

    @Transactional
    public Object updateFlight(int flightId, FlightDTO flightDTO) {

        log.info("[FlightService] updateFlight() Start");

        Flight flight = flightRepository.findById(flightId).get();

        Airplane airplane = flight.getAirplane();

        AirPort startAirPort = flight.getStartAirPort();

        AirPort endAirPort = flight.getEndAirPort();

        Airplane newAirplane = airplaneRepository.findById(flightDTO.getAirplane())
                .orElseThrow(() -> new RuntimeException("항공기를 찾을 수 없습니다"));

        AirPort newStartAirPort = airPortRepository.findById(flightDTO.getStartAirPort())
                .orElseThrow(() -> new RuntimeException("출발공항을 찾을 수 없습니다"));

        AirPort newEndAirPort = airPortRepository.findById(flightDTO.getEndAirPort())
                .orElseThrow(() -> new RuntimeException("도착공항을 찾을 수 없습니다"));

        int result = 0;

        try {

            flight.setStartTime(flightDTO.getStartTime());
            flight.setEndTime(flightDTO.getEndTime());
            flight.setFlightPrice(flightDTO.getFlightPrice());

            flight.setAirplane(newAirplane);
            flight.setStartAirPort(newStartAirPort);
            flight.setEndAirPort(newEndAirPort);

            result = 1;

        } catch (Exception e) {
            log.info("[FlightService] Update Exception");
            throw new RuntimeException(e);
        }

        log.info("[FlightService] updateFlight() End");

        return (result > 0) ? "항공편 업데이트 성공" : "항공편 업데이트 실패";
    }

    @Transactional
    public Object deleteFlight(int flightId) {

        int result = 0;

        log.info("[FlightService] deleteFlight() Start");

        try {

            flightRepository.deleteById(flightId);

            result = 1;
        } catch (Exception e) {

            log.info("[FlightService] Delete Exception");

        }

        log.info("[FlightService] deleteFlight() End");

        return (result > 0) ? "항공편 삭제 성공" : "항공편 삭제 실패";
    }

    public List<Flight> findFlightsByStartAirPortAndStartTime(int airportId, LocalDateTime selectedDate) {

        log.info("[FlightService] findFlightsByStartAirPortAndStartTime() Start");

        AirPort startAirPort = airPortRepository.findById(airportId).get();

        LocalDateTime startDateTime = selectedDate.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endDateTime = selectedDate.withHour(23).withMinute(59).withSecond(59);

        List<Flight> flightListStartAirPort = flightRepository.findByStartAirPortAndStartTimeBetween(startAirPort, startDateTime, endDateTime);

        log.info("[FlightService] flightListStartAirPort : {}", flightListStartAirPort);

        log.info("[FlightService] findFlightsByStartAirPortAndStartTime() End");

        return flightListStartAirPort.stream().map(flight -> modelMapper.map(flight, Flight.class)).collect(Collectors.toList());
    }

    public List<Flight> findFlightsByEndAirPortAndStartTime(int airportId, LocalDateTime selectedDate) {

        log.info("[FlightService] findFlightsByEndAirPortAndStartTime() Start");

        AirPort endAirPort = airPortRepository.findById(airportId).get();

        LocalDateTime startDateTime = selectedDate.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endDateTime = selectedDate.withHour(23).withMinute(59).withSecond(59);

        List<Flight> flightListEndAirPort = flightRepository.findByEndAirPortAndStartTimeBetween(endAirPort, startDateTime, endDateTime);

        log.info("[FlightService] flightListEndAirPort : {}", flightListEndAirPort);

        log.info("[FlightService] findFlightsByEndAirPortAndStartTime() End");

        return flightListEndAirPort.stream().map(flight -> modelMapper.map(flight, Flight.class)).collect(Collectors.toList());
    }

    public List<Flight> findFlightsByStartAirPortAndEndAirPortAndStartTime(int startAirportId, int endAirportId, LocalDateTime selectedDate) {

        log.info("[FlightService] findFlightsByStartAirPortAndEndAirPortAndStartTime() Start");

        AirPort startAirPort = airPortRepository.findById(startAirportId).get();
        AirPort endAirPort = airPortRepository.findById(endAirportId).get();

        LocalDateTime startDateTime = selectedDate.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endDateTime = selectedDate.withHour(23).withMinute(59).withSecond(59);

        List<Flight> flightListStartAirPortAndEndAirPort = flightRepository.findByStartAirPortAndEndAirPortAndStartTimeBetween(startAirPort, endAirPort, startDateTime, endDateTime);

        log.info("[FlightService] flightListStartAirPortAndEndAirPort : {}", flightListStartAirPortAndEndAirPort);

        log.info("[FlightService] findFlightsByStartAirPortAndEndAirPortAndStartTime() End");

        return flightListStartAirPortAndEndAirPort.stream().map(flight -> modelMapper.map(flight, Flight.class)).collect(Collectors.toList());
    }
}
