'use client';
import React, { useState } from 'react';
import styles from './PersonaliseTrackId.module.css';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFetchData from '@/hooks/useFetchData';
import axios from 'axios';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';

const PersonaliseTrackId = () => {
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
  const [formData, setFormData] = useState({
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
        const requiredFields = ['trackingId'];

        const hasEmptyFields = requiredFields.some(
          (field) => formData[field].length === 0
        );

        if (hasEmptyFields) {
          setFormDataError(true);
          throw new Error('Validation Error: All fields must be completed');
        }
        const res = await axios.post(
          `/api/v1/nin-services/personalise-trackid`,

          { ...formData, serviceType: data[0]?.trackIdPersonalisation[0]?.type }
        );
        return res.data;
      },

      onSuccess: async (res) => {
        setFormData({
          trackingId: '',
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
      pageHeader='Personalise Tracking ID'
      //   url={`/user/admin/completed-orders`}
    >
      <div className={styles.nin_container}>
        <div className={styles.description_container}>
          <span>Our Tracking ID Personalisation</span>
          <ul>
            {data &&
              data[0]?.trackIdPersonalisation?.map((item) => {
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

export default PersonaliseTrackId;
