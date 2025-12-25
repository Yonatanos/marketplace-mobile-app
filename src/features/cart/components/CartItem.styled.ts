import styled from 'styled-components/native';
import { COLORS } from '@/constants/colors';

export const CartItemContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: ${COLORS.white};
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightGray};
  align-items: center;
`;

export const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  background-color: ${COLORS.background};
`;

export const ItemInfo = styled.View`
  flex: 1;
  margin-left: 16px;
  justify-content: space-between;
`;

export const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 4px;
`;

export const ItemPrice = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${COLORS.primary};
`;

export const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  background-color: ${COLORS.background};
  align-self: flex-start;
  border-radius: 20px;
  padding: 4px;
`;

export const QuantityButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${COLORS.white};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  justify-content: center;
  align-items: center;
  shadow-color:${COLORS.black};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

export const QuantityText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.text};
`;

export const Quantity = styled.Text`
  margin-horizontal: 16px;
  font-size: 16px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: 8px;
`;

export const RemoveText = styled.Text`
  font-size: 18px;
`;
