import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import modalReducer from '@/redux/modal/modal.slice';
import authReducer from '@/redux/auth/auth.slice';

export const rootReducer = {
  modal: modalReducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [logger] as const,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
