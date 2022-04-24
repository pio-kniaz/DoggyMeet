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
    setAccessToken: (state, action: PayloadAction<AuthActionPayload>) => {
      state.accessToken = action.payload.accessToken;
    },
    clearAccessToken: () => {
      return initialState;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export const authSelector = (state: RootState): IAuthState => state.auth;

export default authSlice.reducer;
