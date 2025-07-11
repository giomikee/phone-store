import type { StorageOption } from '../../interfaces';

export interface Props {
    onSelectedStorage: (storage: string) => void;
    storageOptions?: StorageOption[];
    selectedStorage?: string;
}