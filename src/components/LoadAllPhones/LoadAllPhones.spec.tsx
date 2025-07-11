import { describe, expect, it, vi, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import LoadAllPhones from './LoadAllPhones';
import { useLoadAllPhones } from './useLoadAllPhones';


vi.mock('./useLoadAllPhones');

describe('Given LoadAllPhones component', () => { 
    const defaultProps = {
        onLoadAll: vi.fn(),
    };

    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<LoadAllPhones {...defaultProps} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('When load all phones button is clicked', () => {
        it('Then fetchAllPhones should be called', () => {
            const fetchAllPhonesMock = vi.fn();

            (useLoadAllPhones as Mock).mockReturnValueOnce({
                isLoading: false,
                fetchAllPhones: fetchAllPhonesMock,
            })

            render(<LoadAllPhones {...defaultProps} />);

            fireEvent.click(screen.getByTestId('load-all-phones-button'));
            expect(fetchAllPhonesMock).toHaveBeenCalled();
        });
    });
})