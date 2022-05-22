import React, { Suspense, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Footer from '@components/layouts/footer/Footer';
import { Loader } from '@components/shared';
import Header from '@/components/layouts/header/Header';

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/announcement', { replace: true });
    }
  }, [location, navigate]);

  return (
    <Flex flexDirection="column" height="100vh">
      <Header type="main" />
      <Suspense
        fallback={
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Loader />
          </Flex>
        }
      >
        <Box flexGrow={1} py="2rem">
          <Outlet />
        </Box>
      </Suspense>
      <Footer />
    </Flex>
  );
}

export default MainLayout;
