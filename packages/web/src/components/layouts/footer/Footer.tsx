import React from 'react';
import { Container, Box, Text, useConst } from '@chakra-ui/react';

function Footer() {
  const date = useConst(() => new Date().getFullYear());
  return (
    <Box background="green.600" as="footer" padding="1.25rem">
      <Container maxW="container.xl" margin="auto" width="100%">
        <Text color="black" fontSize="sm">{`© Copyright ${date} NO NAME APP. All rights reserved.`}</Text>
      </Container>
    </Box>
  );
}

export default Footer;
