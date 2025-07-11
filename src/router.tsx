import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import CartPage from './pages/CartPage/CartPage';
import { PAGES } from './constants';
import PhonePage from './pages/PhonePage/PhonePage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={PAGES.home} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={PAGES.cart} element={<CartPage />} />
            <Route path={PAGES.phone} element={<PhonePage />} />
            <Route path={PAGES.error} element={<ErrorPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Route>
    )
); 