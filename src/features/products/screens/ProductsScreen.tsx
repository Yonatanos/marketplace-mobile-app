import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '@/constants/colors';
import { STRINGS } from '@/constants/strings';
import { CATEGORIES, SORT_ORDER, TIMING } from '@/constants/config';
import { SCREEN_NAMES } from '@/constants/screenNames';
import { SafeScreen, Center, ErrorText, EmptyText } from '@/components/SharedComponents';
import { RootStackParamList } from '@/types/navigation';
import { safeKeyExtractor, KEY_PREFIXES } from '@/utils/keyExtractor';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useDebounce } from '@/hooks/useDebounce';
import { usePreventBack } from '@/hooks/usePreventBack';
import { useSplashScreen } from '@/hooks/useSplashScreen';
import { ProductCard } from '@/features/products/components/ProductCard';
import { ProductListEmpty } from '@/features/products/components/ProductListEmpty';
import {
  CategoriesList,
  CategoryChip,
  CategoryText,
  ListLoader,
  ProductList,
  SearchInput,
  SortChip,
  SortText,
} from './ProductsScreen.styled';

export const ProductsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [localSearch, setLocalSearch] = useState(STRINGS.common.empty);

  const {
    products,
    categories,
    isProductsLoading,
    loadMore,
    handleSearch,
    handleCategoryChange,
    selectedCategory: reduxSelectedCategory,
    error,
    reloadProducts,
    toggleSort,
    sortOrder,
    hasCompletedInitialLoad,
    page,
  } = useProducts();

  usePreventBack();
  useSplashScreen(hasCompletedInitialLoad);

  const isLoadingMore = isProductsLoading && products.length > 0 && page > 1;
  const refreshing = isProductsLoading && products.length > 0 && page === 1;

  const debouncedSearch = useDebounce((text: string) => {
    handleSearch(text);
  }, TIMING.DEBOUNCE_DELAY);

  const onSearchChange = (text: string) => {
    setLocalSearch(text);
    debouncedSearch(text);
  };

  const onCategoryPress = (category: string) => {
    if (reduxSelectedCategory === category) {
      handleCategoryChange(CATEGORIES.ALL);

      return;
    }

    handleCategoryChange(category);
  };

  const renderEmpty = useCallback(
    () => <ProductListEmpty isLoading={isProductsLoading} />,
    [isProductsLoading]
  );

  const renderCategories = () => (
    <CategoriesList
      data={categories ?? []}
      keyExtractor={(item, index) => safeKeyExtractor(item, index, KEY_PREFIXES.CATEGORY)}
      ListHeaderComponent={
        <SortChip onPress={toggleSort}>
          <SortText>
            {sortOrder === SORT_ORDER.ASC ? STRINGS.search.priceAsc : STRINGS.search.priceDesc}
          </SortText>
        </SortChip>
      }
      ListEmptyComponent={renderEmpty}
      renderItem={({ item }) => {
        const isSelected = reduxSelectedCategory === item;

        return (
          <CategoryChip isSelected={isSelected} onPress={() => onCategoryPress(item)}>
            <CategoryText isSelected={isSelected}>{item}</CategoryText>
          </CategoryChip>
        );
      }}
    />
  );

  const renderContent = () => {
    if (!isProductsLoading && products.length === 0) {
      return <EmptyText>{STRINGS.search.noProductsFound} {localSearch}</EmptyText>;
    }

    return (
      <ProductList
        data={products ?? []}
        keyExtractor={(item, index) => safeKeyExtractor(item?.id, index, KEY_PREFIXES.PRODUCT)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            disabled={refreshing}
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.PRODUCT_DETAILS, { productId: item?.id });
            }}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadProducts}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListFooterComponent={() => (isLoadingMore ? <ListLoader /> : null)}
      />
    );
  };

  if (error) {
    return (
      <SafeScreen>
        <SearchInput
          placeholder={STRINGS.placeholders.search}
          onChangeText={onSearchChange}
          value={localSearch}
          placeholderTextColor={COLORS.textSecondary}
        />
        {renderCategories()}
        <Center>
          <ErrorText>{error}</ErrorText>
        </Center>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <SearchInput
        placeholder={STRINGS.placeholders.search}
        onChangeText={onSearchChange}
        value={localSearch}
        placeholderTextColor={COLORS.textSecondary}
      />
      {renderCategories()}
      {renderContent()}
    </SafeScreen>
  );
};
