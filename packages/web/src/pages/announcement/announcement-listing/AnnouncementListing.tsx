import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Box, Input } from '@chakra-ui/react';

import { CustomButton } from '@components/shared/index';

function AnnouncementListing() {
  return (
    <div>
      <Box display="flex" justifyContent="flex-end">
        <CustomButton
          mb="1rem"
          display="flex"
          colorScheme="green"
          bgGradient="linear(to-r, green.400, green.500, green.600)"
          padding="1.25rem"
        >
          <Link to="new">Add new</Link>
        </CustomButton>
      </Box>
      <TableContainer border="1px solid green" borderRadius="5px" mt="0.5rem" py="0.5">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>
                <Box>
                  <Box mb="3">
                    <Input placeholder="Type author..." borderRadius="0" />{' '}
                  </Box>
                  Author
                </Box>
              </Th>
              <Th>
                <Box>
                  <Box mb="3">
                    <Input placeholder="Type city..." borderRadius="0" />{' '}
                  </Box>
                  City
                </Box>
              </Th>
              <Th>
                <Box>
                  <Box mb="3">
                    <Input placeholder="Type status..." borderRadius="0" />{' '}
                  </Box>
                  Status
                </Box>
              </Th>
              <Th>
                <Box>
                  <Box mb="3">
                    <Input placeholder="Type create date..." borderRadius="0" />{' '}
                  </Box>
                  Crate date
                </Box>
              </Th>
              <Th>
                <Box>Actions</Box>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Bolek 123</Td>
              <Td>Warsaw</Td>
              <Td>Closed</Td>
              <Td>02.06.2022</Td>
              <Td>02.06.2022</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AnnouncementListing;
