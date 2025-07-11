import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

describe('Given ErrorPage component', () => {
    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<ErrorPage />, { wrapper: BrowserRouter });
            expect(container).toMatchSnapshot();
        });
    });
});