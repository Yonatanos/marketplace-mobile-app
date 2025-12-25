import React from 'react';
import { Product } from '@/types/product';
import {
  CardContainer,
  ProductImage,
  InfoContainer,
  Title,
  Price,
  Description,
  RatingContainer,
  RatingText,
  StarIcon,
} from './ProductCard.styled';
import { STRINGS } from '@/constants/strings';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  disabled: boolean;
}

export const ProductCard = ({ product, onPress, disabled }: ProductCardProps) => {
  return (
    <CardContainer disabled={disabled} onPress={onPress}>
      <ProductImage source={{ uri: product?.thumbnail }} resizeMode="cover" key={product?.id} />
      <InfoContainer>
        <Title numberOfLines={1}>{product?.title ?? STRINGS.common.unavailable}</Title>
        <Price>${(product?.price ?? 0).toFixed(2)}</Price>
        <RatingContainer>
          <StarIcon>⭐</StarIcon>
          <RatingText>
            {product?.rating ?? 0} ({product?.ratingCount ?? 0} {STRINGS.product.reviews})
          </RatingText>
        </RatingContainer>
        <Description numberOfLines={2}>{product?.description ?? STRINGS.common.unavailable}</Description>
      </InfoContainer>
    </CardContainer>
  );
};
