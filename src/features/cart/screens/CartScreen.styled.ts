import styled from 'styled-components/native';
import { FlashList } from '@shopify/flash-list';
import { COLORS } from '@/constants/colors';
import { CartItem } from '../store/cartSlice';

const FOOTER_PADDING = 24;

export const Footer = styled.View<{ bottomInset: number }>`
  padding: ${FOOTER_PADDING}px;
  padding-bottom: ${({ bottomInset }) => FOOTER_PADDING + bottomInset}px;
  background-color: ${COLORS.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  shadow-color: ${COLORS.black};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  elevation: 10;
`;

export const TotalRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const TotalLabel = styled.Text`
  font-size: 18px;
  color: ${COLORS.textSecondary};
`;

export const TotalValue = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: ${COLORS.text};
`;

export const CheckoutButton = styled.TouchableOpacity`
  background-color: ${COLORS.primary};
  padding: 18px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const CheckoutText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: 700;
`;

export const CartList = styled(FlashList<CartItem>)`
  flex: 1;
`;

export const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const LoadingContainer = styled.View`
  background-color: ${COLORS.white};
  padding: 24px;
  border-radius: 16px;
  shadow-color: ${COLORS.black};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;
