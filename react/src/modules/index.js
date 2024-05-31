import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import airplaneReducer from './AirplaneModule';
import reservationReducer from './ReservationModule'

const rootReducer = combineReducers({
    memberReducer,
    airplaneReducer,
    reservationReducer
});

export default rootReducer;