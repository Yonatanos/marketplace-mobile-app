export const CATEGORIES = {
  ALL: 'all',
} as const;

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const STORE_KEYS = {
  CART: 'cart',
  PRODUCTS: 'products',
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  INITIAL_PAGE: 1,
} as const;

export const TIMING = {
  DEBOUNCE_DELAY: 500,
  CHECKOUT_DELAY: 1500,
  PERSIST_TIMEOUT: 10000,
} as const;

export type SortOrder = typeof SORT_ORDER[keyof typeof SORT_ORDER];
export type Category = typeof CATEGORIES[keyof typeof CATEGORIES] | string;
