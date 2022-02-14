import '@fontsource/roboto';
import '@fontsource/kalam';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '@styles/index.scss';

// import HomePage from '@pages/home/HomePage';
import MainPage from '@pages/main/MainPage';
import { Api } from '@services/index';
import { theme } from './theme';

function App() {
  return (
    <QueryClientProvider client={Api.queryClient()}>
      <ChakraProvider resetCSS theme={theme}>
        {/* <HomePage /> */}
        <MainPage />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
