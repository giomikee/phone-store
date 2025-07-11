import { describe, expect, it, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CartActions from './CartActions';
import { BrowserRouter } from 'react-router-dom';
import type { Props } from './CartActions.interfaces';

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));
vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../../state/cart/cart.slice');

const renderWithBrowserRouter = (props: Props) => render(
    <CartActions {...props} />,
    { wrapper: BrowserRouter }
);

describe('Given CartActions component', () => { 
    const defaultProps = {
        isBuyDisabled: false,
        totalPrice: 999,
    };

    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = renderWithBrowserRouter(defaultProps);
            expect(container).toMatchSnapshot();
        });
    });

    [true, false].forEach((isBuyDisabled) => {
        describe(`When the component is rendered with isBuyDisabled=${isBuyDisabled}`, () => {
            it(`Then buy button should be ${isBuyDisabled ? 'disabled' : 'enabled'}`, () => {
                renderWithBrowserRouter({ ...defaultProps, isBuyDisabled });
                const button = screen.getByTestId('buy-button');
                expect(button).toBeInTheDocument();

                if (isBuyDisabled) {
                    expect(button).toBeDisabled();
                } else {
                    expect(button).toBeEnabled();
                }
            });

            if (!isBuyDisabled) {
                describe('And buy button is clicked', () => {
                    beforeAll(() => {
                        vi.useFakeTimers();
                        renderWithBrowserRouter({ ...defaultProps, isBuyDisabled });
                        fireEvent.click(screen.getByTestId('buy-button'));
                    });

                    afterAll(() => {
                        vi.useRealTimers();
                    });

                    it('Then snackbar should be open', () => {
                        expect(screen.getByTestId('cart-actions-snackbar')).toBeInTheDocument();
                    });

                    it('Then snackbar should disappear after 2000ms', () => {
                        vi.advanceTimersByTime(2000);
                        expect(screen.queryByTestId('cart-actions-snackbar')).not.toBeInTheDocument();
                    });
                });
            }
        });
    });
});