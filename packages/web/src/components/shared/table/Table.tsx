import React, { useMemo } from 'react';
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, Box } from '@chakra-ui/react';
import { useTable, Column, usePagination } from 'react-table';
import Pagination from '../pagination/Pagination';
import Loader from '../loader/Loader';

interface ITable<T extends object = {}> {
  columns: Column<T>[];
  data: T[];
  totalPages: number;
  page: number;
  changePage: Function;
  status: 'error' | 'idle' | 'loading' | 'success';
}

function Table<T extends {}>({ data, columns, totalPages, page, changePage, status }: ITable<T>) {
  const defaultColumn = useMemo(
    () => ({
      width: 'auto',
    }),
    [],
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>(
    {
      columns,
      data,
      defaultColumn,
      manualPagination: true,
    },
    usePagination,
  );

  if (status === 'error') {
    <Box py="2rem">
      <Heading as="h2" textAlign="center" color="red.500">
        Something went wrong
      </Heading>
    </Box>;
  }

  return (
    <>
      <TableContainer border="1px solid green" borderRadius="5px" mt="0.5rem" py="0.5" position="relative">
        <ChakraTable {...getTableProps()} variant="striped">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps({
                      style: { minWidth: column.minWidth, width: column.width },
                    })}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          {status === 'success' && rows.length > 0 && (
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Td
                        {...cell.getCellProps({
                          style: {
                            paddingTop: '0.4rem',
                            paddingBottom: '0.4rem',
                          },
                        })}
                      >
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </ChakraTable>
        {status === 'success' && rows.length <= 0 && (
          <Box py="2rem">
            <Heading as="h2" textAlign="center" color="green.500">
              No results
            </Heading>
          </Box>
        )}
        {status === 'loading' && (
          <Box py="3rem" textAlign="center">
            <Loader size="xl" />
          </Box>
        )}
      </TableContainer>
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </>
  );
}

export default Table;
