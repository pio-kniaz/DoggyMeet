import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

interface IAuthState {
  accessToken: string | null;
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

type AuthActionPayload = {
  accessToken: string;
};

type SetUserActionPayload = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

const initialState: IAuthState = {
  accessToken: null,
  user: null,
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
    setUser: (state, action: PayloadAction<SetUserActionPayload>) => {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, clearAccessToken, setUser } = authSlice.actions;

export const authSelector = (state: RootState): IAuthState => state.auth;

export default authSlice.reducer;
