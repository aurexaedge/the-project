'use client';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';

const useAutoLogout = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only apply on protected routes
    if (!pathname.startsWith('/user')) return;

    if (!session || !session.expires) return;

    const expiryTime = new Date(session.expires).getTime();
    const now = Date.now();
    const timeUntilLogout = expiryTime - now;
    const timeBeforeWarning = 60 * 1000; // 1 minute warning before logout

    if (timeUntilLogout <= 0) {
      signOut({ redirect: false });
      router.push('/auth/login');
    } else {
      const logoutTimer = setTimeout(() => {
        signOut({ redirect: false });
        router.push('/auth/login');
      }, timeUntilLogout);

      const warningTime = timeUntilLogout - timeBeforeWarning;
      const warningTimer =
        warningTime > 0
          ? setTimeout(() => {
              toast.warning(
                'You will be logged out in 1 minute due to session expiration.'
              );
            }, warningTime)
          : null;

      return () => {
        clearTimeout(logoutTimer);
        if (warningTimer) clearTimeout(warningTimer);
      };
    }
  }, [session, pathname, router]);
};

export default useAutoLogout;
