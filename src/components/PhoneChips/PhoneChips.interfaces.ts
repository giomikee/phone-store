import type { SxProps, Theme } from '@mui/material';

export interface Props {
    brand: string;
    basePrice: number;
    brandChipStyle?: SxProps<Theme>;
}