import React, { useMemo } from 'react';
import { Modal as ChakraModal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';

import Signup from '@components/modal/signup/Signup';
import Signin from '@components/modal/signin/Signin';
import { useAppSelector, useAppDispatch } from '@hooks/useRedux';
import { modalSelector, closeModal, ModalTypes } from '@/redux/modal/modal.slice';

const MODAL_COMPONENTS = {
  [ModalTypes.SIGN_UP]: Signup,
  [ModalTypes.SIGN_IN]: Signin,
} as const;

function Modal() {
  const { modalType } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const modalComponent = useMemo(() => {
    const ModalComponent = modalType && MODAL_COMPONENTS[modalType];
    return ModalComponent ? <ModalComponent /> : null;
  }, [modalType]);

  return (
    <>
      <ChakraModal isOpen={!!(modalType && MODAL_COMPONENTS[modalType])} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {modalComponent}
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export default Modal;
