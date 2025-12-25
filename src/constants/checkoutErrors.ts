export enum CheckoutServerCode {
  OUT_OF_STOCK = 409,
  PAYMENT_REQUIRED = 402,
  SERVER_ERROR = 500,
  VALIDATION_ERROR = 422,
}

export const CHECKOUT_ERROR_MESSAGES: Record<number, string> = {
  [CheckoutServerCode.OUT_OF_STOCK]: 'Some items are no longer available. Your cart has been updated.',
  [CheckoutServerCode.PAYMENT_REQUIRED]: 'Payment processing failed. Please try again.',
  [CheckoutServerCode.SERVER_ERROR]: 'Internal server error. Our team is on it.',
  [CheckoutServerCode.VALIDATION_ERROR]: 'Invalid order data.',
};

export const DEFAULT_CHECKOUT_ERROR = 'An unexpected error occurred. Please try again.';
