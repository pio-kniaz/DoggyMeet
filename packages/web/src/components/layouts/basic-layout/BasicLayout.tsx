import React from 'react';
import { Container, Flex } from '@chakra-ui/react';

import Footer from '@components/layouts/footer/Footer';
import Header from '@/components/layouts/basic-layout/header/Header';

interface IBasicLayout {
  children: JSX.Element;
}

function BasicLayout({ children }: IBasicLayout) {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />
      <Container maxW="container.xl" flexGrow={1}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
}

export default BasicLayout;