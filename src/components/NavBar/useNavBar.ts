import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { theme } from '../../theme';
import { HEADINGS, SIZES } from '../../constants';
import { useEffect } from 'react';
import { loadCartFromStorage } from '../../state/cart/cart.slice';

export function useNavBar() {
    const dispatch = useDispatch();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const typographyOptions = {
        titleVariant: isMobile ? HEADINGS.h5 : HEADINGS.h4,
        buttonSize: isMobile ? SIZES.small : SIZES.medium,
    };

    useEffect(() => {
        dispatch(loadCartFromStorage());
    }, []);

    return { typographyOptions };
}