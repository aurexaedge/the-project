import React from 'react';
import ClientProvider from './ClientProvider/ClientProvider';
import AuthProvider from './AuthProvider/AuthProvider';
import { AppProvider } from '@/context/AppContext';
import NextNProgress from 'nextjs-progressbar';

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <AppProvider>
        <ClientProvider>{children}</ClientProvider>
      </AppProvider>
    </AuthProvider>
  );
};

export default Provider;
