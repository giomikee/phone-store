const baseUrl = import.meta.env.VITE_APP_BASE || '/';

export const PHONE_ID_PLACEHOLDER = ':id';
export const PAGES = {
    home: baseUrl,
    phone: `${baseUrl}phones/${PHONE_ID_PLACEHOLDER}`,
    cart: `${baseUrl}cart`,
    error: `${baseUrl}error`,
    notFound: `${baseUrl}not-found`,
} as const;
export const HTTP_STATUS_CODES = {
    notFound: 404,
} as const;