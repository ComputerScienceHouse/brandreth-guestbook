import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { OidcProvider, OidcSecure } from '@axa-fr/react-oidc';
import App from './App';
import oidcConfig from './oidcConfig';
import { LoggingIn } from './callbacks/LoggingIn';
import { Authenticating } from './callbacks/Authenticating';
import { NotAuthenticated } from './callbacks/NotAuthenticated';
import './index.css';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <OidcProvider
    authenticatingComponent={Authenticating}
    loadingComponent={LoggingIn}
    authenticatingErrorComponent={NotAuthenticated}
    configuration={oidcConfig}
  >
    <BrowserRouter>
      <OidcSecure>
        <App />
      </OidcSecure>
    </BrowserRouter>
  </OidcProvider>
);
