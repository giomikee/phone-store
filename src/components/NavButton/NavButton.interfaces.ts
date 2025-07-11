import type { ButtonOwnProps } from '@mui/material';
import type { SIZES } from '../../constants';
import type { ReactNode } from 'react';

export interface Props {
    to: string;
    children: ReactNode;
    startIcon?: ReactNode;
    color?: ButtonOwnProps['color'];
    size?: keyof typeof SIZES;
}