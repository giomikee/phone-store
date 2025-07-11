import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { setAreSearchResultsDisplayed, setSearchedPhones } from '../../state/phone/phone.slice';
import { getPhones } from '../../services';
import { PAGES } from '../../constants';
import { START_SEARCH_DELAY } from './SearchPhonesInput.const';
import { useStoreSelectors } from '../../state/useStoreSelectors';

export function useSearchPhonesInput(onSearchLoading: (isLoading: boolean) => void) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { searchedPhones, areSearchResultsDisplayed } = useStoreSelectors();

    const isFirstRender = useRef(true);
    const [isLoading, setIsLoading] = useState(false);
    const [keywords, setKeywords] = useState('');
    const timeoutIdRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const resultsText = areSearchResultsDisplayed ? `(${searchedPhones.length} resultados)` : '';

    const startSearch = () => {
        setIsLoading(true);
        onSearchLoading(true);
        clearTimeout(timeoutIdRef.current);
    };

    const clearSearchResults = () => {
        dispatch(setSearchedPhones([]));
        setIsLoading(false);
        onSearchLoading(false);
        dispatch(setAreSearchResultsDisplayed(false));
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        startSearch();

        if (!keywords) {
            clearSearchResults();

            return;
        }

        timeoutIdRef.current = setTimeout(async () => {
            try {
                const searchedPhones = await getPhones({ search: keywords });
                dispatch(setSearchedPhones(searchedPhones));
            } catch (error) {
                console.error(error);
                navigate(PAGES.error);
            } finally {
                setIsLoading(false);
                onSearchLoading(false);
                dispatch(setAreSearchResultsDisplayed(true));
            }
        }, START_SEARCH_DELAY);
    }, [keywords]);

    return {
        keywords,
        isLoading,
        isFirstRender,
        resultsText,
        timeoutIdRef,
        clearSearchResults,
        setKeywords,
        startSearch,
    };
}