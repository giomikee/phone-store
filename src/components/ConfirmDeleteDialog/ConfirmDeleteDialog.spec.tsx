import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

describe('Given ConfirmDeleteDialog component', () => { 
    const defaultProps = {
        phone: {
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
        onClose: vi.fn(),
    }

    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<ConfirmDeleteDialog {...defaultProps} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('When cancel button is clicked', () => {
        it('Then onClose should be called with false', () => {
            render(<ConfirmDeleteDialog {...defaultProps} />);
            fireEvent.click(screen.getByTestId('cancel-button'));
            expect(defaultProps.onClose).toHaveBeenCalledWith(false);
        });
    });
    
    describe('When confirm button is clicked', () => {
        it('Then onClose should be called with false', () => {
            render(<ConfirmDeleteDialog {...defaultProps} />);
            fireEvent.click(screen.getByTestId('confirm-button'));
            expect(defaultProps.onClose).toHaveBeenCalledWith(true);
        });
    });
});