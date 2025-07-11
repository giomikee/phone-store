import type { ColorOption } from '../../interfaces';

export interface Props {
    onSelectedColor: (hexCode: string) => void;
    colorOptions?: ColorOption[];
    selectedColor?: string;
}