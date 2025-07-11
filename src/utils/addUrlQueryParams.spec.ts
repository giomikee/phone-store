import { describe, expect, it } from 'vitest';
import { addUrlQueryParams } from './addUrlQueryParams';

describe('Given addUrlQueryParams util', () => {
    const mockUrl = 'http://test.com';

    describe.each([
        {
            queryParams: { limit: 10, offset: 20 },
            expected: 'http://test.com/?limit=10&offset=20'
        },
        {
            queryParams: {},
            expected: 'http://test.com/'
        },
    ])(`When util is called with "${mockUrl}" url`, ({ expected, queryParams }) => {
        describe(`And queryParams is ${JSON.stringify(queryParams)}`, () => {
            it(`Then it should return ${expected}`, () => {
                expect(addUrlQueryParams(mockUrl, queryParams)).toBe(expected);
            });
        });
    });
});