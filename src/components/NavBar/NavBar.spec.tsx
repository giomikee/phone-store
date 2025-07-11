import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../../state/cart/cart.slice');

vi.mock('../../state/useStoreSelectors');

describe('Given NavBar component', () => { 
    describe('When the component is rendered', () => { 
        it('Then it should match the snapshot', () => {
            const { container } = render(<NavBar />, { wrapper: BrowserRouter });
            expect(container).toMatchSnapshot();
        });
    });
});