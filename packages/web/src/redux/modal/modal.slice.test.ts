import modalReducer, { openModal, ModalTypes } from '@/redux/modal/modal.slice';

describe('Modal reducer tests', () => {
  const initialState = {
    modalType: null,
    modalProps: {},
  };
  it('Should return initial state', () => {
    expect(
      modalReducer(undefined, {
        type: undefined,
      }),
    ).toEqual(initialState);
  });
  it('Should handle a SING UP modal being opened', () => {
    expect(modalReducer(initialState, openModal({ modalType: ModalTypes.SIGN_UP }))).toEqual({
      modalType: ModalTypes.SIGN_UP,
      modalProps: {},
    });
  });
  it('Should handle a SING IN modal being opened', () => {
    expect(modalReducer(initialState, openModal({ modalType: ModalTypes.SIGN_IN }))).toEqual({
      modalType: ModalTypes.SIGN_IN,
      modalProps: {},
    });
  });
});
