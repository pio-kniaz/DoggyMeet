import React, { useMemo } from 'react';
import { Modal as ChakraModal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';

import { useAppSelector, useAppDispatch } from '@hooks/useRedux';
import { modalSelector, closeModal, ModalTypes } from '@redux/modal/modal.slice';
import Signup from '@components/modal/signup/Signup';

const MODAL_COMPONENTS = {
  [ModalTypes.SIGN_UP]: Signup,
} as const;

function Modal() {
  const { modalType } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const modalComponent = useMemo(() => {
    if (modalType) {
      const ModalComponent = MODAL_COMPONENTS[modalType];
      return <ModalComponent />;
    }
    return null;
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
