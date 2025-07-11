import { describe, expect, it } from 'vitest';
import { formatPrice } from './formatPrice';

describe('Given formatPrice util', () => {
    describe.each([
        {
            price: 26,
            currency: undefined,
            expected: '26.00 €',
        },
        {
            price: 26.3,
            currency: '$',
            expected: '26.30 $',
        },
        {
            price: 123.455,
            currency: '€',
            expected: '123.46 €',
        },
        {
            price: 123.422,
            currency: '€',
            expected: '123.42 €',
        },
    ])('When util is called', ({ price, currency, expected }) => {
        describe(`And price is ${price}`, () => {
            describe(`But currency is "${currency}"`, () => {
                it(`Then it should return "${expected}"`, () => {
                    expect(formatPrice(price, currency)).toBe(expected);
                });
            });
        });
    });
});