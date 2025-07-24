'use client';
import React, { useState, useEffect, useContext } from 'react';
import styles from './Pin.module.css';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getSession, useSession } from 'next-auth/react';
import { AppContext } from '@/context/AppContext';

import axios from 'axios';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { toast } from 'sonner';

const Pin = ({ loginDetails, clearLoginForm }) => {
  const router = useRouter();
  const { user, setUser } = useContext(AppContext);

  const params = useSearchParams();
  //   let callbackUrl = params.get('callbackUrl') || '/user/dashboard';

  const [loading, setLoading] = useState(false);

  const inputRefs = Array.from({ length: 4 }, () => React.createRef());

  const [formData, setFormData] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: '',
  });
  //   useEffect(() => {
  //     inputRefs[0].current?.focus();
  //   }, []);

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

  const submitFormData = async () => {
    if (
      formData.num1.length === 0 ||
      formData.num2.length === 0 ||
      formData.num3.length === 0 ||
      formData.num4.length === 0
    ) {
      return toast.error('Enter all digits to proceed');
    }

    if (formData.num1 && formData.num2 && formData.num3 && formData.num4) {
      setLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email: loginDetails.email,
        password: loginDetails.password,
        transactionPin: `${formData.num1}${formData.num2}${formData.num3}${formData.num4}`,
      });
      try {
        if (result.ok) {
          const session = await getSession();
          if (session?.user) {
            toast.success('Successful!, hold on, Redirecting...');
            setUser(session);
            clearLoginForm();
            setFormData({ num1: '', num2: '', num3: '', num4: '' });
          }
        } else {
          setLoading(false);
          toast.error(result.error);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <main className={styles.login_container}>
      <div className={styles.container_inner}>
        <div className={styles.login_wrapper}>
          <h3>Transaction Pin</h3>
          <p>Kindly enter your 4 digit pin</p>

          <div className={styles.input__wrapper_container}>
            <div className={styles.input_wrapper}>
              <label htmlFor='num1'>
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
                <input
                  type='password'
                  name='num2'
                  className={styles.form_control}
                  value={formData.num2}
                  inputMode='numeric'
                  onChange={(e) => handleInputChange(e, 1)}
                  onKeyDown={(e) => handleKeyDown(e, 1)}
                  ref={inputRefs[1]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num3'>
                <input
                  type='password'
                  name='num3'
                  className={styles.form_control}
                  value={formData.num3}
                  inputMode='numeric'
                  onChange={(e) => handleInputChange(e, 2)}
                  onKeyDown={(e) => handleKeyDown(e, 2)}
                  ref={inputRefs[2]}
                />
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor='num4'>
                <input
                  type='password'
                  name='num4'
                  className={styles.form_control}
                  value={formData.num4}
                  inputMode='numeric'
                  onChange={(e) => handleInputChange(e, 3)}
                  onKeyDown={(e) => handleKeyDown(e, 3)}
                  ref={inputRefs[3]}
                />
              </label>
            </div>
          </div>

          <CallToAction
            loading={loading}
            text='Submit'
            progressText='Submitting...'
            action={submitFormData}
          />
        </div>
      </div>
    </main>
  );
};

export default Pin;
