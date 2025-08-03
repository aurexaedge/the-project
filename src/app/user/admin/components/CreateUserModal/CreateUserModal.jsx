'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './CreateUserModal.module.css';
import { MdOutlineCancel } from 'react-icons/md';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import { toast } from 'sonner';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { IoEyeOffSharp } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import PasswordChecker from '@/app/auth/register/PasswordChecker/PasswordChecker';
const accountTypes = [
  'Personal (Savings)',
  'Current',
  'Bussiness Checking',
  'Checking',
  'Fixed Desposit',
  'Non Resident',
  'Joint Account',
];

const CreateUserModal = ({
  setOpenModalForCreateUser,
  openModalForCreateUser,
}) => {
  const ref = useRef(null);

  const handleModalPopUp = () => {
    setOpenModalForCreateUser(!openModalForCreateUser);
  };

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleCopyReferralLink = async () => {
    setIsLinkCopied(true);
    toast.success('Account number copied');

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLinkCopied(false);
  };

  //! the user form
  const router = useRouter();

  const params = useSearchParams();

  let referralId = params.get('referralId') || '';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    referralId: referralId,
    firstName: '',
    lastName: '',
    transactionPin: '',
    accountType: '',
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
      formData.firstName === 0 ||
      formData.lastName.length === 0 ||
      formData.accountType.length === 0 ||
      formData.transactionPin.length === 0 ||
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
      formData.firstName &&
      formData.lastName &&
      formData.transactionPin &&
      formData.accountType &&
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
            firstName: '',
            lastName: '',
            transactionPin: '',
            accountType: '',
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
    <>
      <div
        style={{
          marginTop: '0px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className={`${styles.continue_container} ${
            openModalForCreateUser ? styles.active : styles.inactive
          }`}
        >
          <div ref={ref} className={styles.continue_wrapper}>
            <div className={styles.continue_wrapper_header}>
              <p>Create New User</p>
              <MdOutlineCancel
                onClick={handleModalPopUp}
                className={styles.continue_cancel_icon}
              />
            </div>

            <div className={styles.nin_container}>
              <div className={styles.login_wrapper}>
                <h3>Create account</h3>
                <p>Set up user account.</p>
                <div className={styles.input_wrapper}>
                  <label htmlFor='firstName'>
                    First Name: <br />
                    <input
                      type='text'
                      name='firstName'
                      autoComplete='off'
                      className={styles.form_control}
                      value={formData.firstName}
                      // placeholder='enter firstName'
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                    />
                    <br />
                    {formDataError && formData.firstName.length <= 0 ? (
                      <span style={{ color: 'red' }}>* required</span>
                    ) : (
                      ''
                    )}
                  </label>
                </div>
                <div className={styles.input_wrapper}>
                  <label htmlFor='lastName'>
                    Last Name: <br />
                    <input
                      type='text'
                      name='lastName'
                      className={styles.form_control}
                      value={formData.lastName}
                      autoComplete='off'
                      // placeholder='enter lastName'
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lastName: e.target.value,
                        })
                      }
                    />
                    <br />
                    {formDataError && formData.lastName.length <= 0 ? (
                      <span style={{ color: 'red' }}>* required</span>
                    ) : (
                      ''
                    )}
                  </label>
                </div>
                <div className={styles.input_wrapper}>
                  <label htmlFor='username'>
                    Username: <br />
                    <input
                      type='text'
                      name='username'
                      autoComplete='off'
                      className={styles.form_control}
                      value={formData.username}
                      // placeholder='enter username'
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          username: e.target.value,
                        })
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
                      autoComplete='off'
                      name='email'
                      className={styles.form_control}
                      value={formData.email}
                      // placeholder='enter email'
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
                  <label htmlFor='transactionPin'>
                    Transaction Pin: <br />
                    <input
                      type='password'
                      name='transactionPin'
                      className={styles.form_control}
                      value={formData.transactionPin}
                      placeholder='4 digit pin'
                      inputMode='numeric' // mobile-friendly numeric keyboard
                      maxLength={4}
                      autoComplete='new-password'
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,4}$/.test(value)) {
                          setFormData({
                            ...formData,
                            transactionPin: value,
                          });
                        }
                      }}
                    />
                    <br />
                    {formDataError && formData?.transactionPin?.length <= 0 ? (
                      <span style={{ color: 'red' }}>* required</span>
                    ) : (
                      ''
                    )}
                  </label>
                </div>

                <div className={styles.input_wrapper}>
                  <label htmlFor='accountType'>
                    Account Type: <br />
                    <select
                      name='accountType'
                      id=''
                      value={formData?.accountType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accountType: e.target.value,
                        })
                      }
                    >
                      <option value=''>-Select type-</option>
                      {accountTypes.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    <br />
                    {formDataError && formData?.accountType?.length <= 0 ? (
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
                      autoComplete='new-password'
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
                        autoComplete='new-password'
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
                <CallToAction
                  loading={loading}
                  text='Create my account'
                  progressText='Submitting...'
                  action={submitFormData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserModal;
