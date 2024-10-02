import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './app/styles/index.scss';
import store from './app/providers/store/store.ts';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
);
