import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { OidcProvider, OidcSecure } from '@axa-fr/react-oidc';
import App from './App';
import oidcConfig from './oidcConfig';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <OidcProvider configuration={oidcConfig}>
    <BrowserRouter>
      <OidcSecure>
        <App />
      </OidcSecure>
    </BrowserRouter>
  </OidcProvider>
);
