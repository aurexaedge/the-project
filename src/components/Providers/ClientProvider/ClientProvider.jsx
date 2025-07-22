'use client';

import React, { useEffect } from 'react';

import { getSession, useSession } from 'next-auth/react';

import toast, { Toaster } from 'react-hot-toast';
import { Toaster as SonnerToaster, toast as SonnerToast } from 'sonner';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

const ClientProvider = ({ children }) => {
  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const { status, data: session } = useSession();

  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user) {
        const session = await getSession();
        if (session) {
          setUser(session);
        }
      }
    };
    checkAuthentication();
  }, [session]);

  return (
    <div>
      <Toaster position='bottom-center' />
      <SonnerToaster richColors position='bottom-center' />

      {children}
    </div>
  );
};

export default ClientProvider;
