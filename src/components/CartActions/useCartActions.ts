import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../../state/cart/cart.slice';
import { PAGES } from '../../constants';

export function useCartActions() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const startCheckout = () => {
        setIsLoading(true);
        setIsSnackbarOpen(true);
    };

    const checkoutCart = () => {
        dispatch(resetCart());
        navigate(PAGES.home);
    };

    return {
        isSnackbarOpen,
        isLoading,
        startCheckout,
        checkoutCart,
    };
}