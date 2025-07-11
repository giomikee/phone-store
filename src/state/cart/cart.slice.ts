import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState, AddedPhone } from '../../interfaces';
import { CART_STORAGE_KEY, LOAD_CART_STORAGE_ERROR } from '../../constants';

const initialState: CartState = {
    value: {
        phones: []
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadCartFromStorage: (state) => {
            const storageCart = localStorage.getItem(CART_STORAGE_KEY);

            if (!storageCart) {
                return;
            }

            try {
                const storageCartParsed: AddedPhone[] = JSON.parse(storageCart);

                state.value.phones = storageCartParsed;
            } catch (error) {
                console.warn(LOAD_CART_STORAGE_ERROR);
                console.warn(error);
            }
        },
        resetCart: (state) => {
            state.value = initialState.value;
            localStorage.removeItem(CART_STORAGE_KEY);
        },
        addToCart: (state, action: PayloadAction<AddedPhone>) => {
            state.value.phones = [
                ...state.value.phones,
                action.payload
            ];

            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.value.phones));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const cartItems = [...state.value.phones];

            cartItems.splice(action.payload, 1);

            state.value.phones = cartItems;
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.value.phones));
        }
    }
});

export const {
    addToCart,
    loadCartFromStorage,
    removeFromCart,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;