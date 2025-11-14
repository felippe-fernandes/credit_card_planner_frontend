import { useState, useCallback } from 'react';
import { PaginationParams, PaginationMeta } from '@/types/api/pagination';

export const usePagination = (initialParams?: PaginationParams) => {
  const [params, setParams] = useState<PaginationParams>({
    page: initialParams?.page || 1,
    limit: initialParams?.limit || 10,
    sortBy: initialParams?.sortBy || 'createdAt',
    sortOrder: initialParams?.sortOrder || 'desc',
  });

  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const nextPage = useCallback(() => {
    if (meta?.hasNextPage) {
      setParams(prev => ({ ...prev, page: (prev.page || 1) + 1 }));
    }
  }, [meta]);

  const previousPage = useCallback(() => {
    if (meta?.hasPreviousPage) {
      setParams(prev => ({ ...prev, page: Math.max((prev.page || 1) - 1, 1) }));
    }
  }, [meta]);

  const goToPage = useCallback((page: number) => {
    setParams(prev => ({ ...prev, page }));
  }, []);

  const changeLimit = useCallback((limit: number) => {
    setParams(prev => ({ ...prev, limit, page: 1 })); // Reset to page 1
  }, []);

  const changeSorting = useCallback((sortBy: string, sortOrder?: 'asc' | 'desc') => {
    setParams(prev => ({
      ...prev,
      sortBy,
      sortOrder: sortOrder || prev.sortOrder || 'desc'
    }));
  }, []);

  const toggleSortOrder = useCallback(() => {
    setParams(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const reset = useCallback(() => {
    setParams({
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    setMeta(null);
  }, []);

  return {
    params,
    meta,
    setMeta,
    nextPage,
    previousPage,
    goToPage,
    changeLimit,
    changeSorting,
    toggleSortOrder,
    reset,
  };
};
