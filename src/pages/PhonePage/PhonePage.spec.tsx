import { describe, expect, it, vi, type Mock } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import PhonePage from './PhonePage';
import { usePhonePage } from './usePhonePage';
import { PHONE_DETAILS_MOCK } from '../../__mocks__/phones.mock';

vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('./usePhonePage', () => ({
    usePhonePage: vi.fn().mockReturnValue({
        phoneDetails: null,
        selectedColor: null,
        selectedStorage: null,
        updateSelectedColor: vi.fn(),
        updateSelectedStorage: vi.fn(),
        handleAddToCart: vi.fn(),
    })
}))

const defaultProps = {
    phoneDetails: null,
    selectedColor: null,
    selectedStorage: null,
    updateSelectedColor: vi.fn(),
    updateSelectedStorage: vi.fn(),
    handleAddToCart: vi.fn(),
};

describe.each([PHONE_DETAILS_MOCK, null])('Given PhonePage component', (phoneDetails) => { 
    describe(`And phoneDetails is ${phoneDetails ? 'defined' : phoneDetails}`, () => { 
        it('Then it should match snapshot', () => {
            (usePhonePage as Mock).mockReturnValueOnce({
                ...defaultProps,
                phoneDetails,
            });

            const {container} = render(<PhonePage />);

            expect(container).toMatchSnapshot();
        });
    });
});