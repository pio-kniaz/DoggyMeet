import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '@chakra-ui/react';

function AnnouncementPage() {
  return (
    <Container maxW="container.xl" pt="1rem" data-testid="announcement-page">
      <Outlet />
    </Container>
  );
}

export default AnnouncementPage;
