import { useDispatch } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { useStoreSelectors } from '../useStoreSelectors';
import { renderHook } from '@testing-library/react';
import { wrapper } from '../__mocks__/storeWrapper.mock';
import { PHONE_DETAILS_MOCK } from '../../__mocks__/phones.mock';
import { addPhones, resetPhoneStore, setAreSearchResultsDisplayed, setSearchedPhones, storePhoneDetails } from './phone.slice';

describe('Feature: phone store', () => {
    const { result: dispatchResult } = renderHook(() => useDispatch(), { wrapper });

    describe('Given store actions', () => {
        describe('When resetPhoneStore is dispatched', () => {
            it('Then store state should be reset', () => {
                dispatchResult.current(resetPhoneStore());

                const { result } = renderHook(() => useStoreSelectors(), { wrapper });
                const {
                    phones,
                    searchedPhones,
                    areSearchResultsDisplayed
                } = result.current;

                expect({
                    phones,
                    searchedPhones,
                    areSearchResultsDisplayed
                }).toEqual({
                    phones: [],
                    searchedPhones: [],
                    areSearchResultsDisplayed: false,
                });
            });
        });

        describe('When addPhones action is dispatched with phones to add to store', () => {
            it('Then it should add to store the phones from payload', () => {
                dispatchResult.current(resetPhoneStore());
                dispatchResult.current(addPhones([PHONE_DETAILS_MOCK, PHONE_DETAILS_MOCK]));

                const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                expect(result.current.phones).toEqual([PHONE_DETAILS_MOCK, PHONE_DETAILS_MOCK]);
            });
        });

        describe('When setSearchedPhones action is dispatched with searched phones', () => {
            it('Then it should set searchedPhones with phones from payload', () => {
                dispatchResult.current(resetPhoneStore());
                dispatchResult.current(setSearchedPhones([PHONE_DETAILS_MOCK, PHONE_DETAILS_MOCK]));

                const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                expect(result.current.searchedPhones).toEqual([PHONE_DETAILS_MOCK, PHONE_DETAILS_MOCK]);
            });
        });

        describe.each([true, false])('When setAreSearchResultsDisplayed action is dispatched', (payload) => {
            describe(`And payload is ${payload}`, () => {
                it(`Then areSearchResultsDisplayed should be set to ${payload}`, () => {
                    dispatchResult.current(setAreSearchResultsDisplayed(payload));

                    const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                    expect(result.current.areSearchResultsDisplayed).toBe(payload);
                });
            });
        });

        describe('When storePhoneDetails action is dispatched with phone details in payload', () => {
            const { id, name, brand, basePrice } = PHONE_DETAILS_MOCK;
            const basicPhoneDetailsMock = { id, name, brand, basePrice };

            describe('And phone details in payload is not found in store', () => {
                it('Then it should not be saved in store', () => {
                    dispatchResult.current(resetPhoneStore());
                    dispatchResult.current(storePhoneDetails(PHONE_DETAILS_MOCK));

                    const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                    expect(result.current.phones).toEqual([]);
                });
            });

            describe.each([
                {
                    payload: PHONE_DETAILS_MOCK,
                    areDetailsCorrect: true,
                    expected: [PHONE_DETAILS_MOCK],
                },
                {
                    payload: {
                        ...PHONE_DETAILS_MOCK,
                        description: undefined,
                    },
                    areDetailsCorrect: false,
                    expected: [basicPhoneDetailsMock],
                },
            ])('And phone details in payload is found in store', ({ payload, areDetailsCorrect, expected }) => {
                describe(`And payload has ${areDetailsCorrect ? 'correct' : 'incorrect'} details`, () => {
                    it(`Then payload should ${areDetailsCorrect ? '' : 'not'} be saved in the store`, () => {
                        dispatchResult.current(resetPhoneStore());
                        dispatchResult.current(addPhones([basicPhoneDetailsMock]));
                        dispatchResult.current(storePhoneDetails(payload));

                        const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                        expect(result.current.phones).toEqual(expected);
                    });
                });
            });
        });


    });
});