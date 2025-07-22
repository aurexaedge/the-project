'use client';
import React, { useState, forwardRef, useEffect, useContext } from 'react';
import styles from './Login.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

import { signIn, getSession, useSession } from 'next-auth/react';
import { AppContext } from '@/context/AppContext';
import LogoItem from '@/components/LogoItem/LogoItem';
import { FaHandsClapping } from 'react-icons/fa6';
import Link from 'next/link';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { toast } from 'sonner';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { status, data: session } = useSession();

  let callbackUrl = params.get('callbackUrl') || '/user/dashboard';

  const { user, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const submitFormData = async () => {
    setErrorMessage(null);
    setResponseMessage(null);

    if (formData.email.length === 0 || formData.password.length === 0) {
      return setFormDataError(true);
    }
    // toast.warning('App is still under construction');
    // return;

    if (formData.email && formData.password) {
      setLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      try {
        if (result.ok) {
          const session = await getSession();
          setUser(session);
          setFormData({
            email: '',
            password: '',
          });
        } else {
          setLoading(false);
          toast.error(result.error);
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage(error?.response?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <main className={styles.login_container}>
      <div className={styles.container_inner}>
        <div onClick={() => router.push('/')} className={styles.logo_item}>
          <LogoItem />
        </div>
        <div className={styles.login_wrapper}>
          <h3>
            Hi,Welcome! <FaHandsClapping className={styles.hands_icon} />
          </h3>

          <div className={styles.input_wrapper}>
            <label htmlFor='email'>
              Email: <br />
              <input
                type='email'
                name='email'
                className={styles.form_control}
                // placeholder='Enter email or username'
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <br />
              {formDataError && formData.email.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>

          <div className={styles.input_wrapper}>
            <label htmlFor='password'>
              Password: <br />
              <input
                type='password'
                value={formData?.password}
                // placeholder='Enter password'
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <br />
              {formDataError && formData.password.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <Link href='/auth/forgot-password' className={styles.forgot_password}>
            Forgot Password?
          </Link>
          <CallToAction
            loading={loading}
            text='Login'
            progressText='Submitting...'
            action={submitFormData}
          />
          <Link href='/auth/register' className={styles.create_account}>
            Don&apos;t have an account?{' '}
            <span className={styles.create_account_inner}>Sign up</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
