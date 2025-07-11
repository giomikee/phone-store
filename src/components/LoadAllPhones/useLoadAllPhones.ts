import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INITIAL_PHONES_COUNT, PAGES } from '../../constants';
import { useState } from 'react';
import { getPhones } from '../../services';
import { addPhones } from '../../state/phone/phone.slice';
import { useStoreSelectors } from '../../state/useStoreSelectors';

export function useLoadAllPhones(onLoadAll: () => void) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { phones } = useStoreSelectors();
    const hasAllPhones = phones.length > INITIAL_PHONES_COUNT;

    const [isLoading, setIsLoading] = useState(false);

    const fetchAllPhones = async () => {
        if (isLoading || hasAllPhones) {
            if (hasAllPhones) {
                onLoadAll();
            }

            return;
        }

        setIsLoading(true);

        try {
            const fetchedPhones = await getPhones({ offset: INITIAL_PHONES_COUNT });
            dispatch(addPhones(fetchedPhones));
        } catch (error) {
            console.error(error);
            navigate(PAGES.error);
        } finally {
            setIsLoading(false);
            onLoadAll();
        }
    };

    return {
        isLoading,
        setIsLoading,
        fetchAllPhones,
    };
}