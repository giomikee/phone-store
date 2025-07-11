import { beforeAll, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { useCartPage } from './useCartPage';

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../state/cart/cart.slice');

describe('Feature: useCartPage hook', () => {
    const mockedPhoneToRemove = {
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
    };

    describe('Given hook methods', () => {
        describe('When handleClickRemove is called', () => {
            describe(`And phone to remove is ${JSON.stringify(mockedPhoneToRemove)}`, () => {
                describe('But index is 1', () => {
                    const { result } = renderHook(() => useCartPage());

                    beforeAll(() => {
                        act(() => {
                            result.current.handleClickRemove(mockedPhoneToRemove, 1);
                        });
                    });

                    it(`Then phoneToRemove should be set to $${JSON.stringify(mockedPhoneToRemove)}`, () => {
                        expect(result.current.phoneToRemove).toEqual(mockedPhoneToRemove);
                    });

                    it('Then cartIndexToRemove should be set to 1', () => {
                        expect(result.current.cartIndexToRemove).toBe(1);
                    });

                    it('Then isDialogOpen should be set to true', () => {
                        expect(result.current.isDialogOpen).toBe(true);
                    });
                });
            });
        });

        describe('When handleCloseDialog is called', () => {
            describe('And cartIndexToRemove is null', () => {
                it('Then it should exit early', () => {
                    const { result } = renderHook(() => useCartPage());

                    vi.spyOn(result.current, 'setPhoneToRemove');

                    act(() => {
                        result.current.setCartIndexToRemove(null);
                    });

                    act(() => {
                        result.current.handleCloseDialog(true);
                    });

                    expect(result.current.setPhoneToRemove).not.toHaveBeenCalled();
                });
            });

            describe.each([true, false])('And cartIndexToRemove is 1', (isDeleteConfirmed) => {
                describe(`And isDeleteConfirmed is ${isDeleteConfirmed}`, () => {
                    const { result } = renderHook(() => useCartPage());

                    beforeAll(async () => {
                        act(() => {
                            result.current.setCartIndexToRemove(1);
                        });

                        await waitFor(() => {
                            act(() => {
                                result.current.handleCloseDialog(isDeleteConfirmed);
                            });
                        });
                    });


                    it('Then phoneToRemove should be set to null', () => {
                        expect(result.current.phoneToRemove).toBeNull();
                    });

                    it('Then cartIndexToRemove should be set to null', () => {
                        expect(result.current.cartIndexToRemove).toBeNull();
                    });

                    it('Then isDialogOpen should be set to false', () => {
                        expect(result.current.isDialogOpen).toBe(false);
                    });
                });
            });
        });
    });
});