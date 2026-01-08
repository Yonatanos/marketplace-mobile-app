import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { RootStackParamList } from '@/types/navigation';
import { addToCart } from '@/features/cart/store/cartSlice';
import { selectProductById } from '@/features/products/store/productsSelectors';
import { selectCartItemQuantity } from '@/features/cart/store/cartSelectors';
import { STRINGS } from '@/constants/strings';
import { ICONS } from '@/constants/icons';
import { SafeScreen } from '@/components/SharedComponents';
import { COLORS } from '@/constants/colors';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SCREEN_NAMES } from '@/constants/screenNames';
import {
  ScrollContainer,
  Image,
  Content,
  Title,
  RatingRow,
  StarText,
  RatingInfo,
  Price,
  InfoTagRow,
  InfoTag,
  TagText,
  Divider,
  SectionTitle,
  Description,
  AddToCartButton,
  ButtonText,
} from './ProductDetailsScreen.styled';


export const ProductDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, typeof SCREEN_NAMES.PRODUCT_DETAILS>>();
  const dispatch = useDispatch();
  
  // Guard against undefined route params - get productId safely
  const productId = route?.params?.productId;
  
  const product = useSelector((state: RootState) => 
    productId ? selectProductById(state, productId) : undefined
  );
  
  // Check cart quantity for this product
  const cartQuantity = useSelector((state: RootState) =>
    productId ? selectCartItemQuantity(state, productId) : 0
  );
  
  // Early return if productId or product not found
  if (!productId || !product) {
    return null;
  }

  const stock = product.stock ?? 0;
  const isOutOfStock = stock === 0;
  const isMaxQuantityReached = cartQuantity >= stock;
  const isButtonDisabled = isOutOfStock || isMaxQuantityReached;

  // Determine button text based on state
  const getButtonText = () => {
    if (isOutOfStock) return STRINGS.product.outOfStock;

    if (isMaxQuantityReached) return STRINGS.product.maxQuantityInCart;

    return STRINGS.product.addToCart;
  };

  return (
    <SafeScreen backgroundColor={COLORS.white}>
      <ScrollContainer>
        <Image source={{ uri: product.thumbnail }} resizeMode="cover" />

        <Content>
          <Title>{product.title}</Title>

          <RatingRow>
            <StarText>⭐ {product.rating}</StarText>
            <RatingInfo> | {STRINGS.product.stock}: {stock} {STRINGS.product.units}</RatingInfo>
          </RatingRow>

          <Price>${product.price.toFixed(2)}</Price>

          <InfoTagRow>
            <InfoTag>
              <TagText>{ICONS.shipping} {product.shippingInformation}</TagText>
            </InfoTag>
          </InfoTagRow>

          <Divider />

          <SectionTitle>{STRINGS.product.aboutItem}</SectionTitle>
          <Description>{product.description}</Description>

          <AddToCartButton
            disabled={isButtonDisabled}
            onPress={() => {
              dispatch(addToCart(product));
            }}
          >
            <ButtonText>{getButtonText()}</ButtonText>
          </AddToCartButton>
        </Content>
      </ScrollContainer>
    </SafeScreen>
  );
};
