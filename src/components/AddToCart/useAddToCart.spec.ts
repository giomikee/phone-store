import { describe, expect, it, vi, beforeAll } from 'vitest';
import { useAddToCart } from './useAddToCart';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

describe('Given useAddToCart hook', () => {
    describe('When addToCart is called', () => {
        const onAddToCart = vi.fn();
        const { result } = renderHook(() => useAddToCart(onAddToCart));

        beforeAll(() => {
            act(() => {
                result.current.addToCart();
            });
        });

        it('Then it should call onAddToCart', () => {
            expect(onAddToCart).toHaveBeenCalled();
        });

        it('Then it should set isSnackbarOpen to true', () => {
            expect(result.current.isSnackbarOpen).toBe(true);
        });
    });
});