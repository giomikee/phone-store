export const PHONE_ID_PLACEHOLDER = ':id';
export const PAGES = {
    home: '/',
    phone: `/phones/${PHONE_ID_PLACEHOLDER}`,
    cart: '/cart',
    error: '/error',
    notFound: '/not-found',
} as const;
export const HTTP_STATUS_CODES = {
    notFound: 404,
} as const;