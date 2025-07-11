import { Provider } from 'react-redux';
import { store } from '../store';
import type { PropsWithChildren } from 'react';

export const wrapper = ({ children }: PropsWithChildren) => (
    <Provider store= {store} > { children } </Provider>
);