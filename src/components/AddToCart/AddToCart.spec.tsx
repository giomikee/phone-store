
import { describe, expect, it, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import AddToCart from './AddToCart';

describe('Given AddToCart component', () => {
    const defaultProps = {
        disabled: false,
        brand: 'Apple',
        name: 'iPhone 15',
        price: 999,
        onAddToCart: vi.fn(),
    };

    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<AddToCart {...defaultProps} />);
            expect(container).toMatchSnapshot();
        })
    });

    [true, false].forEach((disabled) => {
        describe(`When the component is rendered with disabled=${disabled}`, () => {
            it(`Then add to cart button should be ${disabled ? 'disabled' : 'enabled'}`, () => {
                render(<AddToCart {...defaultProps} disabled={disabled} />);
                const button = screen.getByTestId('add-to-cart-button');
                expect(button).toBeInTheDocument();

                if (disabled) {
                    expect(button).toBeDisabled();
                } else {
                    expect(button).toBeEnabled();
                }
            })

            if (!disabled) {
                describe('And add to cart button is clicked', () => {
                    beforeAll(() => {
                        vi.useFakeTimers();
                        render(<AddToCart {...defaultProps} disabled={disabled} />);
                        fireEvent.click(screen.getByTestId('add-to-cart-button'));
                    });

                    afterAll(() => {
                        vi.useRealTimers();
                    });

                    it('Then snackbar should be open', () => {
                        expect(screen.getByTestId('add-to-cart-snackbar')).toBeInTheDocument();
                    });

                    it('Then snackbar should disappear after 2000ms', () => {
                        vi.advanceTimersByTime(2000);
                        expect(screen.queryByTestId('add-to-cart-snackbar')).not.toBeInTheDocument();
                    });
                });
            }
        })
    });

    [defaultProps.price, undefined].forEach((price) => {
        describe(`When the component is rendered with price=${price}`, () => {
            it(`Then it should ${price ? 'show' : 'not show'} the price`, () => {
                render(<AddToCart {...defaultProps} price={price} />);
                
                if (price) {
                    expect(screen.getByTestId('add-to-cart-price')).toBeInTheDocument();
                    expect(screen.getByTestId('add-to-cart-price')).toHaveTextContent('999.00 €');
                } else {
                    expect(screen.queryByTestId('add-to-cart-price')).not.toBeInTheDocument();
                }
            })
        })
    });
});