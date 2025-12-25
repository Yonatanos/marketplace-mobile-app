import isUndefined from "lodash-es/isUndefined";
import isNull from "lodash-es/isNull";

/**
 * Prefixes for FlatList key extraction fallbacks
 */
export const KEY_PREFIXES = {
  PRODUCT: 'product',
  CART: 'cart',
  CATEGORY: 'category',
} as const;

/**
 * Generates a safe unique key for FlatList items.
 * Converts the key to string if valid, otherwise falls back to prefix-index.
 * 
 * @param key - The key value (will be converted to string)
 * @param index - The item's index in the array
 * @param prefix - Prefix for fallback keys (use KEY_PREFIXES constants)
 * @returns A unique string key
 */
export const safeKeyExtractor = (
  key: unknown,
  index: number,
  prefix: string
): string => {
  if (!isNull(key) && !isUndefined(key)) return String(key);

  return `${prefix}-${index}`;
};
