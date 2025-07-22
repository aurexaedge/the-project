'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

//! i introduced tanstack query to the auth provider
export default function AuthProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient()
    // new QueryClient({
    //   defaultOptions: {
    //     queries: {
    //       staleTime: 6 * 1000,
    //       refetchInterval: 6 * 1000,
    //     },
    //   },
    // })
  );
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </SessionProvider>
  );
}
