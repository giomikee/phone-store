import type { AddedPhone } from '../interfaces';

export function getCartTotalPrice(phones: AddedPhone[]): number {
    const totalPrice = phones.reduce((accumulator, { selectedStorage }) => accumulator + selectedStorage.price, 0);

    return totalPrice;
};