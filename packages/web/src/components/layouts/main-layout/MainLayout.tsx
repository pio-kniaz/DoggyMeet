import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

import Footer from '@components/layouts/footer/Footer';

function MainLayout() {
  return (
    <Flex flexDirection="column" height="100vh">
      <nav>
        <Link to="/">Home</Link> | <Link to="about">About</Link>
      </nav>
      <Container maxW="container.xl" flexGrow={1}>
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  );
}

export default MainLayout;
