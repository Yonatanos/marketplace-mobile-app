import styled from 'styled-components/native';
import { COLORS } from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SafeScreen = styled(SafeAreaView).attrs({
  edges: ['top', 'left', 'right']
})<{ backgroundColor?: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor || COLORS.background};
`;

export const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: ${COLORS.error};
  font-size: 16px;
  text-align: center;
  margin: 20px;
  font-weight: 500;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  color: ${COLORS.textSecondary};
  text-align: center;
  margin-top: 20px;
`;
