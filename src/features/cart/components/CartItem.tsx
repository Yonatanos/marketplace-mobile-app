import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, CartItem as CartItemType } from '../store/cartSlice';
import { STRINGS } from '@/constants/strings';
import { ICONS } from '@/constants/icons';
import {
  CartItemContainer,
  ProductImage,
  ItemInfo,
  ItemTitle,
  ItemPrice,
  QuantityControls,
  QuantityButton,
  QuantityText,
  Quantity,
  RemoveButton,
  RemoveText,
} from './CartItem.styled';

interface Props {
  item: CartItemType;
}

export const CartItem = React.memo(({ item }: Props) => {
  const dispatch = useDispatch();
  const stock = item?.product?.stock ?? 0;
  const isStockLimit = stock === item?.quantity;

  return (
    <CartItemContainer>
      <ProductImage source={{ uri: item?.product?.thumbnail }} />
      <ItemInfo>
        <ItemTitle>{item?.product?.title ?? STRINGS.common.unavailable}</ItemTitle>
        <ItemPrice>${(item?.product?.price ?? 0).toFixed(2)}</ItemPrice>

        <QuantityControls>
          <QuantityButton
            onPress={() => dispatch(updateQuantity({ id: item?.product?.id, quantity: (item?.quantity ?? 1) - 1 }))}
          >
            <QuantityText>{STRINGS.common.minusSign}</QuantityText>
          </QuantityButton>

          <Quantity>{item?.quantity ?? 0}</Quantity>

          <QuantityButton
            onPress={() =>
              !isStockLimit && dispatch(updateQuantity({ id: item?.product?.id, quantity: (item?.quantity ?? 0) + 1 }))
            }
            disabled={isStockLimit}
          >
            {!isStockLimit && <QuantityText>{STRINGS.common.plusSign}</QuantityText>}
          </QuantityButton>
        </QuantityControls>
      </ItemInfo>

      <RemoveButton onPress={() => dispatch(removeFromCart(item?.product?.id))}>
        <RemoveText>{ICONS.trash}</RemoveText>
      </RemoveButton>
    </CartItemContainer>
  );
});
