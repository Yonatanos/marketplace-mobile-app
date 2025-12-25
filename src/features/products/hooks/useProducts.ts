import { SORT_ORDER } from '@/constants/config';
import { RootState } from '@/store/types';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchProductsRequest,
  setPage,
  setSearchQuery,
  setSelectedCategory,
  setSortOrder,
} from '../store/productsSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const hasCompletedInitialLoad = useRef(false);

  const { items, isProductsLoading, hasMore, page, searchQuery, selectedCategory, error, sortOrder, categories, isCategoriesLoading } = useSelector(
    (state: RootState) => state.products,
  );

  const loadProducts = useCallback(() => {
    dispatch(fetchProductsRequest({ page, searchQuery, selectedCategory, sortOrder }));
  }, [dispatch, page, searchQuery, selectedCategory, sortOrder]);

  useEffect(() => {
    dispatch(fetchProductsRequest({ page, searchQuery, selectedCategory, sortOrder }));
  }, [dispatch, page, searchQuery, selectedCategory, sortOrder]);

  useEffect(() => {
    if (!isProductsLoading && !isCategoriesLoading && !hasCompletedInitialLoad.current) {
      hasCompletedInitialLoad.current = true;
    }
  }, [isProductsLoading, isCategoriesLoading]);

  const loadMore = () => {
    if (hasMore && !isProductsLoading) {
      dispatch(setPage(page + 1));
    }
  };

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const reloadProducts = useCallback(() => {
    dispatch(setPage(1));
  }, [dispatch]);

  const toggleSort = () => {
    const nextOrder = sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC;

    dispatch(setSortOrder(nextOrder));
  };

  return {
    products: items,
    isProductsLoading,
    error,
    loadMore,
    handleSearch,
    handleCategoryChange,
    searchQuery,
    selectedCategory,
    sortOrder,
    toggleSort,
    loadProducts,
    reloadProducts,
    categories,
    hasCompletedInitialLoad: hasCompletedInitialLoad.current,
    page,
  };
};
