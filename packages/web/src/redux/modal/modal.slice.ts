import type { RootState } from '@redux/store';
import { createSlice } from '@reduxjs/toolkit';

export interface IModalState {
  isOpen: boolean;
  modalProps: unknown;
}

const initialState: IModalState = {
  isOpen: false,
  modalProps: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalSelector = (state: RootState): IModalState => state.modal;

export default modalSlice.reducer;
