import { vi } from 'vitest';

export const useStoreSelectors = vi.fn().mockReturnValue({
    phones: [],
    cartPhones: [],
    searchedPhones: [],
    areSearchResultsDisplayed: false,
});