import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../../theme';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <ChakraProvider resetCSS theme={theme}>
        {ui}
      </ChakraProvider>
    </QueryClientProvider>,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  );
}
