'use client';

import React, { useEffect, useState } from 'react';
import styles from './InterBank.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';
import ErrorModal from '../ErrorModal/ErrorModal';

const accountTypes = [
  'Personal (Savings)',
  'Current',
  'Bussiness Checking',
  'Checking',
  'Fixed Desposit',
  'Non Resident',
  'Joint Account',
];

const InterBank = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);

  const [formDataError, setFormDataError] = useState(false);
  const [formData, setFormData] = useState({
    accountType: '',
    beneficiaryAccountName: '',
    beneficiaryAccountNumber: '',
    amount: '',
    transactionPin: '',
    description: '',
    transactionType: 'Debit',
    transferType: 'Inter Bank',
    bankName: 'Aurexa Ege Bank',
  });

  useEffect(() => {
    setFormData({
      accountType: '',
      beneficiaryAccountName: '',
      beneficiaryAccountNumber: '',
      amount: '',
      transactionPin: '',
      description: '',
      transactionType: 'Debit',
      transferType: 'Inter Bank',
      bankName: 'Aurexa Ege Bank',
    });
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleAmountInputChange = (e) => {
    const valueWithoutNonNumericChars = e.target.value.replace(/[^0-9]/g, '');
    const valueWithoutCommas = valueWithoutNonNumericChars.replace(/,/g, '');

    const numberValue = Number(valueWithoutCommas);

    if (!isNaN(numberValue)) {
      const formattedValue =
        valueWithoutCommas !== '' ? numberValue.toLocaleString() : '';
      setFormData({
        ...formData,
        amount: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        amount: valueWithoutCommas,
      });
    }
  };

  const { mutate: handleSubmitOrder, isPending: submitOrderIsPending } =
    useMutation({
      mutationFn: async () => {
        const requiredFields = [
          'accountType',
          'beneficiaryAccountNumber',
          'amount',
          'transactionPin',
          'description',
        ];

        const hasEmptyFields = requiredFields.some(
          (field) => formData[field].length === 0
        );

        if (hasEmptyFields) {
          setFormDataError(true);
          throw new Error('Validation Error: All fields must be completed');
        }

        const res = await axios.post(`/api/v1/transaction`, formData);
        return res.data;
      },

      onSuccess: async (res) => {
        setFormData({
          accountType: '',
          beneficiaryAccountName: '',
          beneficiaryAccountNumber: '',
          amount: '',
          transactionPin: '',
          description: '',
        });
        router.push(`/user/transactions/${res?.message}`);
        toast.success('transfer successful');
        setOpenModal(true);
        setFormDataError(false);
        queryClient.invalidateQueries(['fetchWallet']);
      },
      onError: (error) => {
        if (
          error?.response?.data?.message ===
          'Unauthorised activity discovered, kindly contact support to resolve issue'
        ) {
          showPopUp();
        }
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
      },
    });

  const handleSubmitWithConfirmation = () => {
    const userConfirmed = window.confirm('Do you wish to submit?');

    if (userConfirmed) {
      // //! remove this when done
      // toast.error('service will be up shortly');
      // return;
      handleSubmitOrder();
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const showPopUp = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className={styles.nin_container}>
      <div className={styles.description_container}>
        <span style={{ fontSize: '16px', opacity: '0.8' }}>
          Transfer To Aurexa Edge Bank
        </span>
      </div>
      <div className={styles.login_wrapper}>
        <div className={styles.input_wrapper}>
          <label htmlFor='beneficiaryAccountName'>
            Aurexa Edge Bank Account Name: <br />
            <input
              type='text'
              name='beneficiaryAccountName'
              placeholder='Steve Grey'
              value={formData?.beneficiaryAccountName}
              onChange={handleInputChange}
              autoComplete='off'
            />
            <br />
            {formDataError && formData?.beneficiaryAccountName?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='beneficiaryAccountNumber'>
            Aurexa Egbe Bank Account Number: <br />
            <input
              type='number'
              name='beneficiaryAccountNumber'
              placeholder='97001299833'
              value={formData?.beneficiaryAccountNumber}
              onChange={handleInputChange}
              autoComplete='off'
            />
            <br />
            {formDataError &&
            formData?.beneficiaryAccountNumber?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor='amount'>
            Amount (USD &#36;): <br />
            <input
              type='text'
              name='amount'
              placeholder='enter amount'
              value={formData?.amount}
              onChange={handleAmountInputChange}
              autoComplete='off'
            />
            <br />
            {formDataError && formData?.amount?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor='AccountType'>
            Account Type: <br />
            <select
              name='accountType'
              id=''
              value={formData?.accountType}
              onChange={handleInputChange}
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
          <label htmlFor='transactionPin'>
            Transaction Pin: <br />
            <input
              type='password'
              inputMode='numeric'
              maxLength={4}
              name='transactionPin'
              placeholder='enter transaction pin'
              value={formData?.transactionPin}
              onChange={handleInputChange}
              autoComplete='new-password'
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
          <label htmlFor='description'>
            Description: <br />
            <input
              name='description'
              type='text'
              placeholder='enter description '
              value={formData?.description}
              onChange={handleInputChange}
              autoComplete='off'
            ></input>
            <br />
            {formDataError && formData?.description?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>
      </div>
      <br />
      <CallToAction
        loading={submitOrderIsPending}
        text='Submit'
        progressText='submitting...'
        action={handleSubmitWithConfirmation}
      />
      <ErrorModal setShowPopup={setShowPopup} showPopup={showPopup} />
      {openModal && <OverLayLoader />}
    </div>
  );
};

export default InterBank;
