import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './pages';
// import { AuthProvider, SettingsProvider } from './contexts';
import { FlexBox } from './components';
import './index.scss';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <FlexBox direction="col" justify="center" align="center">
      {/* <SettingsProvider>
        <AuthProvider> */}
      <App />
      {/* </AuthProvider>
      </SettingsProvider> */}
    </FlexBox>
  </React.StrictMode>,
);
