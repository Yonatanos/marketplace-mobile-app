import styled from 'styled-components/native';
import { FlashList } from '@shopify/flash-list';

import { COLORS } from '@/constants/colors';
import { Product } from '@/types/product';

export const PRODUCT_CARD_HEIGHT = 150;

export const ListLoader = styled.ActivityIndicator.attrs({
  color: COLORS.primary,
})`
  margin-vertical: 20px;
`;

export const ProductList = styled(FlashList<Product>).attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
  estimatedItemSize: PRODUCT_CARD_HEIGHT,
})`
  flex: 1;
`;

export const SearchInput = styled.TextInput`
  height: 50px;
  background-color: ${COLORS.white};
  margin: 16px;
  padding: 0 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${COLORS.border};
  font-size: 16px;
  color: ${COLORS.text};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
`;

export const SortChip = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 20px;
  background-color: ${COLORS.white};
  border-width: 1px;
  border-color: ${COLORS.primary};
  margin-right: 10px;
  align-self: center;
  height: 38px;
`;

export const SortText = styled.Text`
  color: ${COLORS.primary};
  font-size: 13px;
  font-weight: 600;
`;

export const CategoriesList = styled(FlashList<string>).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  max-height: 50px;
  margin: 10px;
`;

export const CategoryChip = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 20px;
  background-color: ${({ isSelected }) => (isSelected ? COLORS.primary : COLORS.border)};
  margin-horizontal: 5px;
  height: 38px;
  justify-content: center;
`;

export const CategoryText = styled.Text<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? COLORS.white : COLORS.text)};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  text-transform: capitalize;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

export const LoadingWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${COLORS.white};
  opacity: 0.8,
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
