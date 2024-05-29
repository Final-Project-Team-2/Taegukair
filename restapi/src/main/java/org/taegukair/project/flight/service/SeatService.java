package org.taegukair.project.flight.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.flight.entity.Flight;
import org.taegukair.project.flight.entity.Seat;
import org.taegukair.project.flight.repository.FlightRepository;
import org.taegukair.project.flight.repository.SeatRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatService {

    private static final Logger log = LoggerFactory.getLogger(FlightService.class);
    private final SeatRepository seatRepository;
    private final ModelMapper modelMapper;
    private final FlightRepository flightRepository;

    @Autowired
    public SeatService(SeatRepository seatRepository, ModelMapper modelMapper, FlightRepository flightRepository) {
        this.seatRepository = seatRepository;
        this.modelMapper = modelMapper;
        this.flightRepository = flightRepository;
    }

    public Object findAllSeatsByFlight(int flightId) {

        log.info("[SeatService] findAllSeatsByFlight() Start");

        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("항공편이 존재하지 않습니다"));

        List<Seat> seatList = seatRepository.findSeatByFlight(flight);

        log.info("[SeatService] seatsList : {}", seatList);

        log.info("[SeatService] findAllSeatsByFlight() End");

        return seatList.stream().map(seat -> modelMapper.map(seat, Seat.class)).collect(Collectors.toList());
    }
}
