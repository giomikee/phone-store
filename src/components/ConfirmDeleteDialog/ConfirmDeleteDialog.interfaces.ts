import type { AddedPhone } from '../../interfaces';

export interface Props {
    phone: AddedPhone;
    onClose: (isDeleteConfirmed: boolean) => void;
}