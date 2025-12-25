import React from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants/colors';
import { STRINGS } from '@/constants/strings';
import { EmptyContainer, LoadingWrapper } from './ProductListEmpty.styled';
import { EmptyText } from '@/components/SharedComponents';

interface Props {
  isLoading: boolean;
}

export const ProductListEmpty = ({ isLoading }: Props) => {
  return (
    <EmptyContainer>
      {isLoading ? (
        <LoadingWrapper>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <EmptyText>{STRINGS.product.loadingProducts}</EmptyText>
        </LoadingWrapper>
      ) : (
        <EmptyText>{STRINGS.product.noProductsFound}</EmptyText>
      )}
    </EmptyContainer>
  );
};
