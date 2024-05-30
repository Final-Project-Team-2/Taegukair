import rootReducer from './modules';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';

// 스토어 생성
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
