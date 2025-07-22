'use client';

import React, { useState } from 'react';
import styles from './InterBank.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFetchData from '@/hooks/useFetchData';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';

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
  const {
    data,
    isError,
    isLoading: isLoadingData,
    isPending,
    isFetching,
  } = useFetchData({
    queryKey: ['fetchServicePrice'],
    endpoint: '/api/v1/admin/services/',
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const [formDataError, setFormDataError] = useState(false);
  const [formData, setFormData] = useState({
    accountType: '',
    aurexaBankAccountName: '',
    aurexaBankAccountNumber: '',
    amount: '',
    transactionPin: '',
    description: '',
    picture: '',
  });
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
          'aurexaBankAccountNumber',
          'amount',
          'transactionPin',
          'description',
          'picture',
        ];

        const hasEmptyFields = requiredFields.some(
          (field) => formData[field].length === 0
        );

        if (hasEmptyFields) {
          setFormDataError(true);
          throw new Error('Validation Error: All fields must be completed');
        }

        const res = await axios.post(
          `/api/v1/nin-services/new-enrollment`,
          formData
        );
        return res.data;
      },

      onSuccess: async (res) => {
        setFormData({
          accountType: '',
          aurexaBankAccountName: '',
          aurexaBankAccountNumber: '',
          amount: '',
          transactionPin: '',
          description: '',
          picture: '',
        });
        toast.success(res?.message);
        setFormDataError(false);
        queryClient.invalidateQueries(['fetchWallet']);
      },
      onError: (error) => {
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
  return (
    <div className={styles.nin_container}>
      <div className={styles.description_container}>
        <span style={{ fontSize: '16px', opacity: '0.8' }}>
          Transfer To Aurexa Edge Bank
        </span>
      </div>
      <div className={styles.login_wrapper}>
        <div className={styles.input_wrapper}>
          <label htmlFor='aurexaBankAccountName'>
            Aurexa Edge Bank Account Name: <br />
            <input
              type='text'
              name='EdgeBankAccountName'
              placeholder='Steve Grey'
              value={formData?.aurexaBankAccountName}
              onChange={handleInputChange}
            />
            <br />
            {formDataError && formData?.aurexaBankAccountName?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='aurexaBankAccountNumber'>
            Aurexa Egbe Bank Account Number: <br />
            <input
              type='number'
              name='EdgeBankAccountNumber'
              placeholder='97001299833'
              value={formData?.aurexaBankAccountNumber}
              onChange={handleInputChange}
            />
            <br />
            {formDataError && formData?.aurexaBankAccountNumber?.length <= 0 ? (
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
              type='number'
              name='transactionPin'
              placeholder='enter transaction pin'
              value={formData?.transactionPin}
              onChange={handleInputChange}
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
            <textarea
              name='description'
              placeholder='enter description '
              value={formData?.description}
              onChange={handleInputChange}
            ></textarea>
            <br />
            {formDataError && formData?.description?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>

        {/* <div className={styles.image__container}>
          <label>Photograph</label>
          <input
            type='file'
            id='image'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  // console.log('reader', reader.result);
                  setFormData({ ...formData, picture: reader.result });
                };
                if (file.type.startsWith('image/')) {
                  reader.readAsDataURL(file);
                } else {
                  alert('Please upload a valid picture file.');
                }
              }
            }}
          />
          <br />
          {formDataError && formData?.picture?.length <= 0 ? (
            <span style={{ color: 'red' }}>* required</span>
          ) : (
            ''
          )}

          {formData?.picture?.length > 0 && (
            <img
              src={formData?.picture}
              alt='user picture'
              width='300px'
              height='400px'
              style={{ marginTop: '20px', objectFit: 'cover' }}
            />
          )}
        </div> */}
      </div>
      <br />
      <CallToAction
        loading={submitOrderIsPending}
        text='Submit'
        action={handleSubmitWithConfirmation}
      />
    </div>
  );
};

export default InterBank;
