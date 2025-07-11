import { useDispatch } from 'react-redux';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { addToCart, loadCartFromStorage, removeFromCart, resetCart } from './cart.slice';
import { useStoreSelectors } from '../useStoreSelectors';
import { renderHook } from '@testing-library/react';
import { wrapper } from '../__mocks__/storeWrapper.mock';
import { CART_STORAGE_KEY, LOAD_CART_STORAGE_ERROR } from '../../constants';
import { PHONE_DETAILS_MOCK } from '../../__mocks__/phones.mock';

describe('Feature: cart store', () => {
    const localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
    };
    const { result: dispatchResult } = renderHook(() => useDispatch(), { wrapper });

    beforeAll(() => {
        vi.stubGlobal('localStorage', localStorageMock);
    });

    describe('Given store actions', () => {

        describe('When loadCartFromStorage action is dispatched', () => {
            describe('And localStorage cart is empty', () => {
                it('Then it should exit early', () => {
                    vi.spyOn(JSON, 'parse');
                    localStorageMock.getItem.mockReturnValueOnce(undefined);
                    dispatchResult.current(loadCartFromStorage());

                    expect(JSON.parse).not.toHaveBeenCalled();
                });
            });

            describe('And localStorage cart is not empty', () => {
                describe('But localStorage cart has valid content', () => {
                    it('Then localStorage cart should be copied to the store', () => {
                        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([PHONE_DETAILS_MOCK]));

                        dispatchResult.current(resetCart());
                        dispatchResult.current(loadCartFromStorage());

                        const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                        expect(result.current.cartPhones).toEqual([PHONE_DETAILS_MOCK]);
                    });
                });

                describe('But localStorage cart has invalid content', () => {
                    beforeAll(() => {
                        vi.spyOn(console, 'warn')
                            .mockImplementationOnce(vi.fn())
                            .mockImplementationOnce(vi.fn());
                        localStorageMock.getItem.mockReturnValueOnce('{');
                        dispatchResult.current(resetCart());
                        dispatchResult.current(loadCartFromStorage());
                    });

                    it('Then it should log the error', () => {
                        expect(console.warn).toHaveBeenCalledWith(LOAD_CART_STORAGE_ERROR);
                    });

                    it('Then store should remain empty', () => {
                        const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                        expect(result.current.cartPhones).toEqual([]);
                    });
                });
            });
        });

        describe('When resetCart action is dispatched', () => {
            const { result } = renderHook(() => useStoreSelectors(), { wrapper });

            beforeAll(() => {
                dispatchResult.current(resetCart());
            });

            it('Then store state should be reset', () => {
                expect(result.current.cartPhones).toEqual([]);
            });

            it('Then cart in localStorage should be removed', () => {
                expect(localStorageMock.removeItem).toHaveBeenCalledWith(CART_STORAGE_KEY);
            });
        });

        describe('When addToCart action is dispatched with new phone to add', () => {
            beforeAll(() => {
                dispatchResult.current(resetCart());
                dispatchResult.current(addToCart(PHONE_DETAILS_MOCK));
            });

            it('Then the new phone should be in the store', () => {
                const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                expect(result.current.cartPhones).toEqual([PHONE_DETAILS_MOCK]);
            });

            it('Then cart should be saved in localStorage', () => {
                expect(localStorageMock.setItem).toHaveBeenCalledWith(CART_STORAGE_KEY, JSON.stringify([PHONE_DETAILS_MOCK]));
            });
        });

        describe.each([
            {
                index: 0,
                cartPhones: [PHONE_DETAILS_MOCK],
                expected: [],
            },
            {
                index: 3,
                cartPhones: [PHONE_DETAILS_MOCK],
                expected: [PHONE_DETAILS_MOCK],
            },
        ])('When removeFromCart action is dispatched', ({ index, cartPhones, expected }) => {
            describe(`And index in payload is ${index}`, () => {
                describe(`But store contains ${JSON.stringify(cartPhones)}`, () => {
                    it(`Then store should contain ${JSON.stringify(expected)}`, () => {
                        dispatchResult.current(resetCart());
                        cartPhones.forEach(cartPhone => {
                            dispatchResult.current(addToCart(cartPhone));
                        });
                        dispatchResult.current(removeFromCart(index));

                        const { result } = renderHook(() => useStoreSelectors(), { wrapper });

                        expect(result.current.cartPhones).toEqual(expected);
                    });
                });
            });
        });
    });
});