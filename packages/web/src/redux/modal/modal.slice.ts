import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export enum ModalTypes {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export interface IModalState {
  modalType: null | ModalTypes;
  modalProps: any;
}

const initialState: IModalState = {
  modalType: null,
  modalProps: {},
};

type ModalActionPayload =
  | {
      modalType: ModalTypes.SIGN_UP;
    }
  | {
      modalType: ModalTypes.SIGN_IN;
    }
  | {
      modalType: ModalTypes.ANNOUNCEMENT;
    };

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalActionPayload>) => {
      state.modalType = action.payload.modalType;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalSelector = (state: RootState): IModalState => state.modal;

export default modalSlice.reducer;
