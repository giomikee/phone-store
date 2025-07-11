export const formatPrice = (price: number, currency = '€'): string =>
    `${(Math.round(price * 100) / 100).toFixed(2)} ${currency}`;