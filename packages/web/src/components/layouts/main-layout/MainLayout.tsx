import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Footer from '@components/layouts/footer/Footer';

interface IMainLayout {
  children: JSX.Element;
}

function MainLayout({ children }: IMainLayout) {
  return (
    <Flex flexDirection="column" height="100vh">
      <nav>
        <Link to="/">Home</Link> | <Link to="about">About</Link>
      </nav>
      <Container maxW="container.xl" flexGrow={1}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
}

export default MainLayout;
