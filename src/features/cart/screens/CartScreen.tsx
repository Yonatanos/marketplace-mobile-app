import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, selectIsCheckingOut } from '../store/cartSelectors';
import { checkoutRequest } from '../store/cartSlice';
import { SafeScreen, Center, EmptyText } from '@/components/SharedComponents';
import { CartItem } from '@/features/cart/components/CartItem';
import { COLORS } from '@/constants/colors';
import { STRINGS } from '@/constants/strings';
import { safeKeyExtractor, KEY_PREFIXES } from '@/utils/keyExtractor';
import { usePreventBack } from '@/hooks/usePreventBack';
import {
  CartList,
  Footer,
  TotalRow,
  TotalLabel,
  TotalValue,
  CheckoutButton,
  CheckoutText,
  LoadingOverlay,
  LoadingContainer,
} from './CartScreen.styled';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CartScreen = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems) ?? []; 
  const totalAmount = useSelector(selectCartTotalAmount) ?? 0; 
  const isCheckingOut = useSelector(selectIsCheckingOut);
  const insets = useSafeAreaInsets();

  usePreventBack();
  
  const handlePlaceOrder = () => {
    if (items.length === 0 || isCheckingOut) return;

    dispatch(checkoutRequest());
  };

  if (items.length === 0) {
    return (
      <SafeScreen>
        <Center>
          <EmptyText>{STRINGS.cart.emptyCart}</EmptyText>
        </Center>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <CartList
        data={items ?? []}
        keyExtractor={(item, index) => safeKeyExtractor(item?.product?.id, index, KEY_PREFIXES.CART)}
        renderItem={({ item }) => <CartItem item={item} />}
      />

      <Footer bottomInset={insets.bottom}>
        <TotalRow>
          <TotalLabel>{STRINGS.cart.totalAmount}</TotalLabel>
          <TotalValue>${totalAmount.toFixed(2)}</TotalValue>
        </TotalRow>

        <CheckoutButton
          onPress={handlePlaceOrder}
          disabled={!!isCheckingOut}
          style={{
            opacity: isCheckingOut ? 0.7 : 1,
          }}
        >
          <CheckoutText>{STRINGS.cart.checkout}</CheckoutText>
        </CheckoutButton>
      </Footer>

      {isCheckingOut && (
        <LoadingOverlay>
          <LoadingContainer>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </LoadingContainer>
        </LoadingOverlay>
      )}
    </SafeScreen>
  );
};
