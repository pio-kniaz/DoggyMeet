import React from 'react';
import { Container, Box } from '@chakra-ui/react';

import AnnouncementResult from '@pages/announcement/announcement-result/AnnouncementResult';
import { CustomButton } from '@components/shared/index';
import { useAppDispatch } from '@/hooks/useRedux';
import { openModal, ModalTypes } from '@/redux/modal/modal.slice';

function AnnouncementPage() {
  const dispatch = useAppDispatch();
  const handleCreateNew = () => {
    dispatch(
      openModal({
        modalType: ModalTypes.ANNOUNCEMENT,
      }),
    );
  };
  return (
    <Container maxW="container.xl" pt="1rem" data-testid="announcement-page">
      <Box display="flex" justifyContent="flex-end">
        <CustomButton
          mb=".5rem"
          display="flex"
          colorScheme="green"
          bgGradient="linear(to-r, green.400, green.500, green.600)"
          padding="1.25rem"
          onClick={handleCreateNew}
        >
          Add new
        </CustomButton>
      </Box>
      <AnnouncementResult />
    </Container>
  );
}

export default AnnouncementPage;
