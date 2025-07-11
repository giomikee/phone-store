import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { Phone } from '../../interfaces';
import { useEffect, useRef, useState } from 'react';
import { INITIAL_PHONES_COUNT, PAGES } from '../../constants';
import { getPhones } from '../../services';
import { addPhones } from '../../state/phone/phone.slice';
import { useStoreSelectors } from '../../state/useStoreSelectors';

export function useHomePage() {
    const navigate = useNavigate();

    const {
        phones,
        searchedPhones,
        areSearchResultsDisplayed,
    } = useStoreSelectors();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const hasFetchedRef = useRef(false);  // Avoid calling useEffect twice in dev
    let visiblePhones: Phone[];


    if (areSearchResultsDisplayed) {
        visiblePhones = searchedPhones;
    } else {
        visiblePhones = isInitialLoad ? phones.slice(0, INITIAL_PHONES_COUNT) : phones;
    }

    const fetchPhones = async () => {
        try {
            setIsLoading(true);
            const fetchedPhones = await getPhones({ limit: INITIAL_PHONES_COUNT });

            dispatch(addPhones(fetchedPhones));
        } catch (error) {
            console.error(error);

            navigate(PAGES.error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (phones.length > 0 || hasFetchedRef.current) {
            return;
        }

        hasFetchedRef.current = true;

        fetchPhones();
    }, []);

    return {
        isLoading,
        isInitialLoad,
        isLoadingSearch,
        visiblePhones,
        hasFetchedRef,
        fetchPhones,
        setIsLoadingSearch,
        setIsInitialLoad,
    };
}