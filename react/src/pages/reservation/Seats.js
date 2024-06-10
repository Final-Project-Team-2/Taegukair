import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {callGetAllSeatsByFlightAPI} from '../../apis/SeatAPICalls';
import IconWindowPossible from '../../asset/seats/seat_window_possible.png';
import IconWindowImpossible from '../../asset/seats/seat_window_impossible.png';
import IconPetPossible from '../../asset/seats/seat_pet_possible.png';
import IconPetImpossible from '../../asset/seats/seat_pet_impossible.png';
import IconComfortPossible from '../../asset/seats/seat_comfort_possible.png';
import IconComfortImpossible from '../../asset/seats/seat_comfort_impossible.png';
import IconNormalPossible from '../../asset/seats/seat_possible.png';
import IconNormalImpossible from '../../asset/seats/seat_impossible.png';
import "./Seats.css";

const ChooseSeat = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { departureFlight, returnFlight, baggageInfo } = location.state;
    
    const departureFlightInfo = departureFlight || {};

    const returnFlightInfo = returnFlight || {};

    const departureSeats = useSelector(state => state.seat.departureSeats);

    const returnSeats = useSelector(state => state.seat.returnSeats);

    const [selectedDepartureSeat, setSelectedDepartureSeat] = useState('');

    const [selectedReturnSeat, setSelectedReturnSeat] = useState('');

    useEffect(() => {
        if (departureFlightInfo.flightId) {
            const flightId = departureFlightInfo.flightId;
            dispatch(callGetAllSeatsByFlightAPI({ flightId, isReturnFlight: false }));
        }
    
        if (returnFlightInfo.flightId) {
            const flightId = returnFlightInfo.flightId;
            dispatch(callGetAllSeatsByFlightAPI({ flightId, isReturnFlight: true }));
        }
    }, [dispatch, departureFlightInfo.flightId, returnFlightInfo.flightId]);

    const handleConfirm = () => {
        if (selectedDepartureSeat && !returnFlightInfo.flightId) {
            navigate('/reservation/searchresults/registreservation', {
                state: {
                    initialDepartureSeat: selectedDepartureSeat,
                    initialReturnSeat: selectedReturnSeat,
                    departureFlight: departureFlightInfo,
                    returnFlight: returnFlightInfo,
                    baggageInfo: baggageInfo
                }
            });
        } else if (selectedDepartureSeat && selectedReturnSeat) {
            navigate('/reservation/searchresults/registreservation', {
                state: {
                    initialDepartureSeat: selectedDepartureSeat,
                    initialReturnSeat: selectedReturnSeat,
                    departureFlight: departureFlightInfo,
                    returnFlight: returnFlightInfo,
                    baggageInfo: baggageInfo
                }
            });
        } else {
            alert("좌석을 선택해 주세요!");
        }
    };

    const handleDepartureSeatSelection = (seat) => {
        setSelectedDepartureSeat(seat);
    }

    const handleReturnSeatSelection = (seat) => {
        setSelectedReturnSeat(seat);
    }
    
    if(departureFlightInfo) {
        console.log("departureFlightInfo : ", departureFlightInfo);
    }

    if(returnSeats) {
        console.log("returnSeats : ", returnSeats);
    }

    return (
        <div>
            <h1>좌석 선택</h1>
            <div className="seat-row">
            <div className="seat-column">
                <h2>출발 좌석</h2>
                <div className="seat-container">
                {departureSeats && departureSeats.data && departureSeats.data.length > 0 ? (
                    departureSeats.data.map(dSeat => {
                        let icon;
                        switch (dSeat.seatType.seatTypeId) {
                            case 1:
                                icon = dSeat.reserved ? IconWindowImpossible : IconWindowPossible;
                                break;
                            case 2:
                                icon = dSeat.reserved ? IconPetImpossible : IconPetPossible;
                                break;
                            case 3:
                                icon = dSeat.reserved ? IconComfortImpossible : IconComfortPossible;
                                break;
                            case 4:
                                icon = dSeat.reserved ? IconNormalImpossible : IconNormalPossible;
                                break;
                            default:
                                icon = null;
                        }

                        return (
                            <button
                                className='seats'
                                key={dSeat.seatNo}
                                onClick={() => handleDepartureSeatSelection(dSeat)}
                                disabled={dSeat.reserved}
                            >
                                {icon && <img src={icon} alt="Seat Icon" />}
                                {dSeat.seatNo}
                            </button>
                        );
                    })
                ) : (
                    null
                )}
                </div>
            </div>
            <div>
                {returnSeats && returnSeats.data && returnSeats.data.length > 0 ? (
                    <>
                    <div className="seat-column">
                    <h2>귀국 좌석</h2>
                    <div className="seat-container">
                    {returnSeats.data.map(rSeat => {
                        let icon;
                        switch (rSeat.seatType.seatTypeId) {
                            case 1:
                                icon = rSeat.reserved ? IconWindowImpossible : IconWindowPossible;
                                break;
                            case 2:
                                icon = rSeat.reserved ? IconPetImpossible : IconPetPossible;
                                break;
                            case 3:
                                icon = rSeat.reserved ? IconComfortImpossible : IconComfortPossible;
                                break;
                            case 4:
                                icon = rSeat.reserved ? IconNormalImpossible : IconNormalPossible;
                                break;
                            default:
                                icon = null;
                        }

                        return (
                            <button
                                className='seats'
                                key={rSeat.seatNo}
                                onClick={() => handleReturnSeatSelection(rSeat)}
                                disabled={rSeat.reserved}
                            >
                                {icon && <img src={icon} alt="Seat Icon" />}
                                {rSeat.seatNo}
                            </button>
                        );
                    })}
                    </div>
                    </div>
                    </>
                ) : (
                    null
                )}
            </div>
            <button onClick={handleConfirm}>좌석 확인</button>
            <br/>
            <br/>
        </div>
        </div>
    );
}

export default ChooseSeat;