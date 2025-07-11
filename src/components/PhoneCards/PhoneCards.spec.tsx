import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import PhoneCards from './PhoneCards';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

describe('Given PhoneCards component', () => { 
    const defaultProps = {
        phones: [
            {
                id: '1',
                brand: 'Brand A',
                name: 'Phone 1',
                imageUrl: 'https://example.com/phone1.jpg',
                basePrice: 999,
            },
            {
                id: '2',
                brand: 'Brand B',
                name: 'Phone 2',
                imageUrl: 'https://example.com/phone2.jpg',
                basePrice: 899,
            },
        ],
    };
    describe('When component is rendered', () => { 
        it('Then it should match the snapshot', () => {
            const { container } = render(<PhoneCards {...defaultProps} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('When first phone card is clicked', () => { 
        it('Then it should navigate to phone details page', () => {
            const navigate = useNavigate();

            render(<PhoneCards {...defaultProps} />);
            fireEvent.click(screen.getByTestId('phone-card-action-area-1_0'));
            

            expect(navigate).toHaveBeenCalledWith('/phones/1');
        });
    })
});