import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';

import '@styles/index.scss';
import HomePage from '@pages/home/HomePage';
import {theme} from './theme';

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <HomePage />
    </ChakraProvider>
  );
}
export default App;
