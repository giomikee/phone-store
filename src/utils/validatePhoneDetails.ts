import type { Phone } from '../interfaces';

export function validatePhoneDetails(phoneDetails?: Phone): boolean {
    if (!phoneDetails) {
        return false;
    }

    const isValidDescription = phoneDetails.description;
    const isValidSpecs = phoneDetails.specs && Object.keys(phoneDetails.specs).length > 0;
    const isValidColorOptions = phoneDetails.colorOptions && phoneDetails.colorOptions.length > 0;
    const isValidStorageOptions = phoneDetails.storageOptions && Object.keys(phoneDetails.storageOptions).length > 0;

    return Boolean(isValidDescription && isValidSpecs && isValidColorOptions && isValidStorageOptions);
}