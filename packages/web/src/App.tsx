import '@fontsource/roboto';
import '@fontsource/kalam';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Routes from '@routes/Routes';
import Modal from '@components/modal/Modal';
import { Api } from '@services/api';
import { theme } from './theme';

function App() {
  return (
    <QueryClientProvider client={Api.queryClient()}>
      <ChakraProvider resetCSS theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Modal />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
