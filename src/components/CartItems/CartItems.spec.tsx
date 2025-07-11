import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CartItems from './CartItems';

describe('Given CartItems component', () => {
    const defaultProps = {
        phones: [
            {
                id: 'id',
                name: 'name',
                brand: 'brand',
                basePrice: 0,
                selectedColor: {
                    hexCode: 'hexCode',
                    name: 'name',
                    imageUrl: 'imageUrl'
                },
                selectedStorage: {
                    capacity: 'capacity',
                    price: 3.1
                },
            },
            {
                id: 'id',
                name: 'name',
                brand: 'brand',
                basePrice: 0,
                selectedColor: {
                    hexCode: 'hexCode',
                    name: 'name',
                    imageUrl: 'imageUrl'
                },
                selectedStorage: {
                    capacity: 'capacity',
                    price: 59
                },
            },
        ],
        onClickRemove: vi.fn(),
    };

    describe.each([
        {
            phones: defaultProps.phones,
        },
        {
            phones: [],
        },
    ])('When the component is rendered', ({ phones }) => {
        describe(`And phones prop has ${phones.length} phones`, () => { 
            it('Then it should match the snapshot', () => {
                const { container } = render(<CartItems {...defaultProps} phones={phones} />);
                expect(container).toMatchSnapshot();
            })
        })
    });

    describe('When remove phone button is clicked for the first phone', () => {         
        it('Then it should call onClickRemove with the first phone and index 0', () => {
            render(<CartItems {...defaultProps} />);
            fireEvent.click(screen.getByTestId('remove-phone-button-id_0'));
            expect(defaultProps.onClickRemove).toHaveBeenCalledWith(defaultProps.phones[0], 0);
        });
    });
});