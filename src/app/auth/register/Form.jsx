'use client';
import React, { useState, useEffect } from 'react';
import styles from './register.module.css';

import { IoEyeOffSharp } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useQueryState } from 'nuqs';

import axios from 'axios';
import LogoItem from '@/components/LogoItem/LogoItem';
import Link from 'next/link';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { toast } from 'sonner';
import PasswordChecker from './PasswordChecker/PasswordChecker';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';

const Register = () => {
  const router = useRouter();

  const params = useSearchParams();

  const searchParams = useSearchParams();

  let callbackUrl = params.get('callbackUrl') || '/user/dashboard';

  let referralId = params.get('referralId') || '';

  const { status, data: session } = useSession();

  const [fqui, setFqui] = useQueryState('fqui');

  const [loadingLink, setLoadingLink] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    referralId: referralId,
  });

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPasword, setShowPasword] = useState(false);

  const submitFormData = async () => {
    // toast.warning('App is still under construction');
    // return;
    if (
      formData.username.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0 ||
      formData.confirmPassword.length === 0
    ) {
      return setFormDataError(true);
    }

    //!

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords must match!');
    }

    if (
      formData.username &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    ) {
      try {
        setLoading(true);
        const res = await axios.post('/api/auth/register/onboarding', formData);

        if (res) {
          toast.success(res.data.message);
          setLoading(false);

          router.push(
            `/auth/register/verify-email?quid=${btoa(JSON.stringify(formData))}`
          );
          setFormData({
            username: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
          });
        }
        console.clear();
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  //! new code
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState('');

  //Function to handle changes in the password input
  const handlePassword = (passwordValue) => {
    //Create an object to track password strength checks
    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    //update the strength checks based on the password value

    strengthChecks.length = passwordValue.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);
    let strength =
      verifiedList.length === 5
        ? 'Strong'
        : verifiedList.length >= 2
        ? 'Medium'
        : 'Weak';
    // setPassword(passwordValue);
    setFormData({
      ...formData,
      password: passwordValue,
    });
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);
  };

  //Function to get the color for the progress
  const getActiveColor = (type) => {
    if (type === 'Strong') return '#3FBB60';
    if (type === 'Medium') return '#FE804D';
    return '#FF0054';
  };

  //! ends here
  return (
    <main className={styles.login_container}>
      <div className={styles.container_inner}>
        <div onClick={() => router.push('/')} className={styles.logo_item}>
          <LogoItem />
        </div>
        <div className={styles.login_wrapper}>
          <h3>Create account</h3>
          <p>Set up your Aurexa Edge account in just 2mins.</p>
          <div className={styles.input_wrapper}>
            <label htmlFor='username'>
              Username: <br />
              <input
                type='text'
                name='username'
                className={styles.form_control}
                value={formData.username}
                // placeholder='Enter username'
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <br />
              {formDataError && formData.username.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='email'>
              Email: <br />
              <input
                type='email'
                name='email'
                className={styles.form_control}
                value={formData.email}
                // placeholder='Enter email'
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  // setFqui(btoa(e.target.value));
                }}
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
                style={{ paddingRight: '40px' }}
                type={showPasword ? 'text' : 'password'}
                value={formData.password}
                onChange={({ target }) => {
                  handlePassword(target.value);
                }}
              />
              <br />
              {formDataError && formData.password.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
              {showPasword ? (
                <IoEyeOutline
                  onClick={() => setShowPasword(!showPasword)}
                  className={styles.password_icon}
                  size={20}
                />
              ) : (
                <IoEyeOffSharp
                  onClick={() => setShowPasword(!showPasword)}
                  className={styles.password_icon}
                  size={20}
                />
              )}
            </label>
          </div>

          <PasswordChecker
            password={formData.password}
            message={message}
            progress={progress}
            getActiveColor={getActiveColor}
          />
          {message === 'Strong' && (
            <div className={styles.input_wrapper}>
              <label htmlFor='confirmPassword'>
                Confirm Password: <br />
                <input
                  type={showPasword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData?.confirmPassword}
                  // placeholder='Confirm password'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <br />
                {formDataError && formData.confirmPassword.length <= 0 ? (
                  <span style={{ color: 'red' }}>* required</span>
                ) : (
                  ''
                )}
              </label>
            </div>
          )}
          <p>
            By clicking the &#34;Create My Account&#34; button, you agree to{' '}
            <br />
            Aurexa Edge&apos;s{' '}
            <a
              href='/auth/register/#'
              target='_blank'
              rel='noopener noreferrer'
              style={{ cursor: 'pointer' }}
              className={styles.create_account_inner}
            >
              privacy policy.
            </a>
          </p>
          <CallToAction
            loading={loading}
            text='Create my account'
            progressText='Submitting...'
            action={submitFormData}
          />
          <Link href='/auth/login' className={styles.create_account}>
            Already have an account?{' '}
            <span className={styles.create_account_inner}>Log in</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
