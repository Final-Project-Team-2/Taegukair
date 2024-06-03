import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import airplaneReducer from './AirplaneModule';
import reservationReducer from './ReservationModule';
import familyReducer from './FamilyModule'; // FamilyModule을 추가합니다.
import petsReducer from './PetsModule'; // PetsModule을 추가합니다.

const rootReducer = combineReducers({
    member: memberReducer,
    airplane: airplaneReducer,
    reservation: reservationReducer,
    family: familyReducer,
    pets: petsReducer,
});

export default rootReducer;
