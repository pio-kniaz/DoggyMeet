import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '@redux/modal/modal.slice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
  middleware: [logger] as const,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
