import { beforeAll, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PHONE_DETAILS_MOCK } from '../../__mocks__/phones.mock';
import { usePhonePage } from './usePhonePage';
import { addToCart } from '../../state/cart/cart.slice';
import { getPhone } from '../../services';
import { HTTP_STATUS_CODES, PAGES } from '../../constants';
import { storePhoneDetails } from '../../state/phone/phone.slice';
import { useStoreSelectors } from '../../state/useStoreSelectors';

vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
    useParams: vi.fn().mockReturnValue({}),
}));

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../../state/useStoreSelectors');

vi.mock('../../state/cart/cart.slice');

vi.mock('../../state/phone/phone.slice');

vi.mock('../../services');

describe('Feature: usePhonePage hook', () => {
    describe('Given hook methods', () => {
        describe.each([
            {
                phoneDetails: PHONE_DETAILS_MOCK,
                expected: PHONE_DETAILS_MOCK.colorOptions[0],
            },
            {
                phoneDetails: {
                    ...PHONE_DETAILS_MOCK,
                    colorOptions: [],
                },
                expected: null,
            },
        ])('When updateSelectedColor is called with "hexCode" hexCode', ({ phoneDetails, expected }) => {
            describe(`And phoneDetails.colorOptions is ${JSON.stringify(phoneDetails.colorOptions)}`, () => {
                it(`Then selectedColor should be ${JSON.stringify(expected)}`, async () => {
                    const { result } = renderHook(() => usePhonePage());

                    act(() => {
                        result.current.setPhoneDetails(phoneDetails);
                    });

                    await waitFor(() => {
                        expect(result.current.phoneDetails).toEqual(phoneDetails);
                    });

                    act(() => {
                        result.current.updateSelectedColor('hexCode');
                    });

                    await waitFor(() => {
                        expect(result.current.selectedColor).toEqual(expected);
                    });
                });
            });
        });

        describe.each([
            {
                phoneDetails: PHONE_DETAILS_MOCK,
                expected: PHONE_DETAILS_MOCK.storageOptions[0],
            },
            {
                phoneDetails: {
                    ...PHONE_DETAILS_MOCK,
                    storageOptions: [],
                },
                expected: null,
            },
        ])('When updateSelectedStorage is called with "capacity" capacity', ({ phoneDetails, expected }) => {
            describe(`And phoneDetails.storageOptions is ${JSON.stringify(phoneDetails.storageOptions)}`, () => {
                it(`Then selectedStorage should be ${JSON.stringify(expected)}`, async () => {
                    const { result } = renderHook(() => usePhonePage());

                    act(() => {
                        result.current.setPhoneDetails(phoneDetails);
                    });

                    await waitFor(() => {
                        expect(result.current.phoneDetails).toEqual(phoneDetails);
                    });

                    act(() => {
                        result.current.updateSelectedStorage('capacity');
                    });

                    await waitFor(() => {
                        expect(result.current.selectedStorage).toEqual(expected);
                    });

                });
            });
        });

        describe.each([
            {
                phoneDetails: null,
                selectedColor: null,
                selectedStorage: null,
                sentence: 'Then it should exit early',
            },
            {
                phoneDetails: PHONE_DETAILS_MOCK,
                selectedColor: PHONE_DETAILS_MOCK.colorOptions[0],
                selectedStorage: PHONE_DETAILS_MOCK.storageOptions[0],
                sentence: 'Then addToCart action should be dispatched with phone to add',
            },
        ])('When handleAddToCart method is called', ({ phoneDetails, selectedColor, selectedStorage, sentence }) => {
            describe(`And phoneDetails is ${phoneDetails ? 'set' : phoneDetails}`, () => {
                describe(`But selectedColor is ${selectedColor ? 'set' : selectedColor}`, () => {
                    describe(`And selectedStorage is ${selectedStorage ? 'set' : selectedStorage}`, () => {
                        it(sentence, async () => {
                            const dispatch = useDispatch();
                            const { result } = renderHook(() => usePhonePage());

                            act(() => {
                                result.current.setPhoneDetails(phoneDetails);
                                result.current.setSelectedColor(selectedColor);
                                result.current.setSelectedStorage(selectedStorage);
                            });

                            await waitFor(() => {
                                (dispatch as Mock).mockClear();

                                result.current.handleAddToCart();

                                if (phoneDetails && selectedColor && selectedStorage) {
                                    expect(dispatch).toHaveBeenCalledWith(
                                        addToCart({
                                            ...phoneDetails,
                                            selectedColor,
                                            selectedStorage,
                                        })
                                    );
                                } else {
                                    expect(dispatch).not.toHaveBeenCalled();
                                }
                            });
                        });

                    });
                });
            });
        });

        describe('When getPhoneDetails method is called', () => {
            describe('And id is empty', () => {
                (useParams as Mock).mockReturnValueOnce({ id: '' });
                const navigate = useNavigate();
                const { result } = renderHook(() => usePhonePage());

                beforeAll(async () => {
                    (getPhone as Mock).mockClear();

                    await act(async () => {
                        await result.current.getPhoneDetails();
                    });
                });

                it('Then it should navigate to not found page', () => {
                    expect(navigate).toHaveBeenCalledWith(PAGES.notFound);
                });

                it('Then it should exit early', () => {
                    expect(getPhone).not.toHaveBeenCalled();
                });
            });

            describe('And id is "1"', () => {
                describe('But API call is successful', () => {
                    (useParams as Mock).mockReturnValueOnce({ id: '1' });
                    (getPhone as Mock).mockReturnValueOnce(PHONE_DETAILS_MOCK);

                    const dispatch = useDispatch();
                    const { result } = renderHook(() => usePhonePage());

                    beforeAll(async () => {
                        vi.spyOn(window, 'scrollTo').mockImplementationOnce(vi.fn());

                        await act(async () => {
                            await result.current.getPhoneDetails();
                        });
                    });

                    it('Then phoneDetails should be set to the API response', async () => {
                        await waitFor(() => {
                            expect(result.current.phoneDetails).toEqual(PHONE_DETAILS_MOCK);
                        });
                    });

                    it('Then storePhoneDetails action should be dispatched with the API response', async () => {
                        await waitFor(() => {
                            expect(dispatch).toHaveBeenCalledWith(storePhoneDetails(PHONE_DETAILS_MOCK));
                        });
                    });

                    it('Then selectedColor should be null', async () => {
                        await waitFor(() => {
                            expect(result.current.selectedColor).toBeNull();
                        });
                    });

                    it('Then selectedStorage should be null', async () => {
                        await waitFor(() => {
                            expect(result.current.selectedStorage).toBeNull();
                        });
                    });

                    it('Then it should scroll to top of page', () => {
                        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
                    });
                });

                describe.each([
                    {
                        error: {
                            status: HTTP_STATUS_CODES.notFound
                        },
                        page: PAGES.notFound,
                        pageName: 'not found'
                    },
                    {
                        error: 'error',
                        page: PAGES.error,
                        pageName: 'error'
                    },
                ])('But API call fails', ({ error, page, pageName }) => {
                    describe(`And error is ${JSON.stringify(error)}`, () => {
                        it(`Then it should navigate to ${pageName} page`, async () => {
                            const navigate = useNavigate();

                            (useParams as Mock).mockReturnValueOnce({ id: '1' });
                            (getPhone as Mock).mockRejectedValueOnce(error);

                            const { result } = renderHook(() => usePhonePage());

                            await act(async () => {
                                await result.current.getPhoneDetails();
                            });

                            expect(navigate).toHaveBeenCalledWith(page);
                        });
                    });
                });
            });
        });
    });

    describe('When id is updated', () => {
        describe('And id is empty', () => {
            it('Then it should navigate to not found page', async () => {
                (useParams as Mock).mockReturnValueOnce({ id: '' });

                const navigate = useNavigate();
                renderHook(() => usePhonePage());

                await waitFor(() => {
                    navigate(PAGES.notFound);
                });
            });
        });

        describe('And id is "id"', () => {
            beforeEach(() => {
                (getPhone as Mock).mockClear();
            });

            describe('But valid phone details with matching id is found in store', () => {
                (useParams as Mock).mockReturnValueOnce({ id: 'id' });
                (useStoreSelectors as Mock).mockReturnValueOnce({
                    phones: [PHONE_DETAILS_MOCK],
                });

                const { result } = renderHook(() => usePhonePage());

                it('Then phoneDetails should be set to stored phone details', async () => {
                    await waitFor(() => {
                        expect(result.current.phoneDetails);
                    });
                });

                it('Then it should exit early', async () => {
                    await waitFor(() => {
                        expect(getPhone).not.toHaveBeenCalled();
                    });
                });
            });

            describe('But no stored phone details matches the id', () => {
                it('Then it should call the API to get phone details with "id" id', async () => {
                    (useParams as Mock).mockReturnValueOnce({ id: 'id' });
                    (useStoreSelectors as Mock).mockReturnValueOnce({ phones: [] });

                    renderHook(() => usePhonePage());

                    await waitFor(() => {
                        expect(getPhone).toHaveBeenCalledWith('id');
                    });
                });
            });
        });
    });
});