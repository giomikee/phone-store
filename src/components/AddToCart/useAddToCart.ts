import { useState } from 'react';

export function useAddToCart(onAddToCart: () => void) {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const addToCart = () => {
        onAddToCart();
        setIsSnackbarOpen(true);
    };


    return {
        isSnackbarOpen,
        setIsSnackbarOpen,
        addToCart,
    };
}