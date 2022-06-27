import React, { useEffect, useCallback, useMemo } from 'react';
import { Column } from 'react-table';

import pick from 'lodash/pick';
import { FaEye } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Box } from '@chakra-ui/react';
import { paginationInitial } from '@constants';
import { CustomLink, CustomButton, Table, InputField, SelectField } from '@components/shared/index';
import debounce from 'lodash/debounce';

import { useGetAllAnnouncement } from '@queries/announcements/announcements-queries';
import { useFilters } from '@hooks/useFilters';
import { IAnnouncement } from '@/utils/interfaces';

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

  const { watch, reset, register, control } = useForm({
    defaultValues: pick(filters, ['author', 'status', 'city']),
  });

  const columns: Column<IAnnouncement>[] = useMemo(
    () => [
      {
        id: 'author',
        Header: (
          <Box>
            <Box mb="3" minWidth="150px">
              <InputField placeholder="Author..." borderRadius="0" register={register} name="author" />{' '}
            </Box>
            Author
          </Box>
        ),
        accessor: (originalRow) => {
          return originalRow.author.name;
        },
      },
      {
        id: 'city',
        Header: (
          <Box>
            <Box mb="3" minWidth="150px">
              <InputField placeholder="City..." borderRadius="0" register={register} name="city" />{' '}
            </Box>
            City
          </Box>
        ),
        accessor: 'city',
      },
      {
        id: 'status',
        Header: (
          <Box>
            <Box mb="3" minWidth="200px">
              <SelectField
                control={control}
                placeholder="status..."
                name="status"
                options={[
                  { value: 'open', label: 'open' },
                  { value: 'closed', label: 'closed' },
                ]}
              />
            </Box>
            Status
          </Box>
        ),
        accessor: 'status',
      },
      {
        Header: 'CREATED AT',
        accessor: 'createdAt',
        width: 100,
      },
      {
        Header: 'Actions',
        width: 250,
        Cell: () => {
          return (
            <>
              <CustomLink variant="unstyled" to="new" display="inline-flex" justifyContent="center">
                <FaEye size="1.55rem" />
              </CustomLink>
            </>
          );
        },
      },
    ],
    [control, register],
  );
  const handleResetFilter = () => {
    reset();
    resetFilters();
  };

  const updateFilters = useCallback(
    debounce((val) => setFilters(val), 750),
    [],
  );

  useEffect(() => {
    const subscription = watch((value) => {
      updateFilters(value);
    });
    return () => subscription.unsubscribe();
  }, [setFilters, watch, filters, updateFilters]);

  const { data, status } = useGetAllAnnouncement({
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
      <Table<IAnnouncement>
        columns={columns}
        data={data?.announcements?.docs ?? []}
        totalPages={data?.announcements?.totalPages ?? 0}
        page={data?.announcements?.page ?? 0}
        changePage={handleChangePage}
        status={status}
      />
    </div>
  );
}

export default AnnouncementListing;
