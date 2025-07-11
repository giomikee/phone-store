import { describe, expect, it } from 'vitest';
import { validatePhoneDetails } from './validatePhoneDetails';
import { PHONE_DETAILS_MOCK } from '../__mocks__/phones.mock';

describe('Given validatePhoneDetails util', () => {
    describe.each([
        {
            phoneDetails: {
                id: 'id',
                name: 'name',
                brand: 'brand',
                basePrice: 0,
                selectedColor: {
                    hexCode: 'hexCode',
                    name: 'name',
                    imageUrl: 'imageUrl'
                },
                selectedStorage: {
                    capacity: 'capacity',
                    price: 3.1
                },
            },
            expected: false
        },
        {
            phoneDetails: PHONE_DETAILS_MOCK,
            expected: true
        },
    ])('When util is called', ({ phoneDetails, expected }) => {
        describe(`And phone details are "${JSON.stringify(phoneDetails)}"`, () => {
            it(`Then it should return ${expected}`, () => {
                expect(validatePhoneDetails(phoneDetails)).toBe(expected);
            });
        });
    });
});