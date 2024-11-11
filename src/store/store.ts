import { configureStore } from '@reduxjs/toolkit';

// 임시 리듀서
const initialReducer = (state = {}) => {
  return state;
};

export const store = configureStore({
  reducer: {
    placeholder: initialReducer, // 임시 리듀서 추가
    // 여기에 리듀서들이 들어갈 예정
  },
});
