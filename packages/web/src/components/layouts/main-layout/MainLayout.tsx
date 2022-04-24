import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Footer from '@components/layouts/footer/Footer';
import Header from '@/components/layouts/header/Header';

function MainLayout() {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header type="main" />
      <Container maxW="container.xl" flexGrow={1}>
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  );
}

export default MainLayout;
