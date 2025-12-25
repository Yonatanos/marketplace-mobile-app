import styled from 'styled-components/native';
import { COLORS } from '@/constants/colors';
import { PRODUCT_CARD_HEIGHT } from '@/features/products/screens/ProductsScreen.styled';

export const CardContainer = styled.TouchableOpacity`
  height: ${PRODUCT_CARD_HEIGHT}px;
  flex-direction: row;
  padding: 12px;
  background-color: ${COLORS.white};
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.border};
  align-items: center;
`;

export const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: ${COLORS.background};
`;

export const InfoContainer = styled.View`
  flex: 1;
  margin-left: 16px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: 4px;
`;

export const Price = styled.Text`
  font-size: 14px;
  color: ${COLORS.primary};
  font-weight: 600;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: ${COLORS.textSecondary};
  margin-top: 4px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const RatingText = styled.Text`
  font-size: 12px;
  color: ${COLORS.textSecondary};
  margin-left: 4px;
`;

export const StarIcon = styled.Text`
  font-size: 12px;
  color: ${COLORS.star};
`;
