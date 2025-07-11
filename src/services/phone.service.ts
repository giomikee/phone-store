import type { Phone, PhoneServiceQueryParams } from '../interfaces';
import { addUrlQueryParams } from '../utils';
import { PHONE_API_BASE_HEADERS, PHONE_API_ENDPOINTS, PHONE_ID_PLACEHOLDER } from './phone.service.const';

function sendRequest<T>(endpoint: string): Promise<T> {
    return fetch(endpoint,
        {
            headers: PHONE_API_BASE_HEADERS,
        }
    ).then(response => {
        if (!response.ok) {
            throw response;
        }

        return response.json();
    });
}

export async function getPhones(queryParams: PhoneServiceQueryParams = {}): Promise<Phone[]> {
    const endpoint = addUrlQueryParams(PHONE_API_ENDPOINTS.getPhones, queryParams);

    return sendRequest(endpoint);
}

export async function getPhone(id: string): Promise<Phone> {
    const endpoint = PHONE_API_ENDPOINTS.getPhone.replace(PHONE_ID_PLACEHOLDER, id);

    return sendRequest(endpoint);
}
