import { useState, useCallback } from 'react';

interface IUseFilters {
  initialFilters: {
    [key: string]: string | number;
  };
}
export const useFilters = ({ initialFilters }: IUseFilters) => {
  const [filters, setFilters] = useState({ ...initialFilters });
  const updateFilters = (val: any) => {
    setFilters((prev) => {
      return {
        ...prev,
        ...val,
      };
    });
  };
  const resetFilters = useCallback(() => setFilters({ ...initialFilters }), [initialFilters]);
  return {
    filters,
    setFilters: updateFilters,
    resetFilters,
  };
};
