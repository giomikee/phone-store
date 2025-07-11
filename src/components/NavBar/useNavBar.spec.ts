import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useNavBar } from './useNavBar';
import { useDispatch } from 'react-redux';
import { loadCartFromStorage } from '../../state/cart/cart.slice';

vi.mock('react-redux', async () => ({
    ...(await vi.importActual('react-redux')),
    useDispatch: vi.fn().mockReturnValue(vi.fn())
}));

vi.mock('../../state/cart/cart.slice');

describe('Given useNavBar hook', () => {
    describe('When the hook is called', () => {
        it('Then loadCartFromStorage action should be dispatched', async () => {
            const dispatch = useDispatch();

            renderHook(() => useNavBar());

            await waitFor(() => {
                expect(dispatch).toHaveBeenCalledWith(loadCartFromStorage());
            });
        });
    });

});