'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../register/register.module.css';

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
import PasswordChecker from '../../register/PasswordChecker/PasswordChecker';

const Register = () => {
  const router = useRouter();

  const params = useSearchParams();

  const searchParams = useSearchParams();

  let userid = params.get('userid');

  let token = params.get('token');

  const { status, data: session } = useSession();

  const [fqui, setFqui] = useQueryState('fqui');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPasword, setShowPasword] = useState(false);

  const [responseMessage, setResponseMessage] = useState(false);

  const submitFormData = async () => {
    // //!
    // toast.warning('App is still under construction');
    // return;
    if (
      formData.password.length === 0 ||
      formData.confirmPassword.length === 0
    ) {
      return setFormDataError(true);
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords must match!');
    }

    if (formData.password && formData.confirmPassword) {
      try {
        setLoading(true);

        const res = await axios.put('/api/auth/forgot-password', {
          ...formData,
          userid,
          token,
        });

        if (res) {
          setFormData({
            password: '',
            confirmPassword: '',
          });
          toast.success(res.data.message);
          setResponseMessage(true);
          setProgress('');
          setLoading(false);
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
  const handle = (passwordValue) => {
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
    <main
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'fixed',
        paddingTop: '60px',
      }}
      className={styles.login_container}
    >
      <div className={styles.container_inner}>
        <div
          style={{ position: 'fixed', left: '0', top: '0', padding: '15px' }}
          onClick={() => router.push('/')}
          className={styles.logo_item}
        >
          <LogoItem />
        </div>
        <div className={styles.login_wrapper}>
          <h3>Reset Password</h3>
          <p>Kindly fill details below to reset password</p>

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

          {!responseMessage && (
            <CallToAction
              loading={loading}
              text='Reset password'
              progressText='Submitting...'
              action={submitFormData}
            />
          )}

          {responseMessage && (
            <div className={styles.success_container}>
              <p>Password reset was successful</p>
            </div>
          )}

          <Link
            style={{
              fontSize: '12px',
              color: 'blue',
              textDecoration: 'underline',
            }}
            href='/auth/login'
            className={styles.create_account}
          >
            Take me back to login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
