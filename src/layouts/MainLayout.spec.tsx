import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
    useSelector: vi.fn().mockReturnValue([]),
}));

vi.mock('../../state/cart/cart.slice');

describe('Given MainLayout component', () => {
    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<MainLayout />, { wrapper: BrowserRouter });
            expect(container).toMatchSnapshot();
        });
    });
})