import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import PhoneTitle from './PhoneTitle';

describe('Given PhoneTitle component', () => { 
    const defaultProps = {
        phoneDetails: {
            id: '1',
            brand: 'Apple',
            name: 'iPhone 15',
            basePrice: 999,
            rating: 4,
        },
    }

    describe.each([
        defaultProps.phoneDetails,
        null,
    ])('When component is rendered', (phoneDetails) => {
        describe(`And phoneDetails is ${phoneDetails ? 'not null' : 'null'}`, () => { 
            it('Then it should match the snapshot', () => {
                const { container } = render(<PhoneTitle {...defaultProps} phoneDetails={phoneDetails} />);
                expect(container).toMatchSnapshot();
            });
        });
    });
 })