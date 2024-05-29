import { createStore } from 'redux';
import { Provider } from 'react-redux';

// 기본 리듀서 설정 (필요에 따라 수정)
const initialState = {};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    // 필요한 경우 리듀서 로직 추가
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(rootReducer);

export default store;
