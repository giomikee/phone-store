import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NavButton from './NavButton';
import { BrowserRouter } from 'react-router-dom';

describe('Given NavButton component', () => {
    const defaultProps = {
        to: '/',
    };

    describe('When the component is rendered', () => {
        it('Then it should match the snapshot', () => {
            const { container } = render(
                <NavButton {...defaultProps}>
                    <span>Home</span>
                </NavButton>, 
                { wrapper: BrowserRouter }
            );
            expect(container).toMatchSnapshot();
        });
    });
})