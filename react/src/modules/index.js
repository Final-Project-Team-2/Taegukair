import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';

const rootReducer = combineReducers({
    memberReducer,
    reservationReducer
});

export default rootReducer;
