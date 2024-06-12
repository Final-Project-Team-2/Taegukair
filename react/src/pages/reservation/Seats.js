import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callGetAllSeatsByFlightAPI } from '../../apis/SeatAPICalls';
import IconWindowPossible from '../../asset/seats/seat_window_possible.png';
import IconWindowImpossible from '../../asset/seats/seat_window_impossible.png';
import IconPetPossible from '../../asset/seats/seat_pet_possible.png';
import IconPetImpossible from '../../asset/seats/seat_pet_impossible.png';
import IconComfortPossible from '../../asset/seats/seat_comfort_possible.png';
import IconComfortImpossible from '../../asset/seats/seat_comfort_impossible.png';
import IconNormalPossible from '../../asset/seats/seat_possible.png';
import IconNormalImpossible from '../../asset/seats/seat_impossible.png';
import './Seats.css';

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
        const fetchSeats = async () => {
            if (departureFlightInfo.flightId) {
                const flightId = departureFlightInfo.flightId;
                dispatch(callGetAllSeatsByFlightAPI({ flightId, isReturnFlight: false }));
            }

            if (returnFlightInfo.flightId) {
                const flightId = returnFlightInfo.flightId;
                dispatch(callGetAllSeatsByFlightAPI({ flightId, isReturnFlight: true }));
            }
        };

        fetchSeats();
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
            alert("모든 좌석을 선택해 주세요!");
        }
    };

    const handleDepartureSeatSelection = (seat) => {
        setSelectedDepartureSeat(seat);
    };

    const handleReturnSeatSelection = (seat) => {
        setSelectedReturnSeat(seat);
    };

    return (
        <div className="container">
            <h1>좌석 선택</h1>

            <div className="seat-section">
                <h2>출발 좌석</h2>
                <div className="seats-container">
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
                                    className={`seats ${selectedDepartureSeat === dSeat ? 'selected' : ''}`}
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
                        <p>좌석 정보를 불러오는 중입니다...</p>
                    )}
                </div>
            </div>
            {returnFlightInfo.flightId && (
                <div className="seat-section">
                    <h2>귀국 좌석</h2>
                    <div className="seats-container">
                        {returnSeats && returnSeats.data && returnSeats.data.length > 0 ? (
                            returnSeats.data.map(rSeat => {
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
                                        className={`seats ${selectedReturnSeat === rSeat ? 'selected' : ''}`}
                                        key={rSeat.seatNo}
                                        onClick={() => handleReturnSeatSelection(rSeat)}
                                        disabled={rSeat.reserved}
                                    >
                                        {icon && <img src={icon} alt="Seat Icon" />}
                                        {rSeat.seatNo}
                                    </button>
                                );
                            })
                        ) : (
                            <p>좌석 정보를 불러오는 중입니다...</p>
                        )}
                    </div>
                </div>
            )}
            <button className="confirm-button" onClick={handleConfirm}>확인</button>

        </div>
    );
};

export default ChooseSeat;
