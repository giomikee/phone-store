import { describe, expect, it } from 'vitest';
import { getCartTotalPrice } from './getCartTotalPrice';

describe('Given getCartTotalPrice util', () => {
    describe.each([
        {
            phones: [],
            expected: 0,
        },
        {
            phones: [
                {
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
                {
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
                        price: 2
                    },
                }
            ],
            expected: 5.1,
        },
    ])('When util is called', ({ phones, expected }) => {
        describe(`And called with "${JSON.stringify(phones)}" phones`, () => {
            it(`Then it should return ${expected}`, () => {
                expect(getCartTotalPrice(phones)).toBe(expected);
            });
        });
    });
});