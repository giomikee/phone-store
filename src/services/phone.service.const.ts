export const PHONE_ID_PLACEHOLDER = '{phoneId}';
export const PHONE_API_ENDPOINTS = {
    getPhones: `${import.meta.env.VITE_PHONE_STORE_API_URL}products`,
    getPhone: `${import.meta.env.VITE_PHONE_STORE_API_URL}products/${PHONE_ID_PLACEHOLDER}`
} as const;
export const PHONE_API_BASE_HEADERS = {
    'x-api-key': import.meta.env.VITE_PHONE_STORE_API_KEY
} as const;