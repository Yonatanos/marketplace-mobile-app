import { SORT_ORDER } from '@/constants/config';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchProductsRequest,
  setPage,
  setSearchQuery,
  setSelectedCategory,
  setSortOrder,
} from '../store/productsSlice';
import { selectProducts, selectProductsState } from '../store/productsSelectors';

export const useProducts = () => {
  const dispatch = useDispatch();
  const hasCompletedInitialLoad = useRef(false);

  // Use selector to get products array from entity adapter
  const products = useSelector(selectProducts);
  const { isProductsLoading, hasMore, page, searchQuery, selectedCategory, error, sortOrder, categories, isCategoriesLoading } = useSelector(selectProductsState);

  // Initial load only - dispatched once when component mounts
  // Subsequent fetches are handled by saga watching filter changes
  useEffect(() => {
    dispatch(fetchProductsRequest({ page, searchQuery, selectedCategory, sortOrder }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isProductsLoading && !isCategoriesLoading && !hasCompletedInitialLoad.current) {
      hasCompletedInitialLoad.current = true;
    }
  }, [isProductsLoading, isCategoriesLoading]);

  const loadMore = () => {
    if (hasMore && !isProductsLoading) {
      dispatch(setPage(page + 1)); // Saga will auto-fetch
    }
  };

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text)); // Saga will auto-fetch
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category)); // Saga will auto-fetch
  };

  const reloadProducts = useCallback(() => {
    dispatch(setPage(1)); // Saga will auto-fetch
  }, [dispatch]);

  const toggleSort = () => {
    const nextOrder = sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC;

    dispatch(setSortOrder(nextOrder)); // Saga will auto-fetch
  };

  return {
    products,
    isProductsLoading,
    error,
    loadMore,
    handleSearch,
    handleCategoryChange,
    searchQuery,
    selectedCategory,
    sortOrder,
    toggleSort,
    reloadProducts,
    categories,
    hasCompletedInitialLoad: hasCompletedInitialLoad.current,
    page,
  };
};
