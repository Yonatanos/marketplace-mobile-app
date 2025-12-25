import { Product, FetchProductsResponse } from '@/types/product';
import productsData from '@/data/products.json';
import { STRINGS } from '@/constants/strings';
import { CATEGORIES, SORT_ORDER, SortOrder } from '@/constants/config';
import orderBy from 'lodash-es/orderBy';
import { delay } from '@/utils/async';
import { logger } from '@/utils/logger';

export const fetchProducts = async ({
  page,
  limit,
  searchQuery = STRINGS.common.empty,
  selectedCategory = CATEGORIES.ALL,
  sortOrder = SORT_ORDER.ASC,
}: {
  page: number;
  limit: number;
  searchQuery?: string;
  selectedCategory?: string;
  sortOrder?: SortOrder;
}): Promise<FetchProductsResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const rawProducts = productsData?.products;

    if (!Array.isArray(rawProducts)) {
      throw new Error('Data format error: products array is missing');
    }

    let filteredData = [...rawProducts];

    filteredData = filteredData.filter((product) => {
      const categoryMatch =
        !selectedCategory ||
        selectedCategory === CATEGORIES.ALL ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      let searchMatch = true;

      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();

        searchMatch = product.title?.toLowerCase().includes(lowerQuery) ?? false;
      }

      return categoryMatch && searchMatch;
    });

    filteredData = orderBy(filteredData, ['price'], [sortOrder]);

    const safePage = Math.max(1, page);
    const start = (safePage - 1) * limit;
    const end = start + limit;

    const paginatedItems: Product[] = filteredData.slice(start, end).map(
      (item): Product => ({
        id: item?.id ?? Math.random(),
        title: item?.title ?? 'Unknown Product',
        description: item?.description ?? '',
        category: item?.category ?? 'General',
        price: item?.price ?? 0,
        rating: item?.rating ?? 0,
        stock: item?.stock ?? 0,
        thumbnail: item?.thumbnail ?? '',
        shippingInformation: item?.shippingInformation ?? 'Standard shipping',
        reviews: Array.isArray(item?.reviews) ? item.reviews.map((review) => review?.comment ?? '') : [],
        ratingCount: item?.reviews?.length ?? 0,
      }),
    );

    return {
      products: paginatedItems,
      total: filteredData.length,
      hasMore: end < filteredData.length,
    };
  } catch (error) {
    logger.error('[MockAPI Error]:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch products');
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  await delay(300);

  const categories = productsData.products.map((p) => p.category);

  return [CATEGORIES.ALL, ...Array.from(new Set(categories))];
};
