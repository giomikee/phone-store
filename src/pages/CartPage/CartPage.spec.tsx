import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CartPage from './CartPage';
import { BrowserRouter } from 'react-router-dom';


vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));
vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../../state/cart/cart.slice');

vi.mock('./useCartPage', () => ({
    useCartPage: vi.fn().mockReturnValue({
        isDialogOpen: false,
        phoneToRemove: {
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
        },
        handleClickRemove: vi.fn(),
        handleCloseDialog: vi.fn(),
    }),
}));

vi.mock('../../state/useStoreSelectors');

describe('Given CartPage component', () => {
    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<CartPage />, { wrapper: BrowserRouter });
            expect(container).toMatchSnapshot();
        });
    })
})