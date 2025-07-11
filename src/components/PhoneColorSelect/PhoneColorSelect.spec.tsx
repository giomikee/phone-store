import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import PhoneColorSelect from './PhoneColorSelect';

describe('Given PhoneColorSelect component', () => { 
    const defaultProps = {
        colorOptions: [
            {
                hexCode: 'hexCode',
                name: 'name',
                imageUrl: 'imageUrl'
            }
        ],
        onSelectedColor: vi.fn(),
    }

    describe.each([
        defaultProps.colorOptions,
        undefined
    ])('When component is rendered with colorOptions=%s', (colorOptions) => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<PhoneColorSelect {...defaultProps} colorOptions={colorOptions} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('When selected color is changed', () => {
        it('Then onSelectedColor should be called with the selected color', () => {
            render(<PhoneColorSelect {...defaultProps} />);

            const select = screen.getByTestId('color-select').querySelector('[name="color-select"]');

            expect(select).not.toBeNull();
            
            fireEvent.change(select!, { target: { value: 'hexCode' } });
            
            expect(defaultProps.onSelectedColor).toHaveBeenCalledWith('hexCode');
        });
    });
}); 