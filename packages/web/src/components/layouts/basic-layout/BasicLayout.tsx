import React, { Suspense } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Loader } from '@components/shared';
import Footer from '@components/layouts/footer/Footer';
import Header from '@/components/layouts/header/Header';

function BasicLayout() {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header type="basic" />
      <Container maxW="container.xl" flexGrow={1}>
        <Suspense
          fallback={
            <Flex height="100%" alignItems="center" justifyContent="center">
              <Loader />
            </Flex>
          }
        >
          <Outlet />
        </Suspense>
      </Container>
      <Footer />
    </Flex>
  );
}

export default BasicLayout;
