'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../register/[onboarding]/username.module.css';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useQueryState } from 'nuqs';

import axios from 'axios';
import LogoItem from '@/components/LogoItem/LogoItem';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { toast } from 'sonner';

const Pin = () => {
  const router = useRouter();

  const [quid, setQuid] = useQueryState('quid');

  const [loading, setLoading] = useState(false);

  const inputRefs = Array.from({ length: 4 }, () => React.createRef());

  const [formData, setFormData] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: '',
  });

  const handleInputChange = (e, index) => {
    let inputValue = e.target.value.replace(/\D/, '');
    if (inputValue.length > 1) {
      inputValue = inputValue.slice(0, 1);
    }

    const inputRef = inputRefs[index];
    const nextInputRef = inputRefs[index + 1];

    setFormData({ ...formData, [`num${index + 1}`]: inputValue });

    if (inputValue.length === 1 && index < 3) {
      nextInputRef.current.focus();
    } else if (inputValue.length === 0 && e.key === 'Backspace' && index > 0) {
      inputRef.current.focus();
    }
  };

  const submitFormData = async () => {
    // toast.warning('App is still under construction');
    // return;

    if (
      formData.num1.length === 0 ||
      formData.num2.length === 0 ||
      formData.num3.length === 0 ||
      formData.num4.length === 0
    ) {
      return toast.error('Enter all digits to proceed');
    }

    if (formData.num1 && formData.num2 && formData.num3 && formData.num4) {
      try {
        setLoading(true);

        const formatedFormData = `${formData.num1}${formData.num2}${formData.num3}${formData.num4}`;

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
          });
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
          <h3>Transaction Pin</h3>
          <p>Kindly enter your 4 digit pin</p>

          <div className={styles.input__wrapper_container}>
            <div className={styles.input_wrapper}>
              <label htmlFor='num1'>
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
