'use client';
import React, { useState, useEffect } from 'react';
import styles from './username.module.css';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useQueryState } from 'nuqs';

import axios from 'axios';
import LogoItem from '@/components/LogoItem/LogoItem';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { toast } from 'sonner';

const CompleteRegistration = () => {
  const router = useRouter();

  const params = useSearchParams();

  const searchParams = useSearchParams();

  let callbackUrl = params.get('callbackUrl') || '/user/dashboard';

  let referralId = params.get('referralId') || '';

  const { status, data: session } = useSession();

  const [fqui, setFqui] = useQueryState('fqui');

  const [quid, setQuid] = useQueryState('quid');

  const [loadingLink, setLoadingLink] = useState(false);

  const [responseMessage, setResponseMessage] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPasword, setShowPasword] = useState(false);

  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  const [formData, setFormData] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    num6: '',
  });

  // useEffect(() => {
  //   inputRefs[0].current?.focus();
  // }, []);

  const handleInputChange = (e, index) => {
    let inputValue = e.target.value.replace(/\D/, ''); // allow only digits

    // Allow only a single character
    if (inputValue.length > 1) {
      inputValue = inputValue.slice(0, 1);
    }

    // Update the current field
    setFormData((prev) => ({
      ...prev,
      [`num${index + 1}`]: inputValue,
    }));

    // Auto move to next input if not last and input is valid
    if (inputValue && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !formData[`num${index + 1}`] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendOtp = async () => {
    toast.warning('App is still under construction');
    return;

    try {
      setLoadingLink(true);
      const res = await axios.post('/api/auth/verification-link', {
        email: JSON.parse(atob(quid)).email,
      });

      if (res) {
        toast.success(res.data.message);
        setLoadingLink(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoadingLink(false);
    }
  };

  const submitFormData = async () => {
    // toast.warning('App is still under construction');
    // return;

    if (
      formData.num1.length === 0 ||
      formData.num2.length === 0 ||
      formData.num3.length === 0 ||
      formData.num4.length === 0 ||
      formData.num5.length === 0 ||
      formData.num6.length === 0
    ) {
      return toast.error('Enter all digits to proceed');
    }

    if (
      formData.num1 &&
      formData.num2 &&
      formData.num3 &&
      formData.num4 &&
      formData.num5 &&
      formData.num6
    ) {
      try {
        setLoading(true);

        const formatedFormData = `${formData.num1}${formData.num2}${formData.num3}${formData.num4}${formData.num5}${formData.num6}`;

        const rawData = {
          ...JSON.parse(atob(quid)),
          token: formatedFormData,
        };

        const res = await axios.post('/api/auth/register', rawData);
        if (res) {
          toast.success(res.data.message);
          setFormData({
            num1: '',
            num2: '',
            num3: '',
            num4: '',
            num5: '',
            num6: '',
          });
          router.push('/auth/login');
          console.clear();
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <main className={styles.login_container}>
      <div onClick={() => router.push('/')} className={styles.logo_item}>
        <LogoItem />
      </div>
      <div className={styles.container_inner}>
        <button onClick={() => router.back()} className={styles.btn_back}>
          <MdKeyboardArrowLeft className={styles.back_icon} />
        </button>
        <div className={styles.login_wrapper}>
          <h3>Email Verification</h3>
          <p>
            Kindly enter the OTP sent to this email address{' '}
            <span
              // style={{ color: 'rgba(0,0,0,0.7' }}
              style={{ color: '#188038', fontSize: '13px', fontWeight: '600' }}
            >
              {quid && JSON?.parse(atob(quid))?.email}
            </span>
          </p>

          <div className={styles.input__wrapper_container}>
            <div className={styles.input_wrapper}>
              <label htmlFor='num1'>
                {/* num1: <br /> */}
                <input
                  type='password'
                  name='num1'
                  className={styles.form_control}
                  value={formData.num1}
                  inputMode='numeric'
                  onChange={(e) => handleInputChange(e, 0)}
                  onKeyDown={(e) => handleKeyDown(e, 0)}
                  ref={inputRefs[0]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num2'>
                {/* num2: <br /> */}
                <input
                  type='password'
                  name='num2'
                  inputMode='numeric'
                  className={styles.form_control}
                  value={formData.num2}
                  onChange={(e) => handleInputChange(e, 1)}
                  onKeyDown={(e) => handleKeyDown(e, 1)}
                  ref={inputRefs[1]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num3'>
                {/* num3: <br /> */}
                <input
                  type='password'
                  name='num3'
                  inputMode='numeric'
                  className={styles.form_control}
                  value={formData.num3}
                  onChange={(e) => handleInputChange(e, 2)}
                  onKeyDown={(e) => handleKeyDown(e, 2)}
                  ref={inputRefs[2]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num4'>
                {/* num4: <br /> */}
                <input
                  type='password'
                  name='num4'
                  inputMode='numeric'
                  className={styles.form_control}
                  value={formData.num4}
                  onChange={(e) => handleInputChange(e, 3)}
                  onKeyDown={(e) => handleKeyDown(e, 3)}
                  ref={inputRefs[3]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num5'>
                {/* num5: <br /> */}
                <input
                  type='password'
                  name='num5'
                  inputMode='numeric'
                  className={styles.form_control}
                  value={formData.num5}
                  onChange={(e) => handleInputChange(e, 4)}
                  onKeyDown={(e) => handleKeyDown(e, 4)}
                  ref={inputRefs[4]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num6'>
                {/* num6: <br /> */}
                <input
                  type='password'
                  name='num6'
                  inputMode='numeric'
                  className={styles.form_control}
                  value={formData.num6}
                  onChange={(e) => handleInputChange(e, 5)}
                  onKeyDown={(e) => handleKeyDown(e, 5)}
                  ref={inputRefs[5]}
                />
              </label>
            </div>
          </div>

          <CallToAction
            loading={loading}
            text='Verify account'
            progressText='Verifying...'
            action={submitFormData}
          />
          <button
            disabled={loadingLink}
            onClick={() => handleResendOtp()}
            className={styles.create_account}
          >
            Didn&apos;t get the otp?{' '}
            <span className={styles.create_account_inner}>
              {loadingLink ? 'resending...' : 'Resend Otp'}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default CompleteRegistration;
