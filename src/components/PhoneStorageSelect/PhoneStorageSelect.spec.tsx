import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import PhoneStorageSelect from './PhoneStorageSelect';

describe('Given PhoneStorageSelect component', () => { 
    const defaultProps = {
        storageOptions: [
            {
                capacity: 'capacity',
                price: 59
            }
        ],
        onSelectedStorage: vi.fn(),
    }

    describe.each([
        defaultProps.storageOptions,
        undefined
    ])('When component is rendered with storageOptions=%s', (storageOptions) => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<PhoneStorageSelect {...defaultProps} storageOptions={storageOptions} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('When selected storage is changed', () => {
        it('Then onSelectedStorage should be called with the selected color', () => {
            render(<PhoneStorageSelect {...defaultProps} />);

            const select = screen.getByTestId('storage-select').querySelector('input');

            expect(select).not.toBeNull();
            
            fireEvent.change(select!, { target: { value: 'capacity' } });
            
            expect(defaultProps.onSelectedStorage).toHaveBeenCalledWith('capacity');
        });
    });
});