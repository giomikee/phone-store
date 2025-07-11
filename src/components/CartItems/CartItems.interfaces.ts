import type { AddedPhone } from '../../interfaces';

export interface Props {
    phones: AddedPhone[];
    onClickRemove: (phoneToRemove: AddedPhone, index: number) => void;
}