import { describe, expect, it, vi, beforeAll } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useCartActions } from './useCartActions';
import { resetCart } from '../../state/cart/cart.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../constants';

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
}));
vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../../state/cart/cart.slice');

describe('Given useCartActions hook', () => {
    describe('When startCheckout is called', () => {
        const { result } = renderHook(() => useCartActions());

        beforeAll(() => {
            act(() => {
                result.current.startCheckout();
            });
        });

        it('Then isLoading should be true', () => {
            expect(result.current.isLoading).toBe(true);
        });

        it('Then isSnackbarOpen should be true', () => {
            expect(result.current.isSnackbarOpen).toBe(true);
        });
    });

    describe('When checkoutCart is called', () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        beforeAll(() => {
            const { result } = renderHook(() => useCartActions());
            act(() => {
                result.current.checkoutCart();
            });
        });

        it('Then resetCart action should be dispatched', () => {
            expect(resetCart).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(resetCart());
        });

        it('Then navigate to home page should be called', () => {
            expect(navigate).toHaveBeenCalledWith(PAGES.home);
        });
    });
});