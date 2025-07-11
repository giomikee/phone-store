import { describe, expect, it, vi, type Mock } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import HomePage from './HomePage';
import { useHomePage } from './useHomePage';

vi.mock('./useHomePage', () =>({
    useHomePage: vi.fn().mockReturnValue({
        isLoading: false,
        isInitialLoad:true,
        isLoadingSearch: false,
        visiblePhones: [
            {
                id: 'id',
                name: 'name',
                brand: 'brand',
                basePrice: 333,
            },
        ],
        setIsLoadingSearch: vi.fn(),
        setIsInitialLoad: vi.fn(),
    })
}))

vi.mock('../../components/LoadAllPhones/useLoadAllPhones');

vi.mock('../../state/useStoreSelectors');

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

describe('Given HomePage component', () => { 
    const mockedUseHomePage = {
        isLoading: false,
        isInitialLoad:true,
        isLoadingSearch: false,
        areSearchResultsDisplayed: false,
        visiblePhones: [
            {
                id: 'id',
                name: 'name',
                brand: 'brand',
                basePrice: 333,
            },
        ],
        setIsLoadingSearch: vi.fn(),
        setIsInitialLoad: vi.fn(),
    };

    describe('When component is rendered', () => { 
        describe('And isLoading is true', () => { 
            it('Then it should match snapshot', () => {
                (useHomePage as Mock).mockReturnValueOnce({
                    ...mockedUseHomePage,
                    isLoading: true,
                });

                const { container} = render(<HomePage />)

                expect(container).toMatchSnapshot()
            })
        })

        describe('And isLoading is false', () => { 
            describe('But areSearchResultsDisplayed is false', () => { 
                describe('And isInitialLoad is true', () => { 
                    it('Then it should match snapshot', () => {
                        (useHomePage as Mock).mockReturnValueOnce({
                            ...mockedUseHomePage,
                            isLoading: false,
                            areSearchResultsDisplayed: false,
                            isInitialLoad: true,
                        });

                        const { container } = render(<HomePage />)

                        expect(container).toMatchSnapshot()
                    })
                })
            })
        });
    });
})