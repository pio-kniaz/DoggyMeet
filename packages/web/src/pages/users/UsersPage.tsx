import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import { useGetUsers } from '@queries/users/users-queries';

// TODO: REMOVE FOR DEV PURPOSE
function UsersPage() {
  const { isLoading, data, error, refetch, isRefetching } = useGetUsers();
  return (
    <Box overflowY="auto">
      <Container maxW="container.xl" flexGrow={1} width="100%">
        <button type="button" onClick={() => refetch()}>
          REFETCH
        </button>
        <br />
        <pre>
          {JSON.stringify(isRefetching, null, 2)}
          <br />
          {JSON.stringify(isLoading, null, 2)}
          <br />
          {JSON.stringify(error, null, 2)}
          <br />
          {JSON.stringify(data, null, 2)}
        </pre>
        UsersPage
      </Container>
    </Box>
  );
}

export default UsersPage;
