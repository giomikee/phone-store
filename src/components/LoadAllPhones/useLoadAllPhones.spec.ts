import { describe, expect, it, vi, beforeAll, type Mock, type MockInstance } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useLoadAllPhones } from './useLoadAllPhones';
import { INITIAL_PHONES_COUNT, PAGES } from '../../constants';
import { useDispatch } from 'react-redux';
import { getPhones } from '../../services';
import { addPhones } from '../../state/phone/phone.slice';
import { useNavigate } from 'react-router-dom';
import { useStoreSelectors } from '../../state/useStoreSelectors';

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));
vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../../state/phone/phone.slice');

vi.mock('../../state/useStoreSelectors');

vi.mock('../../services');

describe('Given useLoadAllPhones hook', () => {
    const onLoadAll = vi.fn();

    describe('When loadAllPhones is called', () => {

        describe('And isLoading is true', () => {
            it('Then it should exit early', () => {
                const { result } = renderHook(() => useLoadAllPhones(onLoadAll));


                act(() => {
                    result.current.setIsLoading(true);
                });

                const setIsLoadingSpy = vi.spyOn(result.current, 'setIsLoading');

                act(() => {
                    result.current.fetchAllPhones();
                });

                expect(setIsLoadingSpy).not.toHaveBeenCalled();
            });
        });

        describe(`And there are more than ${INITIAL_PHONES_COUNT} phones in the store`, () => {
            let setIsLoadingSpy: MockInstance;

            beforeAll(() => {
                (useStoreSelectors as Mock).mockReturnValue({
                    phones: Array.from({ length: INITIAL_PHONES_COUNT + 1 }),
                });
                const { result } = renderHook(() => useLoadAllPhones(onLoadAll));
                setIsLoadingSpy = vi.spyOn(result.current, 'setIsLoading');

                act(() => {
                    result.current.fetchAllPhones();
                });
            });

            it('Then it should call onLoadAll', () => {
                expect(onLoadAll).toHaveBeenCalled();
            });

            it('Then it should exit early', () => {
                expect(setIsLoadingSpy).not.toHaveBeenCalled();
            });
        });

        describe('And isLoading is false', () => {
            describe(`But there are up to ${INITIAL_PHONES_COUNT} phones in the store`, () => {
                describe('And API call is successful', () => {
                    const dispatch = useDispatch();
                    const getPhonesMockedResponse = [{ id: '1', name: 'Phone 1', brand: 'brand', basePrice: 123 }, { id: '2', name: 'Phone 2', brand: 'brand', basePrice: 123 }];
                    const { result } = renderHook(() => useLoadAllPhones(onLoadAll));

                    beforeAll(() => {
                        (useStoreSelectors as Mock).mockReturnValue({
                            phones: Array.from({ length: INITIAL_PHONES_COUNT }),
                        });

                        (getPhones as Mock).mockResolvedValue(getPhonesMockedResponse);

                        act(async () => {
                            await result.current.fetchAllPhones();
                        });
                    });

                    it('Then addPhones action should be dispatched with fetched phones', () => {
                        expect(dispatch).toHaveBeenCalledWith(addPhones(getPhonesMockedResponse));
                    });

                    it('Then isLoading should be set to false', () => {
                        expect(result.current.isLoading).toBe(false);
                    });

                    it('Then onLoadAll should be called', () => {
                        expect(onLoadAll).toHaveBeenCalled();
                    });
                });

                describe('And API call fails', () => {
                    const navigate = useNavigate();
                    const { result } = renderHook(() => useLoadAllPhones(onLoadAll));

                    beforeAll(() => {
                        (useStoreSelectors as Mock).mockReturnValue({
                            phones: Array.from({ length: INITIAL_PHONES_COUNT }),
                        });

                        (getPhones as Mock).mockRejectedValue(new Error('API call failed'));

                        act(async () => {
                            await result.current.fetchAllPhones();
                        });
                    });

                    it('Then navigate to error page should be called', () => {
                        expect(navigate).toHaveBeenCalledWith(PAGES.error);
                    });

                    it('Then isLoading should be set to false', () => {
                        expect(result.current.isLoading).toBe(false);
                    });

                    it('Then onLoadAll should be called', () => {
                        expect(onLoadAll).toHaveBeenCalled();
                    });
                });
            });
        });
    });
});