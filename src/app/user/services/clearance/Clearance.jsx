'use client';
import React, { useState } from 'react';
import styles from './Clearance.module.css';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFetchData from '@/hooks/useFetchData';
import axios from 'axios';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';

const Clearance = () => {
  const queryClient = useQueryClient();

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

  const [formDataError, setFormDataError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clearanceType: '',
    trackingId: '',
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

  const { mutate: handleSubmitOrder, isPending: submitOrderIsPending } =
    useMutation({
      mutationFn: async () => {
        const requiredFields = ['clearanceType', 'trackingId'];

        const hasEmptyFields = requiredFields.some(
          (field) => formData[field].length === 0
        );

        if (hasEmptyFields) {
          setFormDataError(true);
          throw new Error('Validation Error: All fields must be completed');
        }
        const res = await axios.post(
          `/api/v1/nin-services/clearance`,
          formData
        );
        return res.data;
      },

      onSuccess: async (res) => {
        setFormData({
          clearanceType: '',
          newTrackingId: '',
          nin: '',
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
      handleSubmitOrder();
    }
  };
  return (
    <HeaderLayout
      type='go back'
      pageHeader='IPE Clearance'
      //   url={`/user/admin/completed-orders`}
    >
      <div className={styles.nin_container}>
        <div className={styles.description_container}>
          <span>Our IPE clearance include:</span>
          <ul>
            {data &&
              data[0]?.ninClearance?.map((item) => {
                return (
                  <li key={item?._id} value={item?.type}>
                    ✅{item?.type} | duration- {item?.duration}
                  </li>
                );
              })}
          </ul>
          {isPending && <LoaderWithText />}
        </div>
        <div className={styles.login_wrapper}>
          <div className={styles.input_wrapper}>
            <label htmlFor='Modification Type'>
              Clearance Type: <br />
              <select
                name='clearanceType'
                id=''
                value={formData?.clearanceType}
                onChange={handleInputChange}
              >
                <option value=''>Select type</option>
                {data &&
                  data[0]?.ninClearance?.map((item) => {
                    return (
                      <option key={item?._id} value={item?.type}>
                        {item?.type}
                      </option>
                    );
                  })}
              </select>
              <br />
              {formDataError && formData.clearanceType.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          {formData.clearanceType.length !== 0 && (
            <div className={styles.input_wrapper}>
              <label htmlFor='trackingId'>
                Tracking id: <br />
                <input
                  type='text'
                  name='trackingId'
                  placeholder='enter tracking id'
                  value={formData?.trackingId}
                  onChange={handleInputChange}
                />
                <br />
                {formDataError && formData.trackingId.length <= 0 ? (
                  <span style={{ color: 'red' }}>* required</span>
                ) : (
                  ''
                )}
              </label>
            </div>
          )}
        </div>
        <br />

        <CallToAction
          loading={submitOrderIsPending}
          text='Submit'
          action={handleSubmitWithConfirmation}
        />
      </div>
    </HeaderLayout>
  );
};

export default Clearance;
