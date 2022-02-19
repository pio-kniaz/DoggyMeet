import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../../theme';
import { rootReducer } from '@/redux/store';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(
  ui: React.ReactElement,
  { preloadedState, store = configureStore({ reducer: rootReducer, preloadedState }), ...renderOptions }: any = {},
) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>
        <ChakraProvider resetCSS theme={theme}>
          {ui}
        </ChakraProvider>
      </QueryClientProvider>
      ,
    </Provider>,
  );
  return {
    ...result,
    ...renderOptions,
    rerender: (rerenderUi: React.ReactElement) => rerender(rerenderUi),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  );
}
