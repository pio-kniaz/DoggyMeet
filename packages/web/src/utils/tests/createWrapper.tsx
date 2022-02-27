import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
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
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    route = '/',
    ...renderOptions
  }: any = {},
) {
  const testQueryClient = createTestQueryClient();
  const history = createMemoryHistory({ initialEntries: [route] });
  const { rerender, ...result } = render(
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <Router location={history.location} navigator={history}>
            {ui}
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
      ,
    </Provider>,
  );
  return {
    ...result,
    ...renderOptions,
    rerender: (rerenderUi: React.ReactElement) => rerender(rerenderUi),
    history,
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  );
}
