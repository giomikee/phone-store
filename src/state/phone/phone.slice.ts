import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Phone, PhoneState } from '../../interfaces';
import { validatePhoneDetails } from '../../utils';

const initialState: PhoneState = {
    value: {
        phones: [],
        searchedPhones: [],
        areSearchResultsDisplayed: false,
    }
};

const phoneSlice = createSlice({
    name: 'phone',
    initialState,
    reducers: {
        resetPhoneStore: (state) => {
            state.value = initialState.value;
        },
        addPhones: (state, action: PayloadAction<Phone[]>) => {
            state.value.phones = [
                ...state.value.phones,
                ...action.payload,
            ];
        },
        setSearchedPhones: (state, action: PayloadAction<Phone[]>) => {
            state.value.searchedPhones = action.payload;
        },
        setAreSearchResultsDisplayed: (state, action: PayloadAction<boolean>) => {
            state.value.areSearchResultsDisplayed = action.payload;
        },
        storePhoneDetails: (state, action: PayloadAction<Phone>) => {
            const phones = [...state.value.phones];
            const phoneToUpdateIndex = phones.findIndex(({ id }) => id === action.payload.id);

            if (phoneToUpdateIndex === -1 || !validatePhoneDetails(action.payload)) {
                return;
            }

            phones[phoneToUpdateIndex] = {
                ...phones[phoneToUpdateIndex],
                ...action.payload,
            };

            state.value.phones = phones;
        }
    }
});

export const {
    addPhones,
    resetPhoneStore,
    setSearchedPhones,
    setAreSearchResultsDisplayed,
    storePhoneDetails,
} = phoneSlice.actions;

export default phoneSlice.reducer;