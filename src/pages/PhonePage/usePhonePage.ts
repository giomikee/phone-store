import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ColorOption, Phone, StorageOption } from '../../interfaces';
import { addToCart } from '../../state/cart/cart.slice';
import { HTTP_STATUS_CODES, PAGES } from '../../constants';
import { validatePhoneDetails } from '../../utils';
import { storePhoneDetails } from '../../state/phone/phone.slice';
import { getPhone } from '../../services';
import { useStoreSelectors } from '../../state/useStoreSelectors';

export function usePhonePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { phones } = useStoreSelectors();
    const dispatch = useDispatch();

    const [phoneDetails, setPhoneDetails] = useState<Phone | null>(null);
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);

    const updateSelectedColor = (hexCode: string) => {
        const selectedColorOption = phoneDetails?.colorOptions?.find((option) => option.hexCode === hexCode);

        if (!selectedColorOption) {
            return;
        }

        setSelectedColor(selectedColorOption);
    };

    const updateSelectedStorage = (capacity: string) => {
        const selectedStorageOption = phoneDetails?.storageOptions?.find(option => option.capacity === capacity);

        if (!selectedStorageOption) {
            return;
        }

        setSelectedStorage(selectedStorageOption);
    };

    const handleAddToCart = () => {
        if (!phoneDetails || !selectedColor || !selectedStorage) {
            return;
        }

        const phoneToAdd = {
            ...phoneDetails,
            selectedColor,
            selectedStorage,
        };

        dispatch(addToCart(phoneToAdd));
    };

    const getPhoneDetails = async () => {
        if (!id) {
            navigate(PAGES.notFound);
            return;
        }

        try {
            const phoneDetails = await getPhone(id);

            setPhoneDetails(phoneDetails);
            dispatch(storePhoneDetails(phoneDetails));
            setSelectedColor(null);
            setSelectedStorage(null);

            window.scrollTo(0, 0);
        } catch (error) {
            console.error(error);

            if ((error as Response).status === HTTP_STATUS_CODES.notFound) {
                navigate(PAGES.notFound);
                return;
            }

            navigate(PAGES.error);
        }
    };

    useEffect(() => {
        if (!id) {
            navigate(PAGES.notFound);
            return;
        }

        setPhoneDetails(null);
        setSelectedColor(null);
        setSelectedStorage(null);

        const storedPhoneDetails = phones.find(phone => phone.id === id);

        if (validatePhoneDetails(storedPhoneDetails)) {
            setPhoneDetails(storedPhoneDetails!);

            return;
        }

        getPhoneDetails();
    }, [id, navigate]);



    return {
        phoneDetails,
        selectedColor,
        selectedStorage,
        setSelectedColor,
        setSelectedStorage,
        setPhoneDetails,
        getPhoneDetails,
        updateSelectedColor,
        updateSelectedStorage,
        handleAddToCart,
    };
}