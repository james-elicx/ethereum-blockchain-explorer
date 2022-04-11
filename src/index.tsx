import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CloudflareProvider, ToastProvider, WalletProvider } from './contexts';
import { Address, App, Maintenance } from './pages';
import { Footer, Navigation } from './components';
import './index.scss';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <ToastProvider>
      <WalletProvider>
        <CloudflareProvider>
          <BrowserRouter>
            <Navigation />

            <Routes>
              <Route path="/address/:id" element={<Address />} />
              <Route path="/tx/:id" element={<Maintenance />} />
              <Route path="/block/:id" element={<Maintenance />} />
              <Route path="*" element={<App />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </CloudflareProvider>
      </WalletProvider>
    </ToastProvider>
  </StrictMode>,
);
