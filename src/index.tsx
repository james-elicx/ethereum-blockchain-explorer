import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider, WalletProvider } from './contexts';
import { App } from './pages';
import { Navigation } from './components';
import './index.scss';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <ToastProvider>
      <WalletProvider>
        <BrowserRouter>
          <Navigation />

          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </ToastProvider>
  </StrictMode>,
);
