import React from 'react';

import { Flex, Heading, Stack } from '@chakra-ui/react';

function Announcement() {
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={10} width="100%">
        <Stack align="center">
          <Heading fontSize="2xl" textAlign="center">
            Add new announcement
          </Heading>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Announcement;
