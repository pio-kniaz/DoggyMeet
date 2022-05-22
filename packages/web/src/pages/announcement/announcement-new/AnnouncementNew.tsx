import React from 'react';

import { Heading, Box } from '@chakra-ui/react';
import AnnouncementNewForm from './announcement-new-form/AnnouncementNewForm';

function AnnouncementNew() {
  return (
    <Box>
      <Heading fontSize="3xl" textAlign="center" mb="2rem">
        Add new announcement
      </Heading>
      <Box maxWidth="640px" mx="auto">
        <AnnouncementNewForm />
      </Box>
    </Box>
  );
}

export default AnnouncementNew;
