import { useDispatch } from 'react-redux';
import type { AddedPhone } from '../../interfaces';
import { useState } from 'react';
import { removeFromCart } from '../../state/cart/cart.slice';

export function useCartPage() {
    const dispatch = useDispatch();

    const [phoneToRemove, setPhoneToRemove] = useState<AddedPhone | null>(null);
    const [cartIndexToRemove, setCartIndexToRemove] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleClickRemove = (phone: AddedPhone, index: number) => {
        setPhoneToRemove(phone);
        setCartIndexToRemove(index);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = (isDeleteConfirmed: boolean) => {
        if (cartIndexToRemove === null) {
            return;
        }

        if (isDeleteConfirmed) {
            dispatch(removeFromCart(cartIndexToRemove));
        }

        setPhoneToRemove(null);
        setCartIndexToRemove(null);
        setIsDialogOpen(false);
    };

    return {
        phoneToRemove,
        isDialogOpen,
        cartIndexToRemove,
        setPhoneToRemove,
        setCartIndexToRemove,
        handleClickRemove,
        handleCloseDialog,
    };
}