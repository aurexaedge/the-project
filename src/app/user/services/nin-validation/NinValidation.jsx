'use client';
import React, { useState } from 'react';
import styles from './NinValidation.module.css';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { toast } from 'sonner';
import useFetchData from '@/hooks/useFetchData';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';

const NinValidation = () => {
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
    validationType: '',
    newTrackingId: '',
    nin: '',
    bank: '',
  });
  const handleInputChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value?.trim(),
    });
  };

  const { mutate: handleSubmitOrder, isPending: submitOrderIsPending } =
    useMutation({
      mutationFn: async () => {
        const res = await axios.post(
          `/api/v1/nin-services/validation`,
          formData
        );
        return res.data;
      },

      onSuccess: async (res) => {
        setFormData({
          validationType: '',
          newTrackingId: '',
          nin: '',
          bank: '',
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
      pageHeader='Nin Validation'
      //   url={`/user/admin/completed-orders`}
    >
      <div className={styles.nin_container}>
        <div className={styles.description_container}>
          <span>Our validation include:</span>
          <ul>
            {data &&
              data[0]?.ninValidation?.map((item) => {
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
              Validation Type: <br />
              <select
                name='validationType'
                id=''
                value={formData?.validationType}
                onChange={handleInputChange}
              >
                <option value=''>Select type</option>
                {data &&
                  data[0]?.ninValidation?.map((item) => {
                    return (
                      <option key={item?._id} value={item?.type}>
                        {item?.type}
                      </option>
                    );
                  })}
              </select>
              <br />
              {formDataError && formData?.validationType?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          {formData.validationType.length !== 0 && (
            <div className={styles.input_wrapper}>
              <label htmlFor='nin'>
                Nin: <br />
                <input
                  type='text'
                  name='nin'
                  placeholder='enter nin'
                  value={formData?.nin}
                  onChange={handleInputChange}
                />
                <br />
                {formDataError && formData?.nin?.length <= 0 ? (
                  <span style={{ color: 'red' }}>* required</span>
                ) : (
                  ''
                )}
              </label>
            </div>
          )}
          {!(
            formData?.validationType ===
              'Validation for no record found - \u20A61,500' ||
            formData?.validationType === 'V-NIN validation - \u20A62,500'
          ) &&
            formData.validationType.length !== 0 && (
              <div className={styles.input_wrapper}>
                <label htmlFor='newTrackingId'>
                  New tracking id: <br />
                  <input
                    type='text'
                    name='newTrackingId'
                    placeholder='enter new tracking id'
                    value={formData?.newTrackingId}
                    onChange={handleInputChange}
                  />
                  <br />
                  {formDataError && formData?.newTrackingId?.length <= 0 ? (
                    <span style={{ color: 'red' }}>* required</span>
                  ) : (
                    ''
                  )}
                </label>
              </div>
            )}
          {formData?.validationType === 'V-NIN validation - \u20A62,500' &&
            formData.validationType.length !== 0 && (
              <div className={styles.input_wrapper}>
                <label htmlFor='bank'>
                  Bank: <br />
                  <input
                    type='text'
                    name='bank'
                    placeholder='enter bank'
                    value={formData?.bank}
                    onChange={handleInputChange}
                  />
                  <br />
                  {formDataError && formData?.bank?.length <= 0 ? (
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

export default NinValidation;
