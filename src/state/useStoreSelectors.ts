import { useSelector } from 'react-redux';
import type { RootState } from '../interfaces';

export function useStoreSelectors() {
    const phones = useSelector((state: RootState) => state.phone.value.phones);
    const cartPhones = useSelector((state: RootState) => state.cart.value.phones);
    const searchedPhones = useSelector((state: RootState) => state.phone.value.searchedPhones);
    const areSearchResultsDisplayed = useSelector((state: RootState) => state.phone.value.areSearchResultsDisplayed);

    return {
        phones,
        cartPhones,
        searchedPhones,
        areSearchResultsDisplayed,
    };
}