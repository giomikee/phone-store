import type { ColorOption, Phone, StorageOption } from './Phone.interfaces';

export interface AddedPhone extends Phone {
    selectedColor: ColorOption;
    selectedStorage: StorageOption;
}