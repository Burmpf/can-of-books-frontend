import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_YOUR_DOMAIN}
    clientId={process.env.REACT_APP_YOUR_CLIENT_ID}
    redirectUri={process.env.REACT_APP_REDIRECT_URI_}
  >
  
    <App />
  </Auth0Provider>
);
