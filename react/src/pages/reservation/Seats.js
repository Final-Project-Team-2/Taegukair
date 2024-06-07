import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {callgetAllSeatsByFlightAPI} from '../../apis/SeatAPICalls';
import IconWindowPossible from '../../asset/seats/seat_window_possible.png';
import IconWindowImpossible from '../../asset/seats/seat_window_impossible.png';
import IconPetPossible from '../../asset/seats/seat_pet_possible.png';
import IconPetImpossible from '../../asset/seats/seat_pet_impossible.png';
import IconComfortPossible from '../../asset/seats/seat_comfort_possible.png';
import IconComfortImpossible from '../../asset/seats/seat_comfort_impossible.png';
import IconNormalPossible from '../../asset/seats/seat_possible.png';
import IconNormalImpossible from '../../asset/seats/seat_impossible.png';

const ChooseSeat = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const flight = location.state.flight || {};

    const seats = useSelector(state => state.seat)

    const [selectedSeat, setSelectedSeat] = useState('');

    useEffect(
        () => {
            if (flight.flightId) {
                const flightId = flight.flightId;
                dispatch(callgetAllSeatsByFlightAPI({flightId}));
            }
        },
        [dispatch, flight.flightId]
    );

    useEffect(
        () => {
            if (seats && seats.length > 0) {
            }
        },
        [seats]
    );

    const handleConfirm = () => {
        if (selectedSeat.seatId) {
            navigate('/reservation/searchresults/registreservation', {
                state: {
                    seat: selectedSeat,
                    flight: flight
                }
            });
        } else {
            alert("좌석을 선택해 주세요!");
        }
    };

    const handleSeatSelection = (seat) => {
        setSelectedSeat(seat);
    }
    
    return (
        <div>
            <h1>좌석 선택</h1>
            <div>
                {seats.map(seat => {
                    let icon;
                    switch (seat.seatType.seatTypeId) {
                        case 1:
                            icon = seat.reserved ? IconWindowImpossible : IconWindowPossible;
                            break;
                        case 2:
                            icon = seat.reserved ? IconPetImpossible : IconPetPossible;
                            break;
                        case 3:
                            icon = seat.reserved ? IconComfortImpossible : IconComfortPossible;
                            break;
                        case 4:
                            icon = seat.reserved ? IconNormalImpossible : IconNormalPossible;
                            break;
                        default:
                            icon = null;
                    }

                    return (
                        <button
                            key={seat.seatNo}
                            onClick={() => handleSeatSelection(seat)}
                            disabled={seat.reserved}
                        >
                            {icon && <img src={icon} alt="Seat Icon" />}
                            {seat.seatNo}
                        </button>
                    );
                })}
            </div>
            <button onClick={handleConfirm}>확인</button>
        </div>
    );
}

export default ChooseSeat;