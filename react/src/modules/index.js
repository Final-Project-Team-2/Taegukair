import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import airplaneReducer from './AirplaneModule';
import reservationReducer from './ReservationModule';
import familyReducer from './FamilyModule'; // FamilyModule을 추가합니다.
import petsReducer from './PetsModule'; // PetsModule을 추가합니다.
import couponReducer from './CouponModule';
import flightReducer from './FlightModule';
import seatReducer from './SeatModule';

const rootReducer = combineReducers({
    member: memberReducer,
    airplane: airplaneReducer,
    reservation: reservationReducer,
    family: familyReducer,
    pets: petsReducer,
    coupon: couponReducer,
    flight: flightReducer,
    seat: seatReducer
});

export default rootReducer;
