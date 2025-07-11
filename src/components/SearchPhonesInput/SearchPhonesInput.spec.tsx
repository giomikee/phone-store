import { beforeAll, describe, expect, it, vi, type Mock } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import SearchPhonesInput from './SearchPhonesInput';
import { useSearchPhonesInput } from './useSearchPhonesInput';

vi.mock('./useSearchPhonesInput', () => ({
    useSearchPhonesInput: vi.fn(),
}));

describe('Given SearchPhonesInput component', () => {
    const defaultProps = {
        onSearchLoading: vi.fn(),
    };
    const mockedUseSearchPhonesInput = {
        keywords: 'keywords',
        resultsText: '',
        isLoading: false,
        setKeywords: vi.fn(),
    };

    beforeAll(() => {
        (useSearchPhonesInput as Mock).mockReturnValue(mockedUseSearchPhonesInput);
    });

    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<SearchPhonesInput {...defaultProps} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('When search phones input is updated with "foobar"', () => { 
        it('Then it should call setKeywords with "foobar"', () => {

            render(<SearchPhonesInput {...defaultProps} />);

            const input = screen.getByTestId('search-phones-input').querySelector('[name="search-phones-input"]');

            expect(input).not.toBeNull();

            fireEvent.change(input!, { target: { value: 'foobar' } });

            expect(mockedUseSearchPhonesInput.setKeywords).toHaveBeenCalledWith('foobar');
        });
    });

    describe('When clear search button is clicked', () => { 
        it('Then it should call setKeywords with an empty string', () => {
            render(<SearchPhonesInput {...defaultProps} />);

            const clearButton = screen.getByTestId('clear-search-button');

            fireEvent.click(clearButton);

            expect(mockedUseSearchPhonesInput.setKeywords).toHaveBeenCalledWith('');
        });
    });
});