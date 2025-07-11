import { describe, expect, it } from 'vitest';
import {  render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import PhoneDescription from './PhoneDescription';

describe('Given PhoneDescription component', () => {
    const defaultProps = {
        phoneDetails: {
            id: '1',
            brand: 'Apple',
            name: 'iPhone 15',
            description: 'description',
            basePrice: 999,
            imageUrl: 'imageUrl',
            specs: {
                screen: 'screen',
                resolution: 'resolution',
                processor: 'processor',
                mainCamera: 'mainCamera',
                selfieCamera: 'selfieCamera',
                battery: 'battery',
                os: 'os',
                screenRefreshRate: 'screenRefreshRate',
            },
        },
    };

    describe.each([
        defaultProps.phoneDetails,
        null,
    ])('When the component is rendered', (phoneDetails) => {
        describe(`And phoneDetails is ${phoneDetails ? 'not null' : 'null' }`, () => {

            it('Then it should match the snapshot', () => {
                const { container } = render(<PhoneDescription {...defaultProps} phoneDetails={phoneDetails} />);
                expect(container).toMatchSnapshot();
            });
        })
    });
});