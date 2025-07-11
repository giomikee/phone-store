import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './state/store.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider 
          future={{ v7_startTransition: true }}
          router={router} 
        />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
