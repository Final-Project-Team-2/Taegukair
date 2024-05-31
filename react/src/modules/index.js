import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import airplaneReducer from './AirplaneModule';

const rootReducer = combineReducers({
    memberReducer,
    airplaneReducer
    
});

export default rootReducer;