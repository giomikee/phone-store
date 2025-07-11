import { afterAll, beforeAll, describe, expect, it, vi, type Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSearchPhonesInput } from './useSearchPhonesInput';
import { act } from 'react';
import { useDispatch } from 'react-redux';
import { setAreSearchResultsDisplayed, setSearchedPhones } from '../../state/phone/phone.slice';
import { START_SEARCH_DELAY } from './SearchPhonesInput.const';
import { getPhones } from '../../services';

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

describe('Feature: useSearchPhonesInput hook', () => {
    const onSearchLoading = vi.fn();

    describe('Given hook methods', () => {
        describe('When startSearch is called', () => {
            const { result } = renderHook(() => useSearchPhonesInput(onSearchLoading));

            beforeAll(() => {
                act(() => {
                    result.current.startSearch();
                });
            });

            it('Then it should set isLoading to true', () => {
                expect(result.current.isLoading).toBe(true);
            });

            it('Then it should call onSearchLoading with true', () => {
                expect(onSearchLoading).toHaveBeenCalledWith(true);
            });

            it('Then it should clear the timeout', () => {
                expect(result.current.timeoutIdRef.current).toBeUndefined();
            });
        });

        describe('When clearSearchResults is called', () => {
            const dispatch = useDispatch();
            const { result } = renderHook(() => useSearchPhonesInput(onSearchLoading));

            beforeAll(() => {
                act(() => {
                    result.current.clearSearchResults();
                });
            });

            it('Then setSearchedPhones action should be dispatched with an empty array', () => {
                expect(dispatch).toHaveBeenCalledWith(setSearchedPhones([]));
            });

            it('Then isLoading should be set to false', () => {
                expect(result.current.isLoading).toBe(false);
            });

            it('Then onSearchLoading should be called with false', () => {
                expect(onSearchLoading).toHaveBeenCalledWith(false);
            });

            it('Then setAreSearchResultsDisplayed action should be dispatched with false', () => {
                expect(dispatch).toHaveBeenCalledWith(setAreSearchResultsDisplayed(false));
            });
        });
    });

    describe('When keywords is updated', () => {
        describe('And isFirstRender ref is true', () => {
            beforeAll(() => {
                onSearchLoading.mockClear();
            });

            const { result } = renderHook(() => useSearchPhonesInput(onSearchLoading));

            it('Then isFirstRender should be set to false', async () => {
                expect(result.current.isFirstRender.current).toBe(false);
            });

            it('Then it should not start a search', () => {
                expect(onSearchLoading).not.toHaveBeenCalled();
            });
        });

        describe('And isFirstRender ref is false', () => {

            it('Then it should call startSearch', () => {
                const { result } = renderHook(() => useSearchPhonesInput(onSearchLoading));

                act(() => {
                    result.current.setKeywords('b');
                });

                expect(onSearchLoading).toHaveBeenCalledWith(true);
            });

            describe('And keywords is empty', () => {
                it('Then it should clear search results', () => {
                    onSearchLoading.mockClear();

                    const { result } = renderHook(() => useSearchPhonesInput(onSearchLoading));

                    act(() => {
                        result.current.setKeywords('bb');
                    });

                    act(() => {
                        result.current.setKeywords('');
                    });

                    expect(onSearchLoading).toHaveBeenCalledWith(false);
                });
            });

            describe('And keywords is "foobar"', () => {
                describe(`But ${START_SEARCH_DELAY} ms has passed`, () => {
                    describe(`And API call is successful`, () => {
                        const dispatch = useDispatch();
                        const { result } = renderHook(() => useSearchPhonesInput(onSearchLoading));
                        const getPhonesMockedResponse = [{ id: '1', name: 'Phone 1', brand: 'brand', basePrice: 123 }];

                        beforeAll(() => {
                            vi.useFakeTimers();
                            (getPhones as Mock).mockResolvedValue(getPhonesMockedResponse);

                            act(() => {
                                result.current.setKeywords('foobar');
                            });
                            vi.advanceTimersByTime(START_SEARCH_DELAY);
                        });

                        afterAll(() => {
                            vi.useRealTimers();
                        });

                        it('Then setSearchedPhones action should be dispatched with the searched phones', () => {
                            expect(dispatch).toHaveBeenCalledWith(setSearchedPhones(getPhonesMockedResponse));
                        });

                        it('Then isLoading should be set to false', () => {
                            expect(result.current.isLoading).toBe(false);
                        });

                        it('Then onSearchLoading should be called with false', () => {
                            expect(onSearchLoading).toHaveBeenCalledWith(false);
                        });

                        it('Then setAreSearchResultsDisplayed action should be dispatched with true', () => {
                            expect(dispatch).toHaveBeenCalledWith(setAreSearchResultsDisplayed(true));
                        });
                    });
                });
            });
        });
    });
});