import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

interface IAuthState {
  accessToken: string | null;
}

type AuthActionPayload = {
  accessToken: string;
};

const initialState: IAuthState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthActionPayload>) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const authSelector = (state: RootState): IAuthState => state.auth;

export default authSlice.reducer;
