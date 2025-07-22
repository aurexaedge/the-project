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

  const handleInputChange = (e, index) => {
    let inputValue = e.target.value.replace(/\D/, '');
    if (inputValue.length > 1) {
      inputValue = inputValue.slice(0, 1);
    }

    const inputRef = inputRefs[index];
    const nextInputRef = inputRefs[index + 1];

    setFormData({ ...formData, [`num${index + 1}`]: inputValue });

    if (inputValue.length === 1 && index < 5) {
      nextInputRef.current.focus();
    } else if (inputValue.length === 0 && e.key === 'Backspace' && index > 0) {
      inputRef.current.focus();
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

  const loginHandler = () => {
    router.push('/auth/login');
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
                  type='tel'
                  name='num1'
                  className={styles.form_control}
                  value={formData.num1}
                  onChange={(e) => handleInputChange(e, 0)}
                  ref={inputRefs[0]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num2'>
                {/* num2: <br /> */}
                <input
                  type='tel'
                  name='num2'
                  className={styles.form_control}
                  value={formData.num2}
                  onChange={(e) => handleInputChange(e, 1)}
                  ref={inputRefs[1]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num3'>
                {/* num3: <br /> */}
                <input
                  type='tel'
                  name='num3'
                  className={styles.form_control}
                  value={formData.num3}
                  onChange={(e) => handleInputChange(e, 2)}
                  ref={inputRefs[2]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num4'>
                {/* num4: <br /> */}
                <input
                  type='tel'
                  name='num4'
                  className={styles.form_control}
                  value={formData.num4}
                  onChange={(e) => handleInputChange(e, 3)}
                  ref={inputRefs[3]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num5'>
                {/* num5: <br /> */}
                <input
                  type='tel'
                  name='num5'
                  className={styles.form_control}
                  value={formData.num5}
                  onChange={(e) => handleInputChange(e, 4)}
                  ref={inputRefs[4]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num6'>
                {/* num6: <br /> */}
                <input
                  type='tel'
                  name='num6'
                  className={styles.form_control}
                  value={formData.num6}
                  onChange={(e) => handleInputChange(e, 5)}
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
