import { beforeAll, describe, expect, it, vi, type Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHomePage } from './useHomePage';
import { getPhones } from '../../services';
import { addPhones } from '../../state/phone/phone.slice';
import { INITIAL_PHONES_COUNT, PAGES } from '../../constants';

vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../state/phone/phone.slice');

vi.mock('../../state/useStoreSelectors');

vi.mock('../../services');

describe('Feature: useHomePage hook', () => {
    describe('Given hook methods', () => {
        describe('When fetchPhones method is called', () => {
            describe('And API call is successful', () => {
                const dispatch = useDispatch();

                const mockedPhones = [
                    { id: '1', name: 'Phone 1', brand: 'Brand A', basePrice: 100, selectedColor: { hexCode: '#000', name: 'Black', imageUrl: '' }, selectedStorage: { capacity: '64GB', price: 0 } },
                    { id: '2', name: 'Phone 2', brand: 'Brand B', basePrice: 200, selectedColor: { hexCode: '#fff', name: 'White', imageUrl: '' }, selectedStorage: { capacity: '128GB', price: 50 } }
                ];
                const { result } = renderHook(() => useHomePage());

                beforeAll(() => {
                    (getPhones as Mock).mockResolvedValueOnce(mockedPhones);

                    act(async () => {
                        await result.current.fetchPhones();
                    });
                });

                it('Then addPhones action should be dispatched with fetched phones', async () => {
                    await waitFor(() => {
                        expect(dispatch).toHaveBeenCalledWith(addPhones(mockedPhones));
                    });
                });

                it('Then isLoading should be set to false', async () => {
                    await waitFor(() => {
                        expect(result.current.isLoading).toBe(false);
                    });
                });

            });

            describe('And API call fails', () => {
                const navigate = useNavigate();
                const { result } = renderHook(() => useHomePage());

                beforeAll(() => {
                    (getPhones as Mock).mockRejectedValueOnce(new Error('error'));

                    act(async () => {
                        vi.spyOn(console, 'error').mockImplementationOnce(vi.fn());
                        await result.current.fetchPhones();
                    });
                });

                it('Then it should navigate to error page', async () => {
                    await waitFor(() => {
                        expect(navigate).toHaveBeenCalledWith(PAGES.error);
                    });
                });

                it('Then isLoading should be set to false', async () => {
                    await waitFor(() => {
                        expect(result.current.isLoading).toBe(false);
                    });
                });
            });
        });
    });

    describe('When hook is called', () => {
        const { result } = renderHook(() => useHomePage());

        it('Then hasFetchedRef should be set to true', async () => {
            await waitFor(() => {
                expect(result.current.hasFetchedRef.current).toBe(true);
            });
        });

        it('Then fetchPhones should be called', async () => {
            await waitFor(() => {
                expect(getPhones).toHaveBeenCalledWith({ limit: INITIAL_PHONES_COUNT });
            });
        });
    });
});