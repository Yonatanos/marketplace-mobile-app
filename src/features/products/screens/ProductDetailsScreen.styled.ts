import styled from 'styled-components/native';

import { COLORS } from '@/constants/colors';

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const Image = styled.Image`
  width: 100%;
  height: 350px;
  background-color: ${COLORS.background};
`;

export const Content = styled.View`
  padding: 24px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: -30px;
  background-color: ${COLORS.white};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: 8px;
`;

export const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const StarText = styled.Text`
  color: ${COLORS.star};
  font-size: 16px;
  font-weight: bold;
`;

export const RatingInfo = styled.Text`
  font-size: 14px;
  color: ${COLORS.textSecondary};
  margin-left: 8px;
`;

export const Price = styled.Text`
  font-size: 22px;
  color: ${COLORS.primary};
  font-weight: 700;
`;

export const InfoTagRow = styled.View`
  flex-direction: row;
  margin-top: 16px;
  gap: 10px;
`;

export const InfoTag = styled.View<{ bgColor?: string }>`
  background-color: ${({ bgColor}) => bgColor || COLORS.background};
  padding: 6px 12px;
  border-radius: 8px;
`;

export const TagText = styled.Text`
  font-size: 12px;
  font-weight: 600;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${COLORS.border};
  margin-vertical: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${COLORS.textSecondary};
`;

export const AddToCartButton = styled.TouchableOpacity`
  background-color: ${COLORS.primary};
  padding: 18px;
  border-radius: 12px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  
`;

export const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: bold;
`;

export const StockText = styled.Text<{ isLowStock: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ isLowStock }) => (isLowStock ? COLORS.error : COLORS.success)};
  margin-vertical: 8px;
`;
