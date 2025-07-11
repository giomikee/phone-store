import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import PhoneChips from './PhoneChips';

describe('Given PhoneChips component', () => { 
    const defaultProps = {
        brand: 'Apple',
        basePrice: 999,
    };

    describe('When component is rendered', () => { 
        it('Then it should match the snapshot', () => {
            const { container } = render(<PhoneChips {...defaultProps} />);
            expect(container).toMatchSnapshot();
        });
    });
});