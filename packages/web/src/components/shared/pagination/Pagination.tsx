import React, { useEffect } from 'react';
import { Flex, Square, Text } from '@chakra-ui/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface IPagination {
  totalPages: number;
  page: number;
  changePage: Function;
}

function Pagination({ totalPages, page, changePage }: IPagination) {
  const currentPage = page - 1;
  const isPrevDisable = currentPage <= 0;
  const isNextDisable = currentPage >= totalPages - 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      changePage(totalPages - 1 || 0);
    }
  }, [changePage, currentPage, totalPages]);
  const handleChangePage = (val: number) => {
    changePage(val);
  };
  const handleNextPage = () => {
    if (!isNextDisable) {
      changePage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (!isPrevDisable) {
      changePage(currentPage - 1);
    }
  };

  const renderPaginationSec = () => {
    const pagination = [];
    let ellipsisLeft = false;
    let ellipsisRight = false;
    for (let i = 0; i < totalPages; i += 1) {
      if (i === currentPage) {
        pagination.push({ id: i, current: true, ellipsis: false });
      } else if (
        (i <= 2 && currentPage < 3) ||
        i > totalPages - 2 ||
        (currentPage >= 3 && i === 0) ||
        (i >= totalPages - 3 && currentPage >= totalPages - 3)
      ) {
        pagination.push({ id: i, current: false, ellipsis: false });
      } else if (i >= 1 && i < currentPage && !ellipsisLeft) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisLeft = true;
      } else if (i < totalPages && i > currentPage && !ellipsisRight) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisRight = true;
      }
    }
    if (pagination.length > 1) {
      return (
        <Flex color="whiteAlpha" align="center" justifyContent="center">
          <Square
            disabled={isPrevDisable}
            bg="whiteAlpha.500"
            size="40px"
            onClick={handlePrevPage}
            as="button"
            opacity={isPrevDisable ? 0.3 : 1}
          >
            <FaAngleLeft />
          </Square>
          {pagination.map((val) => {
            if (!val.ellipsis) {
              return (
                <Square
                  as="button"
                  bg={val.id + 1 === page ? 'green.500' : 'whiteAlpha.500'}
                  color={val.id + 1 === page ? 'white' : 'black.200'}
                  size="40px"
                  key={val.id}
                  onClick={() => handleChangePage(val.id)}
                >
                  <Text>{val.id + 1}</Text>
                </Square>
              );
            }
            return (
              <Square
                as="button"
                bg="whiteAlpha.500"
                color="black.200"
                size="40px"
                key={val.id}
                onClick={() => handleChangePage(val.id)}
              >
                <Text>...</Text>
              </Square>
            );
          })}
          <Square
            disabled={isNextDisable}
            bg="whiteAlpha.500"
            size="40px"
            onClick={handleNextPage}
            as="button"
            opacity={isNextDisable ? 0.3 : 1}
          >
            <FaAngleRight />
          </Square>
        </Flex>
      );
    }

    return null;
  };
  // const renderPagination = () => {
  //   const result: number[] = [];
  //   for (let index = 0; index < totalPages; index += 1) {
  //     result.push(index);
  //   }
  //   if (result.length > 0) {
  //     return (
  //       <Flex color="whiteAlpha" align="center" justifyContent="center">
  //         <Square
  //           disabled={isPrevDisable}
  //           bg="whiteAlpha.500"
  //           size="40px"
  //           onClick={handlePrevPage}
  //           as="button"
  //           opacity={isPrevDisable ? 0.3 : 1}
  //         >
  //           <FaAngleLeft />
  //         </Square>
  //         {result.map((val) => {
  //           return (
  //             <Square
  //               as="button"
  //               bg={val + 1 === page ? 'green.500' : 'whiteAlpha.500'}
  //               color={val + 1 === page ? 'white' : 'black.200'}
  //               size="40px"
  //               key={val}
  //               onClick={() => handleChangePage(val)}
  //             >
  //               <Text>{val + 1}</Text>
  //             </Square>
  //           );
  //         })}
  //         <Square
  //           disabled={isNextDisable}
  //           bg="whiteAlpha.500"
  //           size="40px"
  //           onClick={handleNextPage}
  //           as="button"
  //           opacity={isNextDisable ? 0.3 : 1}
  //         >
  //           <FaAngleRight />
  //         </Square>
  //       </Flex>
  //     );
  //   }
  //   return null;
  // };

  return <>{renderPaginationSec()}</>;
}
export default Pagination;
