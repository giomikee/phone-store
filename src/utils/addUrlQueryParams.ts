import type { PhoneServiceQueryParams } from '../interfaces';

export const addUrlQueryParams = (url: string, queryParams: PhoneServiceQueryParams): string => {
    const parsedUrl = new URL(url);

    Object.keys(queryParams).forEach((key) => {
        parsedUrl.searchParams.set(key, `${queryParams[key as keyof PhoneServiceQueryParams]}`);
    });

    return parsedUrl.toString();
};