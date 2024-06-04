import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import airplaneReducer from './AirplaneModule';
import reservationReducer from './ReservationModule';
import familyReducer from './FamilyModule'; // FamilyModule을 추가합니다.
import petsReducer from './PetsModule'; // PetsModule을 추가합니다.
import couponReducer from './CouponModule';
import boardReducer from './BoardModule';

const rootReducer = combineReducers({
    member: memberReducer,
    airplane: airplaneReducer,
    reservation: reservationReducer,
    family: familyReducer,
    pets: petsReducer,
    coupon: couponReducer,
    board : boardReducer
});

export default rootReducer;
