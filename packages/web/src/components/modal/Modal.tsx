import React, { useEffect, useMemo, useState } from 'react';
import { Modal as ChakraModal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';

import Signup from '@components/modal/signup/Signup';
import Signin from '@components/modal/signin/Signin';
import { useAppSelector, useAppDispatch } from '@hooks/useRedux';
import Announcement from '@/components/modal/announcement/Announcement';
import { modalSelector, closeModal, ModalTypes } from '@/redux/modal/modal.slice';

const MODAL_COMPONENTS = {
  [ModalTypes.SIGN_UP]: Signup,
  [ModalTypes.SIGN_IN]: Signin,
  [ModalTypes.ANNOUNCEMENT]: Announcement,
} as const;

const modalSizes = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  full: 'full',
} as const;

type ModalSizes = keyof typeof modalSizes;

function Modal() {
  const [size, setSize] = useState<ModalSizes>(modalSizes.md);
  const { modalType } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const modalComponent = useMemo(() => {
    const ModalComponent = modalType && MODAL_COMPONENTS[modalType];
    return ModalComponent ? <ModalComponent /> : null;
  }, [modalType]);

  useEffect(() => {
    if (modalType) {
      switch (modalType) {
        case ModalTypes.ANNOUNCEMENT:
          setSize(modalSizes.full);
          break;
        default:
          setSize(modalSizes.md);
          break;
      }
    }
  }, [modalType]);

  return (
    <>
      <ChakraModal
        isOpen={!!(modalType && MODAL_COMPONENTS[modalType])}
        onClose={handleCloseModal}
        size={size}
        motionPreset="scale"
      >
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
