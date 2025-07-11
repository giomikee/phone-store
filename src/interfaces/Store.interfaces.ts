import type { store } from '../state/store';
import type { AddedPhone } from './Cart.interfaces';
import type { Phone } from './Phone.interfaces';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

interface PhoneStateValue {
    phones: Phone[];
    searchedPhones: Phone[];
    areSearchResultsDisplayed: boolean;
}

interface CartStateValue {
    phones: AddedPhone[];
}

export interface PhoneState {
    value: PhoneStateValue;
}

export interface CartState {
    value: CartStateValue;
}