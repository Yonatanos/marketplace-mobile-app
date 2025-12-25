export const SCREEN_NAMES = {
  PRODUCTS: 'Products',
  PRODUCT_DETAILS: 'ProductDetails',
  CART: 'Cart',
  SHOP: 'Shop',
  MAIN_TABS: 'MainTabs',
} as const;

export type ScreenName = (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES];
