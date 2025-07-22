'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import styles from './ForgetPassword.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { signIn, getSession, useSession } from 'next-auth/react';
import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';
import LogoItem from '@/components/LogoItem/LogoItem';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import axios from 'axios';

const Form = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { status, data: session } = useSession();

  const { user, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: '',
  });

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  const submitFormData = async () => {
    // //!
    // toast.warning("can't change password, section still under construction");
    // return;
    if (formData.email.length === 0) {
      return setFormDataError(true);
    }

    if (formData.email) {
      setLoading(true);
      try {
        const res = await axios.post('/api/auth/forgot-password', formData);

        if (res) {
          setFormData({
            email: '',
          });
          toast.success(res.data.message);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(result.error);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
        console.log(error);
        console.log('test');
      }
    }
  };

  const registerHandler = () => {
    router.push('/auth/login');
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.container_inner}>
        <div onClick={() => router.push('/')} className={styles.logo_item}>
          <LogoItem />
        </div>
        <div className={styles.login_wrapper}>
          <h3>Reset Your Password</h3>
          <p
            style={{
              marginBottom: '20px',
              color: 'black',
              fontSize: '15px',
            }}
          >
            kindly enter your email address to recieve password reset link
          </p>

          <div className={styles.input_wrapper}>
            <label htmlFor='email'>
              Email: <br />
              <input
                type='email'
                name='email'
                className={styles.form_control}
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

          <CallToAction
            loading={loading}
            text='Send Link'
            progressText='Sending...'
            action={submitFormData}
          />
          <button onClick={registerHandler} className={styles.create_account}>
            Never mind!{' '}
            <span className={styles.create_account_inner}>
              Take me back to login
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
