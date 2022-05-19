import React from 'react';
import { Flex, Heading, Stack, Box } from '@chakra-ui/react';

import AnnouncementForm from '@components/modal/announcement/announcement-form/AnnouncementForm';

function Announcement() {
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={10} width="100%">
        <Stack align="center">
          <Heading fontSize="2xl" textAlign="center">
            Add new announcement
          </Heading>
        </Stack>
        <Box>
          <AnnouncementForm />
        </Box>
      </Stack>
    </Flex>
  );
}

export default Announcement;
