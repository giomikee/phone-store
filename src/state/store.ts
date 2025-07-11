import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart.slice';
import phoneReducer from './phone/phone.slice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        phone: phoneReducer
    }
});