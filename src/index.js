import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AddressesContextProvider } from './context/AddressesContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AddressesContextProvider>
      <App />
      </AddressesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
