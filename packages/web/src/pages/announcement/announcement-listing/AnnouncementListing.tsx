import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Box, Heading } from '@chakra-ui/react';
import { paginationInitial } from '@constants';
import { CustomLink, Loader, InputField, SelectField, CustomButton, Pagination } from '@components/shared/index';
import debounce from 'lodash/debounce';

import { useGetAllAnnouncement } from '@queries/announcements/announcements-queries';
import { useFilters } from '@hooks/useFilters';

const initialFilters = {
  city: '',
  author: '',
  status: '',
};

const initialQuery = {
  ...paginationInitial,
  ...initialFilters,
};

function AnnouncementListing() {
  const { filters, setFilters, resetFilters } = useFilters({
    initialFilters: initialQuery,
  });

  const { register, watch, control, reset } = useForm({
    defaultValues: filters,
  });

  const handleResetFilter = () => {
    reset();
    resetFilters();
  };

  const updateFilters = useCallback(
    debounce(
      (val) =>
        setFilters((prev: any) => {
          return {
            ...prev,
            ...val,
          };
        }),
      750,
    ),
    [],
  );

  useEffect(() => {
    const subscription = watch((value) => {
      updateFilters(value);
    });
    return () => subscription.unsubscribe();
  }, [setFilters, watch, filters, updateFilters]);

  const { isLoading, data, isError, isSuccess } = useGetAllAnnouncement({
    query: {
      ...filters,
    },
  });
  const handleChangePage = (val: number) => {
    setFilters({
      page: val,
    });
  };
  return (
    <div>
      <Box display="flex" justifyContent="flex-end" zIndex="2">
        <CustomLink
          color="white"
          to="new"
          variant="solid"
          colorScheme="green"
          bgGradient="linear(to-r, green.400, green.500, green.600)"
          mr="1.5rem"
        >
          Add new
        </CustomLink>
        <CustomButton onClick={handleResetFilter}>Reset Filters</CustomButton>
      </Box>
      <TableContainer border="1px solid green" borderRadius="5px" mt="0.5rem" py="0.5">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>
                <Box>
                  <Box mb="3">
                    <InputField placeholder="Type author..." borderRadius="0" register={register} name="author" />{' '}
                  </Box>
                  Author
                </Box>
              </Th>
              <Th>
                <Box>
                  <Box mb="3">
                    <InputField placeholder="Type city..." borderRadius="0" register={register} name="city" />{' '}
                  </Box>
                  City
                </Box>
              </Th>
              <Th>
                <Box>
                  <Box mb="3" minWidth="150px">
                    <SelectField
                      control={control}
                      placeholder="Type status..."
                      name="status"
                      options={[
                        { value: 'open', label: 'open' },
                        { value: 'closed', label: 'closed' },
                      ]}
                    />
                  </Box>
                  Status
                </Box>
              </Th>
              <Th />
              <Th>
                <Box>Actions</Box>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccess &&
              !isError &&
              !isLoading &&
              data?.announcements?.docs.map((elem) => {
                return (
                  <Tr key={elem._id}>
                    <Td>{elem.author.name}</Td>
                    <Td>{elem.city}</Td>
                    <Td>{elem.status}</Td>
                    <Td>{elem.createdAt}</Td>
                    <Td>-</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        {isError && (
          <Box py="2rem">
            <Heading as="h2" textAlign="center" color="red.500">
              Something went wrong
            </Heading>
          </Box>
        )}
        {isLoading && (
          <Box py="2rem" textAlign="center">
            <Loader size="xl" />
          </Box>
        )}
      </TableContainer>
      <Pagination
        totalPages={data?.announcements?.totalPages ?? 0}
        page={data?.announcements?.page ?? 0}
        changePage={handleChangePage}
      />
    </div>
  );
}

export default AnnouncementListing;
