import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { RootStackParamList } from '@/types/navigation';
import { addToCart } from '@/features/cart/store/cartSlice';
import { selectProductById } from '@/features/products/store/productsSelectors';
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
  const { productId } = route.params;
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => selectProductById(state, productId));
  const stock = product?.stock ?? 0;
  const isOutOfStock = stock === 0;

  if (!product) return null;

  return (
    <SafeScreen backgroundColor={COLORS.white}>
      <ScrollContainer>
        <Image source={{ uri: product?.thumbnail }} resizeMode="cover" />

        <Content>
          <Title>{product?.title ?? STRINGS.common.unavailable}</Title>

          <RatingRow>
            <StarText>⭐ {product?.rating ?? 0}</StarText>
            <RatingInfo> | {STRINGS.product.stock}: {stock} {STRINGS.product.units}</RatingInfo>
          </RatingRow>

          <Price>${(product?.price ?? 0).toFixed(2)}</Price>

          <InfoTagRow>
            <InfoTag>
              <TagText>{ICONS.shipping} {product?.shippingInformation ?? STRINGS.common.unavailable}</TagText>
            </InfoTag>
          </InfoTagRow>

          <Divider />

          <SectionTitle>{STRINGS.product.aboutItem}</SectionTitle>
          <Description>{product?.description ?? STRINGS.common.unavailable}</Description>

          <AddToCartButton
            disabled={isOutOfStock}
            onPress={() => {
              dispatch(addToCart(product));
            }}
          >
            <ButtonText>{isOutOfStock ? STRINGS.product.outOfStock : STRINGS.product.addToCart}</ButtonText>
          </AddToCartButton>
        </Content>
      </ScrollContainer>
    </SafeScreen>
  );
};
