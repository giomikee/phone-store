import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('Given NotFoundPage component', () => {
    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(<NotFoundPage />, { wrapper: BrowserRouter });
            expect(container).toMatchSnapshot();
        });
    });
});